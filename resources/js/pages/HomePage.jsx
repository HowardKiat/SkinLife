import React from 'react';
import { Activity, Camera, MapPin, Shield, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Activity className="w-8 h-8 text-indigo-600" />
                            <span className="text-2xl font-bold text-gray-800">SkinLife</span>
                        </div>
                        <div className="flex gap-4">
                            <a href="/login" className="px-6 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition">
                                Login
                            </a>
                            <a href="/register" className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Your Skin Health,
                            <span className="text-indigo-600"> AI-Powered</span>
                        </h1>
                        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                            Get instant preliminary skin condition screening with AI technology.
                            Find nearby dermatologists and book appointments seamlessly.
                        </p>

                        {/* Key Stats */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-indigo-600">87%</div>
                                <div className="text-sm text-gray-600">Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">&lt;3s</div>
                                <div className="text-sm text-gray-600">Analysis Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">100%</div>
                                <div className="text-sm text-gray-600">Private</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition text-center font-semibold">
                                Start Free Analysis
                            </a>
                            <a href="#how-it-works" className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition text-center font-semibold">
                                Learn More
                            </a>
                        </div>
                    </div>

                    {/* Hero Image Placeholder */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl shadow-2xl p-8 aspect-square flex items-center justify-center">
                            <Camera className="w-32 h-32 text-white opacity-50" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <div>
                                    <div className="font-bold text-gray-800">12,000+ Analyses</div>
                                    <div className="text-sm text-gray-600">Performed this month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="how-it-works" className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How SkinLife Works?</h2>
                        <p className="text-xl text-gray-600">Three simple steps to better skin health</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 h-full border-2 border-indigo-100 hover:shadow-lg transition">
                                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Upload Image</h3>
                                <p className="text-gray-700 mb-4">
                                    Take a clear photo of your skin concern using your smartphone or upload an existing image.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Image quality check</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Secure upload</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>End-to-end encrypted</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-indigo-200"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 h-full border-2 border-purple-100 hover:shadow-lg transition">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                                    <Activity className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. AI Analysis</h3>
                                <p className="text-gray-700 mb-4">
                                    Our AI model analyzes your image instantly, identifying potential skin conditions.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>87% accuracy rate</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Confidence scores</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Clear explanations</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-purple-200"></div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 h-full border-2 border-green-100 hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Get Care</h3>
                            <p className="text-gray-700 mb-4">
                                Find nearby dermatologists and book appointments directly through our platform.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Location-based search</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Real-time availability</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Easy booking</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust & Safety Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Privacy Matters</h2>
                        <p className="text-xl text-gray-600">Built with medical-grade security and ethics</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <Shield className="w-12 h-12 text-indigo-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">100% Private</h3>
                            <p className="text-sm text-gray-600">Your data is encrypted and only accessible by you</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <AlertCircle className="w-12 h-12 text-orange-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Screening Only</h3>
                            <p className="text-sm text-gray-600">AI assists but never replaces medical professionals</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Regular Updates</h3>
                            <p className="text-sm text-gray-600">AI model reviewed for fairness and accuracy</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <Clock className="w-12 h-12 text-purple-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">24/7 Available</h3>
                            <p className="text-sm text-gray-600">Get preliminary screening anytime, anywhere</p>
                        </div>
                    </div>

                    {/* Important Disclaimer */}
                    <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Medical Disclaimer</h4>
                                <p className="text-gray-700">
                                    SkinLife provides preliminary screening for educational purposes only. This tool does not replace
                                    professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare
                                    provider for proper medical evaluation and care. If you suspect a serious condition, seek
                                    immediate medical attention.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Take Control of Your Skin Health?</h2>
                    <p className="text-xl mb-8 text-indigo-100">
                        Join thousands of users who trust SkinLife for preliminary skin screening
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/register" className="px-8 py-4 bg-white text-indigo-600 rounded-lg shadow-lg hover:bg-gray-100 transition font-semibold">
                            Create Free Account
                        </a>
                        <a href="/about" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-semibold">
                            Learn About Our Technology
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-6 h-6 text-indigo-400" />
                                <span className="text-xl font-bold text-white">SkinLife</span>
                            </div>
                            <p className="text-sm text-gray-400">
                                AI-powered skin health assistant system supporting SDG 3: Good Health and Well-being
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/features" className="hover:text-white transition">Features</a></li>
                                <li><a href="/how-it-works" className="hover:text-white transition">How It Works</a></li>
                                <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                                <li><a href="/research" className="hover:text-white transition">Our Research</a></li>
                                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                                <li><a href="/disclaimer" className="hover:text-white transition">Medical Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>© 2025 SkinLife - Skin Health Assistant System. All rights reserved.</p>
                        <p className="mt-2">Aligns with UN SDG 3: Good Health and Well-being</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
