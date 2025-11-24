import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import SpinnerIcon from '../../components/icons/SpinnerIcon';
import InputField from '../../components/InputField';
import TextareaField from '../../components/textarea';
import Swal from 'sweetalert2';
import { DISTRICTS_WITH_TEHSILS, EMAIL_REGEX, GRADES, NAME_REGEX, PHONE_REGEX } from "../Constants";
import LogoIcon from "@/components/icons/LogoIcon";
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

export default function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        parentage: '',
        email: '',
        grade: '',
        mobile: '',
        district: '',
        tehsil: '',
        address: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [widgetReady, setWidgetReady] = useState(false);

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



    const showErrorMessage = (title: string, message: string) => {
        Swal.fire({
            title,
            text: message,
            icon: 'error',
            confirmButtonColor: '#EF4444',
        });
    };

    // ✅ SMEPay Checkout
    const openSMEPayCheckout = async (slug: string, orderId: string, checkoutUrl?: string) => {

        const checkoutFn = window.smepayCheckout || window.SmePayCheckout;
        if (!checkoutFn) {
            if (checkoutUrl) window.open(checkoutUrl, '_blank');
            else showErrorMessage('Widget Not Ready', 'Please refresh and try again.');
            return;
        }
        checkoutFn({
            slug,
            onSuccess: async (data) => {
                console.log('✅ Payment Success Callback:', data);
                navigate(`/payment?orderId=${data.slug}`)
            },
            onFailure: async () => {
                showErrorMessage('Payment Failed', 'Payment was cancelled or failed.');
            },
        });

    };


    // ✅ Validation
    const validate = () => {
        const newErrors: Record<string, string> = {};
        const checkName = (val: string, field: string, label: string) => {
            if (!val.trim()) newErrors[field] = `${label} is required`;
            else if (val.trim().length < 3) newErrors[field] = `${label} must be at least 3 characters`;
            else if (!NAME_REGEX.test(val.trim()))
                newErrors[field] = `${label} should only contain letters`;
        };
        checkName(formData.firstName, 'firstName', 'First name');
        checkName(formData.lastName, 'lastName', 'Last name');
        checkName(formData.parentage, 'parentage', 'Parentage');

        if (!formData.grade) newErrors.grade = 'Grade is required';

        if (!EMAIL_REGEX.test(formData.email)) newErrors.email = 'Enter a valid email address';
        if (!PHONE_REGEX.test(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit number';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.tehsil) newErrors.tehsil = 'Tehsil is required';
        if (formData.address.trim().length < 10)
            newErrors.address = 'Address must be at least 10 characters';

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
                    grade: formData.grade,
                    phoneNumber: formData.mobile,
                    address: formData.address,
                    district: formData.district,
                    tehsil: formData.tehsil,
                }),
            });

            const userData = await userRes.json();
            if (!userData.success) throw new Error(userData.error || 'Registration failed');
            const user = userData.data?.user;
            const userId = user?.id;

            navigate("/register/confirmation", {
                state: {
                    userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    parentage: user.parentage,
                    email: user.email,
                    grade: user.grade,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    district: user.district,
                    tehsil: user.tehsil,
                }
            });

            // 2️⃣ Initiate payment
            // const payRes = await fetch(`${BASE_URL}/api/payments/initiate`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ userId, amount: 1, currency: 'INR' }),
            // });

            // const payData = await payRes.json();
            // const orderSlug = payData?.data?.data?.order_slug;
            // const orderId = payData?.data?.data?.order_id;
            // const checkoutUrl = payData?.data?.data?.checkout_url;

            // if (!orderSlug || !orderId)
            //     throw new Error('Payment initiation failed (missing slug/order ID)');

            // openSMEPayCheckout(orderSlug, orderId, checkoutUrl);
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

        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">

            {/* HEADER */}
            <header className="max-w-4xl mx-auto flex items-center justify-between mb-10 animate-fadeIn">
                <div className="flex items-center gap-3">
                    <LogoIcon className="h-10 w-auto text-indigo-600 drop-shadow-sm" />

                    <div className="leading-tight">
                        <h1 className="font-bold text-2xl text-gray-900 tracking-tight">
                            Abacus <span className="text-green-600">Learning</span>
                        </h1>
                        <p className="text-xs text-gray-500 -mt-1">By Career Ready J&K</p>
                    </div>
                </div>

                <a
                    href="/"
                    className="text-sm text-indigo-600 hover:text-indigo-800 transition font-medium"
                >
                    ← Back to Home
                </a>
            </header>

            {/* FORM CARD */}
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white/40 p-8 md:p-10 rounded-3xl shadow-2xl animate-slideUp">

                <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-8">
                    Student Registration
                </h2>
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

                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField
                            id="parentage"
                            label="Parentage"
                            value={formData.parentage}
                            onChange={(e) => setFormData({ ...formData, parentage: e.target.value })}
                            error={errors.parentage}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium mb-1">Grade</label>
                            <select
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="block w-full px-4 py-3 border rounded-md"
                            >
                                <option value="">Select Grade</option>
                                {GRADES.map((grade) => (
                                    <option key={grade}>{grade}</option>
                                ))}

                            </select>
                            {errors.grade && <p className="text-red-600 text-sm">{errors.grade}</p>}
                        </div>
                    </div>


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
            </div>

            {!widgetReady && (
                <p className="text-center text-gray-500 text-sm mt-3">⏳ Loading widget...</p>
            )}
        </div>
    );
}