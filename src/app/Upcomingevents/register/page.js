"use client";
import React from "react";
import RegistrationForm from "@/components/ui/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6 py-20">
      <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full max-w-md shadow-lg shadow-purple-500/20">
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Event Registration
        </h1>
        <RegistrationForm />
      </div>
    </div>
  );
}
