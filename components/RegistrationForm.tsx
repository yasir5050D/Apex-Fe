import React, { useState, useEffect } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';
import InputField from './InputField';
import TextareaField from './textarea';

// ✅ Declare SMEPay type globally
declare global {
  interface Window {
    smepayCheckout?: (config: {
      slug: string;
      onSuccess: (data: any) => void;
      onFailure: () => void;
    }) => void;
  }
}

// ✅ District options
const DISTRICTS = ['Shopian', 'Kulgam', 'Pulwama'];

// ✅ Regex constants
const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,6}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const RegistrationForm: React.FC = () => {
  // ----------------- 🧩 State -----------------
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    parentage: '',
    email: '',
    mobile: '',
    district: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  // ----------------- ⚙️ Load SMEPay Script -----------------
  useEffect(() => {
    const scriptUrl = 'https://typof.co/smepay/checkout-v2.js';
    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
      if (window.smepayCheckout) setWidgetReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => setWidgetReady(true);
    script.onerror = () => console.error('❌ Failed to load SMEPay checkout script');
    document.body.appendChild(script);
  }, []);

  // ----------------- ✅ Validation -----------------
  const validate = () => {
    const newErrors: Record<string, string> = {};

    const checkName = (value: string, field: string) => {
      if (!value.trim()) newErrors[field] = `${field} is required`;
      else if (value.trim().length < 3) newErrors[field] = `${field} must be at least 3 characters`;
      else if (!NAME_REGEX.test(value.trim()))
        newErrors[field] = `${field} should only contain letters`;
    };

    checkName(formData.firstName, 'firstName');
    checkName(formData.lastName, 'lastName');
    checkName(formData.parentage, 'parentage');

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(formData.email.trim()))
      newErrors.email = 'Enter a valid email address (e.g., name@domain.com)';

    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!PHONE_REGEX.test(formData.mobile.trim()))
      newErrors.mobile = 'Enter a valid 10-digit mobile number';

    if (!formData.district) newErrors.district = 'District is required';

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    else if (formData.address.trim().length < 8)
      newErrors.address = 'Address must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------- 💳 SMEPay Widget -----------------
  const openSMEPayCheckout = (slug: string) => {
    if (!window.smepayCheckout) return alert('SMEPay widget not ready yet.');

    window.smepayCheckout({
      slug,
      onSuccess: (data) => {
        console.log('✅ Payment successful:', data);
        const callbackUrl = data?.callback_url;
        if (callbackUrl) window.location.href = callbackUrl;
        else alert('Payment successful!');
      },
      onFailure: () => alert('Payment failed or closed.'),
    });
  };

  // ----------------- 🧭 Cancel Handler -----------------
  const cancelButton = () => {
    if (window.confirm('Are you sure you want to cancel registration?')) {
      window.location.href = '/';
    }
  };

  // ----------------- 📨 Submit Handler -----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!widgetReady) return alert('Please wait, SMEPay widget is still loading...');

    setLoading(true);
    try {
      // Step 1️⃣ Register User
      const userRes = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phoneNumber: formData.mobile,
          address: formData.address,
          district: formData.district,
        }),
      });

      const userData = await userRes.json();
      if (!userData.success) throw new Error(userData.error || 'Registration failed');

      // Step 2️⃣ Initiate Payment
      const userId = userData.data?.user?.id;
      const payRes = await fetch('http://localhost:5000/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          amount: 100,
          currency: 'INR',
        }),
      });

      const payData = await payRes.json();
      if (!payData.success || !payData.data?.order_slug)
        throw new Error('Payment initiation failed');

      // Step 3️⃣ Open SMEPay
      openSMEPayCheckout(payData.data.order_slug);
    } catch (err: any) {
      alert(err.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ----------------- 🧾 JSX -----------------
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Student Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            error={errors.firstName}
            required
          />
          <InputField
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            error={errors.lastName}
            required
          />
        </div>

        {/* Row 2: Parentage */}
        <InputField
          id="parentage"
          label="Parentage"
          value={formData.parentage}
          onChange={(e) => setFormData({ ...formData, parentage: e.target.value })}
          error={errors.parentage}
          required
        />

        {/* Row 3: Email + Mobile */}
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />
          <InputField
            id="mobile"
            label="Mobile Number"
            type="tel"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })
            }
            maxLength={10}
            error={errors.mobile}
            required
          />
        </div>

        {/* Row 4: District */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <select
            id="district"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            className={`block w-full px-4 py-3 text-sm text-gray-900 bg-white border rounded-md shadow-sm appearance-none focus:outline-none transition-colors duration-200 ${
              errors.district
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          >
            <option value="">Select District</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district && <p className="mt-2 text-sm text-red-600">{errors.district}</p>}
        </div>

        {/* Row 5: Address */}
        <TextareaField
          id="address"
          label="Full Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          error={errors.address}
          required
        />

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <SpinnerIcon className="animate-spin mr-2 h-5 w-5" /> Processing...
              </>
            ) : (
              'Register & Pay'
            )}
          </button>

          <button
            type="button"
            onClick={cancelButton}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-red-700 disabled:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>

      {!widgetReady && (
        <p className="text-center text-gray-500 text-sm mt-3">⏳ Loading SMEPay widget...</p>
      )}
    </div>
  );
};

export default RegistrationForm;
