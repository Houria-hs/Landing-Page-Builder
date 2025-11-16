import React, { useState } from 'react';
import {login} from "../services/authService";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });
       if (onLogin) onLogin(user);
    } catch (err) {
      console.error("Registration API error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
  <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
      Welcome Back 👋
    </h2>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-200"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-200"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Log In
      </button>
    </form>
    <p className="text-center text-sm text-gray-500 mt-6">
      Don’t have an account?{" "}
      <a
        href="/register"
        className="text-pink-500 font-medium hover:underline transition-colors duration-200"
      >
        Sign up
      </a>
    </p>
  </div>
</div>

  );
}