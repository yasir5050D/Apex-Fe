import LogoIcon from "@/components/icons/LogoIcon";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Franchise() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 mt-4">

            {/* HEADER */}
            <header className="max-w-4xl mx-auto flex items-center justify-center mb-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                    <LogoIcon className="h-10 w-auto text-indigo-600 drop-shadow-sm" />

                    <div className="leading-tight">
                        <h1 className="font-bold text-2xl text-gray-900 tracking-tight">
                            Abacus <span className="text-green-600">Learning</span>
                        </h1>
                        <p className="text-xs text-gray-500 -mt-1">By Career Ready J&K</p>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative bg-indigo-700 text-white py-24 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Become a Career Ready JK - Abacus Franchise Partner
                </h1>

                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Start our flagship <strong>Abacus Learning Program</strong> in your district or area
                    and empower children with speed, accuracy, and confidence.
                </p>

                <button
                    onClick={() => navigate("/franchise/register")}
                    className="mt-8 bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-200 transition"
                >
                    Apply for Franchise
                </button>
            </section>

            {/* ABOUT SECTION */}
            <section className="max-w-6xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700">
                    Career Ready JK – Abacus Learning Program
                </h2>

                <p className="text-center text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
                    Career Ready JK launches its flagship <strong>Abacus Learning Program</strong>
                    designed to improve concentration, memory, problem-solving, and mental speed
                    in children. Our mission is to bring high-quality skill development education
                    to every district across Jammu & Kashmir.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-14">
                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-indigo-700">Low Investment</h3>
                        <p className="text-gray-600 mt-2">
                            Start your own Abacus Center with minimal setup cost and high returns.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-indigo-700">Complete Training</h3>
                        <p className="text-gray-600 mt-2">
                            We provide trainer certification, course material, and ongoing support.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-indigo-700">Recognized Brand</h3>
                        <p className="text-gray-600 mt-2">
                            Career Ready JK is a trusted name in skill development and education.
                        </p>
                    </div>
                </div>
            </section>

            {/* BENEFITS SECTION */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-indigo-700">Franchise Benefits</h2>

                    <div className="grid md:grid-cols-2 gap-10 mt-12 text-gray-700 text-lg">
                        <ul className="space-y-4">
                            <li>✔ Complete Abacus training & certification</li>
                            <li>✔ Student study kits & books</li>
                            <li>✔ Marketing support & social media promotion</li>
                            <li>✔ Use of Career Ready JK branding & logo</li>
                        </ul>

                        <ul className="space-y-4">
                            <li>✔ Center setup guidance</li>
                            <li>✔ Student certificates provided</li>
                            <li>✔ High income potential, low monthly cost</li>
                            <li>✔ Lifetime franchise support</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ELIGIBILITY SECTION */}
            <section className="max-w-6xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-indigo-700 text-center">Who Can Apply?</h2>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="bg-indigo-50 p-6 rounded-xl shadow">
                        <h3 className="font-bold text-xl">Teachers</h3>
                        <p className="mt-2 text-gray-600">Start your own Abacus learning center.</p>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-xl shadow">
                        <h3 className="font-bold text-xl">Housewives</h3>
                        <p className="mt-2 text-gray-600">Earn from home with flexible timings.</p>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-xl shadow">
                        <h3 className="font-bold text-xl">Coaching Institutes</h3>
                        <p className="mt-2 text-gray-600">Add Abacus to your existing courses.</p>
                    </div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-indigo-700">Franchise Process</h2>

                    <div className="grid md:grid-cols-4 gap-8 mt-12 text-center">
                        {[
                            "Submit Franchise Application",
                            "Telephonic / Online Discussion",
                            "Training & Certification",
                            "Start Your Abacus Center"
                        ].map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow">
                                <div className="text-3xl font-bold text-indigo-700">{index + 1}</div>
                                <p className="mt-3 text-gray-700">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                    Start Career Ready JK Abacus Center in Your District
                </h2>
                <p className="text-gray-600 mt-2">
                    Limited districts available — apply now!
                </p>

                <button
                    onClick={() => navigate("/franchise/register")}
                    className="mt-6 bg-indigo-700 text-white px-10 py-3 rounded-lg text-lg font-semibold shadow hover:bg-indigo-800 transition"
                >
                    Apply for Franchise
                </button>
            </section>

        </div>
    );
}
