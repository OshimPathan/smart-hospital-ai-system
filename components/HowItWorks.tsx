'use client';

import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Register or Login',
    description: 'Create your account or login via web, mobile app, or chat with our AI bot',
  },
  {
    number: '02',
    title: 'Choose Department & Doctor',
    description: 'Browse specialties, view doctor profiles, and select your preferred time slot',
  },
  {
    number: '03',
    title: 'Get Digital Token',
    description: 'Receive instant confirmation with QR code token and appointment details',
  },
  {
    number: '04',
    title: 'Track Queue Real-Time',
    description: 'Monitor your position in queue with live updates and wait time estimates',
  },
  {
    number: '05',
    title: 'Consultation & Prescription',
    description: 'Doctor reviews your case, provides diagnosis, and uploads digital prescription',
  },
  {
    number: '06',
    title: 'Follow-Up & Records',
    description: 'Access health records anytime, get medicine reminders, and schedule follow-ups',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Your Healthcare Journey
            <span className="block gradient-text">Made Simple</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From booking to recovery, follow these simple steps for a seamless healthcare experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-effect rounded-2xl p-8 h-full card-hover">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-2xl w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-effect rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Why Choose Our System?
              </h3>
              <div className="space-y-4">
                {[
                  'No more long waiting in hospital queues',
                  '24/7 AI chatbot assistance in multiple languages',
                  'Secure digital health records accessible anytime',
                  'Real-time notifications and reminders',
                  'Telemedicine consultations from home',
                  'Emergency SOS with GPS tracking',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-xl mb-6">Digital & Paperless</div>
              <div className="space-y-3 text-white/90">
                <p>✓ Eco-friendly healthcare management</p>
                <p>✓ Instant access to all records</p>
                <p>✓ No paperwork hassle</p>
                <p>✓ Cloud-based secure storage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
