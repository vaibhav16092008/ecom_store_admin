"use client";
import React, { useState } from "react";
import Head from "next/head";
import { setToken } from "@/utils/connection";
import toast from "react-hot-toast";
import { postCallWH } from "@/utils/apiCall";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userName: username,
      password
    };
    try {
      const response = await postCallWH("login", payload);
      if (response?.data?.status === 200) {
        // console.log(response);

        toast.success(response?.data?.message || "Login successful!");
        setToken(response?.data?.data?.token);
        window.location.href = "/dashboard";
      }
    } catch (error) { }
  };

  return (
    <>
      <Head>
        <title>Login | Modern Design</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        {/* Floating background elements */}
        <div className="fixed -top-20 -left-20 w-64 h-64 bg-purple-100 rounded-full filter blur-3xl opacity-30 animate-float"></div>
        <div className="fixed -bottom-20 -right-20 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30 animate-float-delay"></div>

        <div className="relative w-full max-w-md z-10">
          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Decorative header */}
            <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>

            <div className="p-8">
              {/* Logo/Title area */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl shadow-md mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Welcome back
                </h1>
                <p className="text-gray-500">Sign in to your account</p>
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </button>
                <button className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
                  </svg>
                </button>
                <button className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.042 18.992c-2.721 0-4.266-1.318-4.266-2.603 0-1.292 1.543-1.483 2.93-1.604l1.043-.117c.771-.087 1.001-.234 1.001-.492 0-.234-.211-.492-.68-.492-.492 0-.785.258-1.021.656l-1.865-.844c.527-1.185 1.64-1.949 3.022-1.949 1.827 0 3.054.961 3.054 2.344 0 1.056-.914 1.711-2.308 1.828l-.914.094c-.703.07-.914.211-.914.469 0 .281.246.492.703.492.445 0 .914-.188 1.24-.703l1.827.773c-.562 1.24-1.734 1.949-3.152 1.949zm5.908-1.617c0 .609-.492 1.101-1.101 1.101-.609 0-1.101-.492-1.101-1.101 0-.609.492-1.101 1.101-1.101.609 0 1.101.492 1.101 1.101z" />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-sm text-gray-400">
                    or continue with username
                  </span>
                </div>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    className={`block text-sm font-medium mb-2 transition-all duration-200 ${isFocused.username || username
                      ? "text-gray-800"
                      : "text-gray-500"
                      }`}
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="username"
                      className={`w-full px-4 py-3 bg-gray-50 border ${isFocused.username
                        ? "border-purple-300 ring-2 ring-purple-100"
                        : "border-gray-200"
                        } rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-200`}
                      placeholder="example123"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() =>
                        setIsFocused({ ...isFocused, username: true })
                      }
                      onBlur={() =>
                        setIsFocused({ ...isFocused, username: false })
                      }
                    />
                    {isFocused.username && (
                      <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-purple-400"
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
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 transition-all duration-200 ${isFocused.password || password
                      ? "text-gray-800"
                      : "text-gray-500"
                      }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className={`w-full px-4 py-3 bg-gray-50 border ${isFocused.password
                        ? "border-purple-300 ring-2 ring-purple-100"
                        : "border-gray-200"
                        } rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-200`}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() =>
                        setIsFocused({ ...isFocused, password: true })
                      }
                      onBlur={() =>
                        setIsFocused({ ...isFocused, password: false })
                      }
                    />
                    {isFocused.password && (
                      <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-600"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-purple-500 hover:text-purple-600 transition-colors duration-200"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
                >
                  Sign in
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-purple-500 hover:text-purple-600 transition-colors duration-200"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes to your global CSS */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite 2s;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
