import React, { useState, useEffect } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';
import InputField from './InputField';
import TextareaField from './textarea';
import Swal from 'sweetalert2';
const BASE_URL = import.meta.env.VITE_BASE_URL;

declare global {
  interface Window {
    smepayCheckout?: (config: {
      slug: string;
      order_id?: string;
      onSuccess: (data: any) => void;
      onFailure: () => void;
    }) => void;
    SmePayCheckout?: typeof window.smepayCheckout;
  }
}

const DISTRICTS_WITH_TEHSILS: Record<string, string[]> = {
  Shopian: ['Shopian', 'Keller', 'Zainapora', 'Herman', 'Barbugh'],
  Kulgam: ['Kulgam', 'Devsar', 'Qaimoh', 'Frisal', 'D.H. Pora'],
  Pulwama: ['Pulwama', 'Tral', 'Pampore', 'Awantipora', 'Litter'],
};

const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,6}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    parentage: '',
    email: '',
    mobile: '',
    district: '',
    tehsil: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  // 🧩 Load SMEPay widget
  useEffect(() => {
    const scriptUrl = 'https://typof.co/smepay/checkout-v2.js';
    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
      if (window.smepayCheckout || window.SmePayCheckout) {
        setWidgetReady(true);
      }
      return;
    }
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      console.log('✅ SMEPay checkout widget loaded');
      setWidgetReady(true);
    };
    script.onerror = () => console.error('❌ SMEPay widget failed to load');
    document.body.appendChild(script);
  }, []);

  // ✅ Backend helpers
  const verifyPaymentStatus = async (orderId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/api/payments/verify/${orderId}`);
      const data = await res.json();
      return data.success && data.data?.status === 'success';
    } catch (err) {
      console.error('❌ Verify error:', err);
      return false;
    }
  };

  const updatePaymentStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/payments/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, status }),
      });
      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error('❌ Update status error:', err);
      return false;
    }
  };

  // ✅ SweetAlerts
  const showSuccessMessage = (userName: string, orderId: string) => {
    Swal.fire({
      title: '🎉 Registration Successful!',
      html: `
        <div class="text-center">
          <p class="text-lg mb-2">Welcome <strong>${userName}</strong>!</p>
          <p class="mb-3">Your registration and payment were completed successfully.</p>
          <p class="text-sm text-gray-600">Order ID: ${orderId}</p>
        </div>
      `,
      icon: 'success',
      confirmButtonColor: '#10B981',
      confirmButtonText: 'Continue',
    }).then(() => {
      setFormData({
        firstName: '',
        lastName: '',
        parentage: '',
        email: '',
        mobile: '',
        district: '',
        tehsil: '',
        address: '',
      });
      setCurrentOrderId(null);
    });
  };

  const showErrorMessage = (title: string, message: string) => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#EF4444',
    });
  };

  // ✅ SMEPay Checkout
  const openSMEPayCheckout = (slug: string, orderId: string, checkoutUrl?: string) => {
    const checkoutFn = window.smepayCheckout || window.SmePayCheckout;
    if (!checkoutFn) {
      if (checkoutUrl) window.open(checkoutUrl, '_blank');
      else showErrorMessage('Widget Not Ready', 'Please refresh and try again.');
      return;
    }

    setCurrentOrderId(orderId);
    checkoutFn({
      slug,
      order_id: orderId,
      onSuccess: async () => {
        Swal.fire({
          title: 'Processing Payment...',
          text: 'Please wait while we verify your payment.',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const verified = await verifyPaymentStatus(orderId);
        if (verified) {
          const updated = await updatePaymentStatus(orderId, 'success');
          Swal.close();
          if (updated) showSuccessMessage(`${formData.firstName} ${formData.lastName}`, orderId);
          else showErrorMessage('Update Failed', 'Could not update payment status.');
        } else {
          Swal.close();
          showErrorMessage('Verification Failed', 'Could not verify payment.');
        }
      },
      onFailure: async () => {
        if (currentOrderId) await updatePaymentStatus(currentOrderId, 'failed');
        showErrorMessage('Payment Failed', 'Payment was cancelled or failed.');
        setCurrentOrderId(null);
      },
    });
  };

  // ✅ Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};
    const checkName = (val: string, field: string) => {
      if (!val.trim()) newErrors[field] = `${field} is required`;
      else if (val.trim().length < 3) newErrors[field] = `${field} must be at least 3 characters`;
      else if (!NAME_REGEX.test(val.trim()))
        newErrors[field] = `${field} should only contain letters`;
    };
    checkName(formData.firstName, 'firstName');
    checkName(formData.lastName, 'lastName');
    checkName(formData.parentage, 'parentage');

    if (!EMAIL_REGEX.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!PHONE_REGEX.test(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit number';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.tehsil) newErrors.tehsil = 'Tehsil is required';
    if (formData.address.trim().length < 8)
      newErrors.address = 'Address must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!widgetReady)
      return showErrorMessage('Widget Loading', 'Please wait, SMEPay widget is still loading...');

    setLoading(true);
    try {
      // 1️⃣ Register user
      const userRes = await fetch(`${BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          parentage: formData.parentage,
          email: formData.email,
          phoneNumber: formData.mobile,
          address: formData.address,
          district: formData.district,
          tehsil: formData.tehsil,
        }),
      });

      const userData = await userRes.json();
      if (!userData.success) throw new Error(userData.error || 'Registration failed');
      const userId = userData.data?.user?.id;

      // 2️⃣ Initiate payment
      const payRes = await fetch(`${BASE_URL}/api/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: 100, currency: 'INR' }),
      });

      const payData = await payRes.json();
      const orderSlug = payData?.data?.data?.order_slug;
      const orderId = payData?.data?.data?.order_id;
      const checkoutUrl = payData?.data?.data?.checkout_url;

      if (!orderSlug || !orderId)
        throw new Error('Payment initiation failed (missing slug/order ID)');

      // 3️⃣ Open SMEPay widget
      openSMEPayCheckout(orderSlug, orderId, checkoutUrl);
    } catch (err: any) {
      console.error('❌ Registration/payment error:', err.message);
      showErrorMessage('Registration Failed', err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const cancelButton = () => {
    if (window.confirm('Cancel registration?')) window.location.href = '/';
  };

  const tehsils = formData.district ? DISTRICTS_WITH_TEHSILS[formData.district] || [] : [];

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Student Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <InputField
          id="parentage"
          label="Parentage"
          value={formData.parentage}
          onChange={(e) => setFormData({ ...formData, parentage: e.target.value })}
          error={errors.parentage}
          required
        />

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
            label="Mobile"
            type="tel"
            maxLength={10}
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })
            }
            error={errors.mobile}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value, tehsil: '' })}
              className="block w-full px-4 py-3 border rounded-md"
            >
              <option value="">Select District</option>
              {Object.keys(DISTRICTS_WITH_TEHSILS).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            {errors.district && <p className="text-red-600 text-sm">{errors.district}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tehsil</label>
            <select
              value={formData.tehsil}
              onChange={(e) => setFormData({ ...formData, tehsil: e.target.value })}
              disabled={!formData.district}
              className="block w-full px-4 py-3 border rounded-md"
            >
              <option value="">Select Tehsil</option>
              {tehsils.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            {errors.tehsil && <p className="text-red-600 text-sm">{errors.tehsil}</p>}
          </div>
        </div>

        <TextareaField
          id="address"
          label="Full Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          error={errors.address}
          required
        />

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
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
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
