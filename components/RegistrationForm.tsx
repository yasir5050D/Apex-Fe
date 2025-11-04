import React, { useState, useEffect } from "react";
import SpinnerIcon from "./icons/SpinnerIcon";
import InputField from "./InputField";

declare global {
  interface Window {
    smepayCheckout?: (config: {
      slug: string;
      onSuccess: (data: any) => void;
      onFailure: () => void;
    }) => void;
  }
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  // ✅ 1️⃣ Load SMEPay script
  useEffect(() => {
    const scriptUrl = "https://typof.co/smepay/checkout-v2.js";

    // Already loaded?
    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
      if (window.smepayCheckout) setWidgetReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      console.log("✅ SMEPay checkout widget loaded");
      setWidgetReady(true);
    };
    script.onerror = () => console.error("❌ Failed to load SMEPay checkout script");
    document.body.appendChild(script);
  }, []);

  // ✅ 2️⃣ Function to open SMEPay widget
  const openSMEPayCheckout = (slug: string) => {
    if (!window.smepayCheckout) {
      console.error("⚠️ SMEPay widget not ready yet.");
      alert("Please wait, SMEPay widget not ready yet.");
      return;
    }

    console.log("💳 Opening SMEPay checkout for:", slug);

    window.smepayCheckout({
      slug,
      onSuccess: (data) => {
        console.log("✅ Payment successful:", data);
        const callbackUrl = data?.callback_url;
        if (callbackUrl) {
          window.location.href = callbackUrl;
        } else {
          alert("Payment successful!");
        }
      },
      onFailure: () => {
        console.log("❌ Payment failed or closed.");
        alert("Payment failed or closed.");
      },
    });
  };

  // ✅ 3️⃣ Handle registration + payment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!widgetReady) {
      alert("Please wait, SMEPay widget is still loading...");
      return;
    }

    setLoading(true);

    try {
      // Step 1️⃣ Register user
      const userRes = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
        }),
      });

      const userData = await userRes.json();
      if (!userData.success) throw new Error(userData.error || "Registration failed");

      const userId = userData.data?.user?.id;
      console.log("👤 User registered:", userId);

      // Step 2️⃣ Initiate payment
      const payRes = await fetch("http://localhost:5000/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: 100,
          currency: "INR",
        }),
      });

      const payData = await payRes.json();
      console.log("💰 Payment initiation response:", payData);

      if (!payData.success || !payData.data?.order_slug) {
        throw new Error("Payment initiation failed");
      }

      // Step 3️⃣ Open SMEPay directly
      const orderSlug = payData.data.order_slug;
      console.log("🪪 Order slug received:", orderSlug);

      openSMEPayCheckout(orderSlug);
    } catch (err: any) {
      console.error("❌ Error during registration/payment:", err.message);
      alert(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Register & Pay
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <InputField
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

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
            "Create Account & Pay"
          )}
        </button>
      </form>

      {!widgetReady && (
        <p className="text-center text-gray-500 text-sm mt-3">
          ⏳ Loading SMEPay widget...
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;
