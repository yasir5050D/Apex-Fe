import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentResult() {
    const [params] = useSearchParams();
    const orderId = params.get("orderId");

    const [isSuccess, setIsSuccess] = useState(null);
    const [amount, setAmount] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [serverMessage, setServerMessage] = useState("");

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        let timer;

        if (!loading) {
            timer = setTimeout(() => {
                window.location.href = "/";
            }, 30000);
        }

        return () => clearTimeout(timer);
    }, [loading]);

    useEffect(() => {
        async function verifyPayment() {
            try {
                const res = await fetch(`${BASE_URL}/api/payments/validate/${orderId}`);
                const result = await res.json();

                const payment = result?.data;

                if (
                    payment?.status === true &&
                    (payment?.payment_status === "TEST_SUCCESS" ||
                        payment?.payment_status === "SUCCESS")
                ) {
                    setIsSuccess(true);
                    setAmount(payment?.amount || null);
                    setTransactionId(payment?.transactionId || null);
                    setServerMessage(result.message || "Payment Verified Successfully");
                } else {
                    setIsSuccess(false);
                    setServerMessage(result.message || "Payment Failed");
                }
            } catch (error) {
                setIsSuccess(false);
                setServerMessage("Server error. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        verifyPayment();
    }, [orderId]);

    // Loading Animation
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center animate-fadeIn">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-6 text-gray-700 text-lg font-medium">
                        Verifying your payment...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen flex items-center justify-center ${isSuccess ? "bg-green-50" : "bg-red-50"
                } py-12 px-4`}
        >
            <div className="max-w-xl w-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-10 text-center animate-slideUp">

                {/* Icon */}
                <div className="mb-6">
                    <div
                        className={`inline-flex items-center justify-center w-24 h-24 rounded-full shadow-lg ${isSuccess ? "bg-green-100" : "bg-red-100"
                            }`}
                    >
                        <svg
                            className={`w-14 h-14 ${isSuccess ? "text-green-600" : "text-red-600"
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
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-extrabold mb-3 text-gray-900">
                    {isSuccess ? "Payment Successful 🎉" : "Payment Failed ❌"}
                </h2>

                {/* Transaction */}
                <p className="text-gray-700 mb-3">
                    Transaction ID:{" "}
                    <span className="font-semibold text-gray-900">{transactionId}</span>
                </p>

                {/* Amount */}
                {amount && (
                    <p className="text-xl font-bold text-gray-900 mb-4">
                        Amount Paid: <span className="text-indigo-600">₹{amount}</span>
                    </p>
                )}

                {/* Message */}
                <p className="text-gray-600 mb-8">{serverMessage}</p>

                {/* Buttons */}
                {isSuccess ? (
                    <div className="flex flex-wrap justify-center gap-4">
                        <p className="text-gray-700 font-medium mb-6">
                            Payment has been successfully done. You will receive a confirmation email shortly.
                        </p>
                        <Link
                            to="/"
                            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90"
                        >
                            Back to Home
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-100"
                        >
                            Register Another
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                        <p className="text-red-600 font-medium mb-6">
                            Payment could not be completed. If the amount was deducted, it will be refunded automatically.
                            Please try again or contact support.
                        </p>
                        <Link
                            to="/register"
                            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:opacity-90"
                        >
                            Try Again
                        </Link>
                        <Link
                            to="/"
                            className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-100"
                        >
                            Back to Home
                        </Link>
                    </div>
                )}

                {/* Support */}
                <div className="mt-8 text-sm text-gray-500">
                    If you face any issues, contact support at{" "}
                    <a
                        className="text-indigo-600 font-medium"
                        href="mailto:support@careerreadyjk.live"
                    >
                        support@careerreadyjk.live
                    </a>
                </div>
            </div>
        </div>
    );
}
