import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Printer, FileDown } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/Card";
import LogoIcon from "@/components/icons/LogoIcon";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function RegistrationConfirmation() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center animate-fadeIn border border-gray-200">

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <svg
                            className="w-16 h-16 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        No Registration Data
                    </h2>

                    {/* Subtext */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        It looks like this page was accessed without submitting a registration form.
                        Please try again from the beginning.
                    </p>

                    {/* Button */}
                    <Button
                        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    const {
        userId,
        firstName,
        lastName,
        parentage,
        email,
        grade,
        phoneNumber,
        address,
        district,
        tehsil,
    } = state;

    const generatePDF = async () => {
        const element = document.getElementById("pdf-area");

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            scrollY: -window.scrollY,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
        pdf.save(`Registration_${userId}.pdf`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 print:bg-white">
            <Card className="w-full max-w-3xl rounded-2xl shadow-xl border print:shadow-none print:border-0">
                <CardContent className="p-6 sm:p-10">

                    {/* PDF Wrapper */}
                    <div id="pdf-area" className="space-y-6">

                        {/* Responsive Header */}
                        <div className="flex flex-col items-center text-center border-b pb-6">

                            {/* Logo + Title */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                                <LogoIcon className="h-12 w-auto text-indigo-600 drop-shadow-sm" />

                                <div className="leading-tight text-center sm:text-left">
                                    <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight">
                                        Abacus <span className="text-green-600">Learning</span>
                                    </h1>
                                    <p className="text-xs sm:text-sm text-gray-500 -mt-1">
                                        By Career Ready J&amp;K
                                    </p>
                                </div>
                            </div>

                            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-3" />

                            <h2 className="text-lg sm:text-xl font-semibold">Registration Successful!</h2>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Your registration has been recorded.
                            </p>
                        </div>

                        {/* Responsive Form Details */}
                        <div className="bg-white border rounded-xl p-4 sm:p-6 print:border-black print:border-2 print:p-8">

                            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                Registration Details
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm sm:text-base">

                                <p><strong>User ID:</strong><br /> {userId}</p>
                                <p><strong>Grade:</strong><br /> {grade}</p>

                                <p><strong>First Name:</strong><br /> {firstName}</p>
                                <p><strong>Last Name:</strong><br /> {lastName}</p>

                                <p><strong>Parentage:</strong><br /> {parentage}</p>
                                <p><strong>Email:</strong><br /> {email}</p>

                                <p><strong>Phone Number:</strong><br /> {phoneNumber}</p>
                                <p><strong>District:</strong><br /> {district}</p>

                                <p><strong>Tehsil:</strong><br /> {tehsil}</p>

                                <p className="col-span-1 sm:col-span-2">
                                    <strong>Address:</strong><br /> {address}
                                </p>

                            </div>
                        </div>
                    </div>
                    {/* Buttons — Responsive + Hidden on Print */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 print:hidden">

                        <Button
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg"
                            onClick={() => navigate("/")}
                        >
                            Back to Home
                        </Button>

                        <Button
                            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg flex items-center gap-2"
                            onClick={() => window.print()}
                        >
                            <Printer className="w-4 h-4" /> Print
                        </Button>

                    </div>


                    {/* Support */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        For support, email{" "}
                        <a
                            className="text-indigo-600 font-medium"
                            href="mailto:support@careerreadyjk.live"
                        >
                            support@careerreadyjk.live
                        </a>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
