// src/pages/Register.jsx
import React, { useState } from 'react';
import { Activity, Mail, Lock, User, Calendar, Phone, AlertCircle, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function Register() {
    const [data, setData] = useState({
        username: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        password: '',
        password_confirmation: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [registerStatus, setRegisterStatus] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Password strength checker
    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setData({ ...data, password: newPassword });
        setPasswordStrength(checkPasswordStrength(newPassword));
    };

    const getPasswordStrengthColor = () => {
        switch(passwordStrength) {
            case 0: return 'bg-gray-200';
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4: return 'bg-green-500';
            default: return 'bg-gray-200';
        }
    };

    const getPasswordStrengthText = () => {
        switch(passwordStrength) {
            case 0: return '';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setRegisterStatus('');

        // Client-side validation
        const newErrors = {};
        if (!data.username) newErrors.username = 'First name is required';
        if (!data.email) newErrors.email = 'Email is required';
        if (!data.password) newErrors.password = 'Password is required';
        if (data.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setProcessing(false);
            return;
        }

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                      mutation Register($input: RegisterInput!) {
                        register(input: $input) {
                          access_token
                          token_type
                          user {
                            id
                            email
                            role {
                              name
                            }
                            profile {
                              username
                              phone
                              date_of_birth
                              gender
                            }
                          }
                        }
                      }
                    `,
                    variables: {
                        input: {
                            email: data.email,
                            password: data.password,
                            password_confirmation: data.password_confirmation,
                            username: data.username,
                            phone: data.phone || null,
                            date_of_birth: data.date_of_birth || null,
                            gender: data.gender || null,
                        }
                    },
                }),
            });

            const result = await response.json();

            if (result.errors) {
                // Handle GraphQL errors
                const errorMessage = result.errors[0]?.message || 'Registration failed';
                const extensions = result.errors[0]?.extensions;

                if (extensions?.validation) {
                    // Laravel validation errors
                    setErrors(extensions.validation);
                } else {
                    setErrors({ email: errorMessage });
                }
            } else if (result.data?.register) {
                // Success
                localStorage.setItem('auth_token', result.data.register.access_token);
                localStorage.setItem('user', JSON.stringify(result.data.register.user));
                setRegisterStatus('Registration successful! Redirecting...');

                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setErrors({ email: 'Network error. Please check your connection and try again.' });
        } finally {
            setProcessing(false);
            setData({ ...data, password: '', password_confirmation: '' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
            {/* Header */}
            <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2">
                        <Activity className="w-8 h-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-800">SHAS</span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-2xl w-full">
                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                                <Activity className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Create Your Account
                            </h1>
                            <p className="text-gray-600">
                                Start your journey to better skin health
                            </p>
                        </div>

                        {/* Success Message */}
                        {registerStatus && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-medium text-green-800">{registerStatus}</p>
                            </div>
                        )}

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="username"
                                            type="text"
                                            value={data.username}
                                            onChange={(e) => setData({ ...data, username: e.target.value })}
                                            className={`block w-full pl-10 pr-3 py-3 border ${
                                                errors.username
                                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                            } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                                            placeholder="Jeremy"
                                            required
                                        />
                                    </div>
                                    {errors.username && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.username}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="username"
                                            type="text"
                                            value={data.username}
                                            onChange={(e) => setData({ ...data, username: e.target.value })}
                                            className={`block w-full pl-10 pr-3 py-3 border ${
                                                errors.username
                                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                            } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                    {errors.username && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.username}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        className={`block w-full pl-10 pr-3 py-3 border ${
                                            errors.email
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                                        placeholder="jeremy.doe@example.com"
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Optional Fields */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone (Optional)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 transition-colors"
                                            placeholder="+60123456789"
                                        />
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth (Optional)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="date_of_birth"
                                            type="date"
                                            value={data.date_of_birth}
                                            onChange={(e) => setData({ ...data, date_of_birth: e.target.value })}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Gender */}
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender (Optional)
                                </label>
                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) => setData({ ...data, gender: e.target.value })}
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 transition-colors"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer_not_to_say">Prefer not to say</option>
                                </select>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={handlePasswordChange}
                                        className={`block w-full pl-10 pr-12 py-3 border ${
                                            errors.password
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {data.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded ${
                                                        level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            Password strength: {getPasswordStrengthText()}
                                        </p>
                                    </div>
                                )}

                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.password}
                                    </p>
                                )}
                                <p className="mt-2 text-xs text-gray-500">
                                    Must be at least 8 characters with uppercase, lowercase, numbers, and special characters
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                                        className={`block w-full pl-10 pr-12 py-3 border ${
                                            errors.password_confirmation
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            {/* Terms and Privacy */}
                            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                                <p>
                                    By registering, you agree to our{' '}
                                    <a href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                        Privacy Policy
                                    </a>
                                    . Your data is encrypted and secure.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={submit}
                                disabled={processing}
                                className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all ${
                                    processing
                                        ? 'bg-indigo-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating your account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                                </div>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className="mt-6">
                            <a
                                href="/login"
                                className="w-full flex items-center justify-center px-4 py-3 border-2 border-indigo-600 text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-colors"
                            >
                                Sign In Instead
                            </a>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Your information is protected with medical-grade encryption
                        </p>
                    </div>
                </div>
            </div>

            {/* Back to Home Link */}
            <div className="pb-8 text-center">
                <a
                    href="/"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                    ← Back to Home
                </a>
            </div>
        </div>
    );
}
