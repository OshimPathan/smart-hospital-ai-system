'use client';

import {
  MessageCircle,
  Calendar,
  Clock,
  FileText,
  Video,
  Bell,
  Users,
  TrendingUp,
  Siren,
  Heart,
  Shield,
  Smartphone,
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Chatbot Assistant',
    description: 'Multi-language support via WhatsApp, SMS, and voice calls for seamless communication',
    color: 'bg-blue-500',
  },
  {
    icon: Calendar,
    title: 'Smart Appointment Booking',
    description: 'Book appointments online with auto token generation and QR code',
    color: 'bg-green-500',
  },
  {
    icon: Clock,
    title: 'Real-Time Queue Tracking',
    description: 'Track your position in queue with estimated wait time updates',
    color: 'bg-purple-500',
  },
  {
    icon: FileText,
    title: 'Digital Health Records',
    description: 'Cloud-stored medical history, prescriptions, and lab reports',
    color: 'bg-orange-500',
  },
  {
    icon: Video,
    title: 'Telemedicine Consultation',
    description: 'Secure video consultations with doctors from anywhere',
    color: 'bg-red-500',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get appointment reminders, queue updates, and medicine alerts',
    color: 'bg-yellow-500',
  },
  {
    icon: Users,
    title: 'Doctor Dashboard',
    description: 'Complete patient management with health history and analytics',
    color: 'bg-indigo-500',
  },
  {
    icon: TrendingUp,
    title: 'AI Analytics',
    description: 'Predictive insights for wait times and hospital resource management',
    color: 'bg-pink-500',
  },
  {
    icon: Siren,
    title: 'Emergency SOS',
    description: 'One-tap emergency request with GPS tracking and blood donor directory',
    color: 'bg-red-600',
  },
  {
    icon: Heart,
    title: 'IoT Integration',
    description: 'Connect wearable devices for real-time health monitoring',
    color: 'bg-rose-500',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'End-to-end encryption for all medical data and consultations',
    color: 'bg-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Multi-Platform Access',
    description: 'Web portal, mobile app, and voice interface for all users',
    color: 'bg-teal-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            Our Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Everything You Need for
            <span className="block gradient-text">Modern Healthcare</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-powered chatbots to real-time queue management, we provide comprehensive solutions for patients, doctors, and hospitals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 card-hover group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
