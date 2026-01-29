'use client';

import { Heart, Brain, Bone, Eye, Baby, Stethoscope, Activity, Pill } from 'lucide-react';

const departments = [
  {
    icon: Heart,
    name: 'Cardiology',
    description: 'Heart and cardiovascular care',
    doctors: 15,
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Brain,
    name: 'Neurology',
    description: 'Brain and nervous system',
    doctors: 12,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Bone,
    name: 'Orthopedics',
    description: 'Bone and joint treatment',
    doctors: 18,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    name: 'Ophthalmology',
    description: 'Eye care and vision',
    doctors: 10,
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Baby,
    name: 'Pediatrics',
    description: 'Children\'s healthcare',
    doctors: 14,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Stethoscope,
    name: 'General Medicine',
    description: 'Primary healthcare',
    doctors: 20,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Activity,
    name: 'Emergency',
    description: '24/7 emergency care',
    doctors: 25,
    color: 'from-red-600 to-red-700',
  },
  {
    icon: Pill,
    name: 'Pharmacy',
    description: 'Medicines and prescriptions',
    doctors: 8,
    color: 'from-teal-500 to-green-500',
  },
];

export default function Departments() {
  return (
    <section id="departments" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            Our Departments
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Comprehensive Healthcare
            <span className="block gradient-text">Across Specialties</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert care across multiple departments with experienced doctors and state-of-the-art facilities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer card-hover"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-90 group-hover:opacity-100 transition`}></div>
                
                <div className="relative p-8 text-white">
                  <Icon className="w-12 h-12 mb-4 group-hover:scale-110 transition" />
                  <h3 className="text-2xl font-bold mb-2">{dept.name}</h3>
                  <p className="text-white/90 mb-4">{dept.description}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Stethoscope className="w-4 h-4" />
                    <span>{dept.doctors} Doctors</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition origin-left"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            View All Departments
          </button>
        </div>
      </div>
    </section>
  );
}
