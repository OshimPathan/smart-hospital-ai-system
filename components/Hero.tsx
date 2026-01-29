'use client';

import { Calendar, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                🤖 AI-Powered Healthcare
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Smart Hospital
              <span className="block gradient-text">Queue & Token System</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Book appointments, track queues in real-time, and consult with doctors through our AI-powered chatbot assistant. Healthcare made simple and efficient.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              
              <button
                onClick={() => {
                  const chatbot = document.getElementById('chatbot-widget');
                  if (chatbot) chatbot.classList.toggle('hidden');
                }}
                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with AI Bot</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">150+</div>
                <div className="text-sm text-gray-600">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="relative animate-slide-up">
            <div className="glass-effect rounded-3xl p-8 space-y-4">
              {/* Queue Status Card */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm opacity-90">Current Queue</span>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-4xl font-bold mb-2">15</div>
                <div className="text-sm opacity-90">Estimated wait: 45 minutes</div>
              </div>

              {/* Token Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Your Token</div>
                    <div className="text-3xl font-bold text-gray-800">TKN348</div>
                  </div>
                  <div className="bg-green-100 px-4 py-2 rounded-lg">
                    <div className="text-xs text-green-600 font-semibold">CONFIRMED</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Dr. Sarah Johnson - Cardiology</div>
                <div className="text-xs text-gray-500 mt-1">Today, 2:30 PM</div>
              </div>

              {/* Live Updates */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live queue updates enabled</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-lg animate-pulse-slow">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-4 shadow-lg animate-pulse-slow" style={{ animationDelay: '1s' }}>
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
