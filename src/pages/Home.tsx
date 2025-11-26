import { useNavigate } from "react-router-dom"

import React, { useState } from 'react';
import LogoIcon from '../../components/icons/LogoIcon';
import {
    Menu,
    X,
    Brain,
    Calculator,
    Trophy,
    Users,
    Phone,
    Mail,
    MapPin,
    Clock,
    CheckCircle2,
    Facebook,
    Youtube,
    Instagram,
    Star,
    XIcon,
} from 'lucide-react';
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/input";
import Textarea from "@/components/textarea";

export default function Home() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 selection:bg-indigo-500 selection:text-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex lg:flex-1">
                            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                                <LogoIcon className="h-8 w-auto text-indigo-600" />
                                <div className="flex flex-col leading-tight">
                                    <span className="font-bold text-xl tracking-tight text-gray-900">
                                        Abacus <span className="text-green-600">Learning</span>
                                    </span>
                                    <p className="text-[10px] text-gray-400 -mt-0.5">By Career Ready J&amp;K</p>
                                </div>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Home
                            </a>
                              <a href="/franchise" className="text-gray-700 hover:text-blue-600 transition-colors">Franchise</a>

                            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                                About
                            </a>
                            <a href="#programs" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Programs
                            </a>
                            <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Benefits
                            </a>
                            <a
                                href="#testimonials"
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                Testimonials
                            </a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Contact
                            </a>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block ms-4">
                            <Button className="hover:opacity-90 bg-indigo-600 text-white" onClick={() => navigate("/register")}>
                                Enroll Now
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            <div className="flex flex-col gap-4">
                                <a
                                    href="#home"
                                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    Home
                                </a>
                                  <a href="/franchise" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Franchise</a>
                                <a
                                    href="#about"
                                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    About
                                </a>
                                <a
                                    href="#programs"
                                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    Programs
                                </a>
                                <a
                                    href="#benefits"
                                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    Benefits
                                </a>
                                <a
                                    href="#testimonials"
                                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    Testimonials
                                </a>
                                <a
                                    href="#contact"
                                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    Contact
                                </a>
                                <Button
                                    onClick={() => navigate("/register")}
                                    className="hover:opacity-90 w-full bg-indigo-600 text-white"
                                >
                                    Enroll Now
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative isolate px-6 pt-14 lg:px-8">
                <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Abacus Learning – A Flagship Program by Career Ready J&K
                </h3>

                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Career Ready J&amp;K proudly presents Abacus Learning, one of our flagship brain-development
                    programs designed to strengthen mental arithmetic, sharpen cognitive skills, and build lifelong
                    confidence in young learners. Specially crafted for children aged 4 to 14 years (Classes 1st to 10th),
                    this program boosts concentration, memory retention, speed & accuracy, visualization, problem-solving
                    skills, and overall academic performance.
                </p>
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    ></div>
                </div>

                <div className="mx-auto max-w-3xl py-8 sm:py-8 lg:py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Unlock Your Child's Mental Math Potential.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Abacus Learning is a comprehensive skill development program that enhances mental
                            arithmetic, concentration, and cognitive abilities through proven abacus-based
                            techniques.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={() => navigate("/register")}
                                className="rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    ></div>
                </div>
            </main>


            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-gray-900 mb-4">About Abacus Learning</h2>

                        <p className="text-gray-600 mb-6">
                            Abacus Learning is a flagship brain-development program by Career Ready J&amp;K. Our mission
                            is to make learning smart, fun, and meaningful for students across Jammu &amp; Kashmir.
                            The abacus is one of the world’s oldest and most powerful tools for developing a child’s brain.
                            Through regular practice and guided levels, students learn to perform complex calculations mentally—boosting
                            confidence, analytical thinking, and academic performance.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Left Column */}
                            <div>
                                <h3 className="text-gray-900 mb-2 font-semibold">Why Abacus Learning?</h3>
                                <ul className="text-gray-600 space-y-2 mb-6">
                                    <li>• Enhances concentration and attention span</li>
                                    <li>• Strengthens memory retention and recall</li>
                                    <li>• Improves speed &amp; accuracy in problem solving</li>
                                    <li>• Boosts visualization and cognitive skills</li>
                                    <li>• Elevates overall academic performance</li>
                                </ul>
                            </div>

                            {/* Right Column */}
                            <div>
                                <h3 className="text-gray-900 mb-2 font-semibold">Key Highlights</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Level-based structured curriculum</li>
                                    <li>• Interactive classes with certified Abacus trainers</li>
                                    <li>• Fun-based learning with engaging activities</li>
                                    <li>• Complete study material for every registered student</li>
                                    <li>• Regular assessments and certifications</li>
                                </ul>
                            </div>

                        </div>

                    </div>



                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-2 hover:border-blue-500 transition-colors">
                            <CardContent className="p-6">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <Brain style={{ color: '#0057A3' }} size={28} />
                                </div>
                                <h3 className="text-gray-900 mb-3">Brain Development</h3>
                                <p className="text-gray-600">
                                    Stimulate both left and right brain hemispheres for holistic cognitive development
                                    and enhanced learning capabilities.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-green-500 transition-colors">
                            <CardContent className="p-6">
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <Calculator style={{ color: '#4CAF50' }} size={28} />
                                </div>
                                <h3 className="text-gray-900 mb-3">Mental Math Mastery</h3>
                                <p className="text-gray-600">
                                    Master rapid mental calculations without calculators, building confidence and
                                    speed in arithmetic operations.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-yellow-500 transition-colors">
                            <CardContent className="p-6">
                                <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <Users style={{ color: '#D4A747' }} size={28} />
                                </div>
                                <h3 className="text-gray-900 mb-3">Expert Instructors</h3>
                                <p className="text-gray-600">
                                    Learn from certified trainers with years of experience in abacus education and
                                    child development.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-gray-900 mb-4">Our Programs</h2>
                        <p className="text-gray-600">
                            Structured curriculum designed for different age groups and skill levels
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Level 1 */}
                        <Card className="bg-white hover:shadow-xl transition-shadow">
                            <CardContent className="p-8">
                                <div className="inline-block px-3 py-1 bg-blue-100 rounded-full mb-4">
                                    <span style={{ color: '#0057A3' }}>Level 1</span>
                                </div>
                                <h3 className="text-gray-900 mb-3">Foundation Course</h3>
                                <p className="text-gray-600 mb-6">Ages 5-7 years</p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Basic abacus operations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Number recognition & counting</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Simple addition & subtraction</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Visual memory exercises</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-indigo-600 text-white" onClick={() => navigate("/register")}>

                                    Enroll Now
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Level 2 */}
                        <Card
                            className="bg-white hover:shadow-xl transition-shadow border-2"
                            style={{ borderColor: '#4CAF50' }}
                        >
                            <CardContent className="p-8">
                                <div className="inline-block px-3 py-1 bg-green-100 rounded-full mb-4">
                                    <span style={{ color: '#4CAF50' }}>Level 2 - Popular</span>
                                </div>
                                <h3 className="text-gray-900 mb-3">Intermediate Course</h3>
                                <p className="text-gray-600 mb-6">Ages 8-10 years</p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Advanced calculations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Mental math techniques</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Multiplication & division</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Speed & accuracy training</span>
                                    </li>
                                </ul>
                                <Button className="w-full" style={{ backgroundColor: '#4CAF50' }}>
                                    Enroll Now
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Level 3 */}
                        <Card className="bg-white hover:shadow-xl transition-shadow">
                            <CardContent className="p-8">
                                <div className="inline-block px-3 py-1 bg-yellow-100 rounded-full mb-4">
                                    <span style={{ color: '#D4A747' }}>Level 3</span>
                                </div>
                                <h3 className="text-gray-900 mb-3">Advanced Course</h3>
                                <p className="text-gray-600 mb-6">Ages 11+ years</p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Complex problem solving</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Competition preparation</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Decimal & fraction operations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            style={{ color: '#4CAF50' }}
                                            size={20}
                                            className="flex-shrink-0 mt-0.5"
                                        />
                                        <span className="text-gray-700">Advanced mental techniques</span>
                                    </li>
                                </ul>
                                <Button className="w-full" style={{ backgroundColor: '#0057A3' }} onClick={() => navigate("/register")}>
                                    Enroll Now
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1718306201865-cae4a08311fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYmFjdXMlMjBtYXRoZW1hdGljc3xlbnwxfHx8fDE3NjIxNTIzODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Abacus Learning"
                                className="rounded-2xl shadow-xl w-full h-auto"
                            />
                        </div>

                        <div>
                            <h2 className="text-gray-900 mb-6">Key Benefits of Abacus Learning</h2>
                            <p className="text-gray-600 mb-8">
                                Our program offers comprehensive cognitive and academic benefits that extend far
                                beyond mathematics.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Brain style={{ color: '#0057A3' }} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 mb-2">Enhanced Concentration</h3>
                                        <p className="text-gray-600">
                                            Improves focus and attention span through structured practice sessions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Trophy style={{ color: '#4CAF50' }} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 mb-2">Academic Excellence</h3>
                                        <p className="text-gray-600">
                                            Boosts overall academic performance and problem-solving abilities.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                        <Calculator style={{ color: '#D4A747' }} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 mb-2">Speed & Accuracy</h3>
                                        <p className="text-gray-600">
                                            Develops lightning-fast calculation skills with high precision.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <Star style={{ color: '#9333EA' }} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 mb-2">Confidence Building</h3>
                                        <p className="text-gray-600">
                                            Builds self-confidence through measurable progress and achievements.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-gray-900 mb-4">What Parents Say</h2>
                        <p className="text-gray-600">
                            Real stories from families who have experienced the Career Ready difference
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="#D4A747" style={{ color: '#D4A747' }} />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4">
                                    "My daughter's math skills have improved tremendously! She's now more confident in
                                    class and enjoys solving problems."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                                        <span>PS</span>
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Shakeel Ahmad</div>
                                        <p className="text-gray-600">Shopian, J&K</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="#D4A747" style={{ color: '#D4A747' }} />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4">
                                    "The structured curriculum and dedicated teachers make all the difference. Highly
                                    recommended for every child!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                                        <span>RK</span>
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Mohammad Ayoub</div>
                                        <p className="text-gray-600">Parent, Shopian</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="#D4A747" style={{ color: '#D4A747' }} />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4">
                                    "Best investment in my child's education. The mental math abilities developed here
                                    are truly remarkable."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
                                        <span>AN</span>
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Nazir Ahmad</div>
                                        <p className="text-gray-600">Parent, Shopian</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-gray-900 mb-6">Get in Touch</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as
                                soon as possible.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Phone style={{ color: '#0057A3' }} size={24} />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Phone</div>
                                        <p className="text-gray-600">+91 9797240115</p>
                                        <p className="text-gray-600">+91 7889469804</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Mail style={{ color: '#4CAF50' }} size={24} />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Email</div>
                                        <p className="text-gray-600">info@careerreadyjk.live</p>
                                        <p className="text-gray-600">support@careerreadyjk.live</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                        <MapPin style={{ color: '#D4A747' }} size={24} />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Address</div>
                                        <p className="text-gray-600">Imamsahib Shopian</p>
                                        <p className="text-gray-600">Jammu & Kashmir-192303</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <Clock style={{ color: '#9333EA' }} size={24} />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Working Hours</div>
                                        <p className="text-gray-600">Mon - Sat: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Card>
                                <CardContent className="p-8">
                                    <h3 className="text-gray-900 mb-6">Send us a Message</h3>
                                    <form className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-700 mb-2">First Name</label>
                                                <Input placeholder="John" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-2">Last Name</label>
                                                <Input placeholder="Doe" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Email</label>
                                            <Input type="email" placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Phone</label>
                                            <Input type="tel" placeholder="+91 98765 43210" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Child's Age</label>
                                            <Input placeholder="e.g., 8 years" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Message</label>
                                            <Textarea
                                                placeholder="Tell us about your child's learning needs..."
                                                rows={4}
                                            />
                                        </div>
                                        <Button className="w-full bg-indigo-600 text-white">Submit Inquiry</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <LogoIcon variant="white" className="mb-4" />
                            <p className="text-gray-400">
                                Empowering young minds through innovative abacus learning techniques.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#programs" className="text-gray-400 hover:text-white transition-colors">
                                        Programs
                                    </a>
                                </li>
                                <li>
                                    <a href="#benefits" className="text-gray-400 hover:text-white transition-colors">
                                        Benefits
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white mb-4">Programs</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Foundation Course
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Intermediate Course
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Advanced Course
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Online Classes
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white mb-4">Connect With Us</h3>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                                >
                                    <span>
                                        <Facebook></Facebook>
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors"
                                >
                                    <span>
                                        <XIcon></XIcon>
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition-colors"
                                >
                                    <span>
                                        <Instagram></Instagram>
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
                                >
                                    <span>
                                        <Youtube></Youtube>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400">
                                &copy; {new Date().getFullYear()} Career Ready J&K. All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}