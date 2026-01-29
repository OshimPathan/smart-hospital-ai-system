'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, UserCircle, LogIn } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold gradient-text">SmartHospital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="#departments" className="text-gray-700 hover:text-blue-600 transition">
              Departments
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">
              How It Works
            </Link>
            <Link href="/emergency" className="text-red-600 hover:text-red-700 font-semibold transition">
              🚨 Emergency
            </Link>
            
            {user ? (
              <Link
                href={`/${user.role}/dashboard`}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <UserCircle className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="#features"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#departments"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Departments
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/emergency"
              className="block px-3 py-2 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition"
              onClick={() => setIsOpen(false)}
            >
              🚨 Emergency
            </Link>
            {user ? (
              <Link
                href={`/${user.role}/dashboard`}
                className="block px-3 py-2 rounded-lg bg-blue-600 text-white text-center"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-lg bg-blue-600 text-white text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
