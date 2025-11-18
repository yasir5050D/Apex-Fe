import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentResult() {
    const [params] = useSearchParams();
    const orderId = params.get("orderId");

    const [isSuccess, setIsSuccess] = useState(null);
    const [amount, setAmount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [serverMessage, setServerMessage] = useState("");

    // 🚀 BASE URL for your backend
    const BASE_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        async function verifyPayment() {
            try {
                const res = await fetch(`${BASE_URL}/api/payments/validate/${orderId}`);
                const result = await res.json();

                console.log("🟣 Payment Verify Response:", result);
                const payment = result?.data;

                if (
                    payment?.status === true &&
                    (payment?.payment_status === "TEST_SUCCESS" ||
                        payment?.payment_status === "SUCCESS")
                ) {
                    setIsSuccess(true);

                    const amt = result?.data?.amount || null;

                    setAmount(amt);
                    setServerMessage(result.message || "Payment Verified Successfully");
                } else {
                    setIsSuccess(false);
                    setServerMessage(result.message || "Payment Failed");
                }
            } catch (error) {
                console.error("❌ Payment verification failed:", error);
                setIsSuccess(false);
                setServerMessage("Server error. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        verifyPayment();
    }, [orderId]);

    // Loading UI
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent animate-spin rounded-full mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg">Verifying your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen flex items-center justify-center ${isSuccess ? "bg-green-50" : "bg-red-50"
                } py-12 px-4`}
        >
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
                <div className="mb-6">
                    <div
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${isSuccess ? "bg-green-100" : "bg-red-100"
                            }`}
                    >
                        <svg
                            className={`w-10 h-10 ${isSuccess ? "text-green-600" : "text-red-600"
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isSuccess
                                        ? "M5 13l4 4L19 7"
                                        : "M6 18L18 6M6 6l12 12"
                                }
                            ></path>
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">
                    {isSuccess ? "Payment Successful 🎉" : "Payment Failed ❌"}
                </h2>

                <p className="text-gray-600 mb-2">
                   Transaction ID: <span className="font-medium">{orderId}</span>
                </p>

                {amount && (
                    <p className="text-lg font-semibold mb-3">
                        Amount: ₹{amount}
                    </p>
                )}

                <p className="text-gray-700 mb-6">{serverMessage}</p>

                {isSuccess ? (
                    <div className="space-x-4">
                        <Link
                            to="/"
                            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white rounded-lg font-semibold"
                        >
                            Back to Home
                        </Link>
                        <Link to="/register" className="px-5 py-2 border rounded-lg">
                            Register Another
                        </Link>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link
                            to="/register"
                            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white rounded-lg font-semibold"
                        >
                            Try Again
                        </Link>
                        <Link to="/" className="px-5 py-2 border rounded-lg">
                            Back to Home
                        </Link>
                    </div>
                )}

                <div className="mt-6 text-sm text-gray-500">
                    If you face any issues, contact support at{" "}
                    <a
                        className="text-blue-600"
                        href="mailto:support@careerreadyjk.live"
                    >
                        support@careerreadyjk.live
                    </a>
                </div>
            </div>
        </div>
    );
}
