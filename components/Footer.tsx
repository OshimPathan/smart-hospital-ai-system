'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold">SmartHospital</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              AI-powered healthcare management system revolutionizing patient care with smart queue management and digital health records.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/departments" className="text-gray-400 hover:text-white transition">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-gray-400 hover:text-white transition">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-red-400 hover:text-red-300 transition">
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/appointment" className="text-gray-400 hover:text-white transition">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/telemedicine" className="text-gray-400 hover:text-white transition">
                  Telemedicine
                </Link>
              </li>
              <li>
                <Link href="/health-records" className="text-gray-400 hover:text-white transition">
                  Health Records
                </Link>
              </li>
              <li>
                <Link href="/queue-status" className="text-gray-400 hover:text-white transition">
                  Queue Status
                </Link>
              </li>
              <li>
                <Link href="/pharmacy" className="text-gray-400 hover:text-white transition">
                  Pharmacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  VIT Campus, Vellore<br />
                  Tamil Nadu, India - 632014
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <a href="tel:+911234567890" className="text-gray-400 hover:text-white transition">
                  +91 123-456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400" />
                <a href="mailto:work.oshimkhan@gmail.com" className="text-gray-400 hover:text-white transition">
                  work.oshimkhan@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 SmartHospital. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition">
                Cookie Policy
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Developed by{' '}
              <a
                href="https://github.com/OshimPathan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Oshim Pathan
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
