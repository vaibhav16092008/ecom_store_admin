"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your launch date here (YYYY, MM-1, DD)
  const launchDate = new Date(2024, 11, 31).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Subscribed:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <>
      <Head>
        <title>Coming Soon | Our Awesome Product</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white bg-opacity-10"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-2xl w-full">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Something Awesome Is Coming
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-lg mx-auto">
            We're working hard to bring you an amazing experience. Stay tuned
            for our launch!
          </p>

          {/* Countdown timer */}
          <div className="flex justify-center space-x-3 sm:space-x-6 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 w-20 sm:w-24 text-center border border-white border-opacity-10">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {timeLeft.days}
              </div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">DAYS</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 w-20 sm:w-24 text-center border border-white border-opacity-10">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {timeLeft.hours}
              </div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">HOURS</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 w-20 sm:w-24 text-center border border-white border-opacity-10">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {timeLeft.minutes}
              </div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">
                MINUTES
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 w-20 sm:w-24 text-center border border-white border-opacity-10">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {timeLeft.seconds}
              </div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">
                SECONDS
              </div>
            </div>
          </div>

          {/* Subscription form */}
          {!subscribed ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-5 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className="max-w-md mx-auto p-4 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-green-100">
              Thanks for subscribing! We'll notify you when we launch.
            </div>
          )}

          {/* Social links */}
          <div className="flex justify-center space-x-4 mt-12">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-gray-400 text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </>
  );
};

export default ComingSoon;
