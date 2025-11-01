"use client";
import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = ({ eventTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    hackerrankId: "",
    whatsappNumber: "",
    event: eventTitle,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.hackerrankId.trim()) {
      newErrors.hackerrankId = "HackerRank ID is required";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.whatsappNumber.replace(/\s+/g, ""))) {
      newErrors.whatsappNumber = "Please enter a valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/sign_auth", formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 100000,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setFormData({
          name: "",
          rollNumber: "",
          email: "",
          hackerrankId: "",
          whatsappNumber: "",
          event: eventTitle,
        });

        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      
      if (err.response) {
        setErrorMessage(
          err.response.data?.message || 
          `Registration failed: ${err.response.status}`
        );
      } else if (err.request) {
        setErrorMessage("No response from server. Please check your connection.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse" />
      
      <div className="relative backdrop-blur-xl bg-gray-900/80 p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Event Registration
          </h2>
          <p className="text-gray-400 text-sm mt-2">{eventTitle}</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl backdrop-blur-sm animate-bounce">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Registration Successful!</p>
                <p className="text-green-300/80 text-sm">You're all set for the event</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-red-400 font-semibold">Registration Failed</p>
                <p className="text-red-300/80 text-sm">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="group">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-gray-500`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
          </div>

          {/* Roll Number Field */}
          <div className="group">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Roll Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="rollNumber"
                placeholder="Enter your roll number"
                value={formData.rollNumber}
                onChange={handleChange}
                disabled={loading}
                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border ${
                  errors.rollNumber ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-gray-500`}
              />
            </div>
            {errors.rollNumber && (
              <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                <span>⚠</span> {errors.rollNumber}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-gray-500`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
          </div>

          {/* HackerRank ID Field */}
          <div className="group">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              HackerRank ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="hackerrankId"
                placeholder="Your HackerRank username"
                value={formData.hackerrankId}
                onChange={handleChange}
                disabled={loading}
                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border ${
                  errors.hackerrankId ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-gray-500`}
              />
            </div>
            {errors.hackerrankId && (
              <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                <span>⚠</span> {errors.hackerrankId}
              </p>
            )}
          </div>

          {/* WhatsApp Number Field */}
          <div className="group">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              WhatsApp Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <input
                type="tel"
                name="whatsappNumber"
                placeholder="10-digit mobile number"
                value={formData.whatsappNumber}
                onChange={handleChange}
                disabled={loading}
                maxLength={10}
                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border ${
                  errors.whatsappNumber ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-gray-500`}
              />
            </div>
            {errors.whatsappNumber && (
              <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                <span>⚠</span> {errors.whatsappNumber}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full group overflow-hidden rounded-xl p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:opacity-50"
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl" />
            
            {/* Button Content */}
            <div className="relative bg-gray-900 rounded-[10px] px-6 py-3.5 flex items-center justify-center gap-3 group-hover:bg-transparent transition-all duration-300">
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="font-semibold text-white">Processing...</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-white">Complete Registration</span>
                  <svg
                    className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By registering, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;