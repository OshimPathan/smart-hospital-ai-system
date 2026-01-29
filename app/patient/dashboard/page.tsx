'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { signOut } from 'firebase/auth';
import { auth, isFirebaseAvailable } from '@/lib/firebase';
import toast from 'react-hot-toast';
import {
  Calendar,
  Clock,
  FileText,
  Video,
  Heart,
  Bell,
  Settings,
  LogOut,
  Plus,
  QrCode,
  Activity,
  Pill,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export default function PatientDashboard() {
  const { user, loading, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      if (isFirebaseAvailable && auth) {
        await signOut(auth);
      }
      logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  // Mock data - In production, fetch from Firestore
  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      date: '2026-01-30',
      time: '10:00 AM',
      token: 'TKN348',
      status: 'confirmed',
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      department: 'General Medicine',
      date: '2026-02-05',
      time: '2:30 PM',
      token: 'TKN451',
      status: 'pending',
    },
  ];

  const healthRecords = [
    {
      id: '1',
      date: '2026-01-15',
      doctor: 'Dr. Emily Brown',
      diagnosis: 'Regular Checkup',
      prescription: 'Vitamin D3, Calcium supplements',
    },
    {
      id: '2',
      date: '2026-01-10',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Blood Pressure Monitoring',
      prescription: 'Amlodipine 5mg',
    },
  ];

  const stats = [
    { label: 'Appointments', value: '8', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Consultations', value: '12', icon: Video, color: 'bg-green-500' },
    { label: 'Health Records', value: '24', icon: FileText, color: 'bg-purple-500' },
    { label: 'Prescriptions', value: '15', icon: Pill, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="glass-effect shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Patient Dashboard</h1>
                <p className="text-xs text-gray-500">Welcome back, {user.displayName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-effect rounded-xl p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Appointments & Queue */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <Plus className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Book Appointment</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <QrCode className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium text-green-600">My Tokens</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <Video className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">Telemedicine</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">Health Records</span>
                </button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Upcoming Appointments</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-800">{appointment.doctor}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{appointment.department}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-blue-100 px-3 py-1 rounded-lg mb-2">
                          <span className="text-xs font-mono font-bold text-blue-700">
                            {appointment.token}
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                          View QR
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Records */}
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Health Records</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {healthRecords.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <h3 className="font-semibold text-gray-800">{record.diagnosis}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Dr. {record.doctor}</p>
                        <p className="text-xs text-gray-500">{record.date}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Download
                      </button>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Prescription:</span> {record.prescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Health Stats */}
          <div className="space-y-6">
            {/* Current Queue Status */}
            <div className="glass-effect rounded-xl p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <h2 className="text-lg font-bold mb-4">Current Queue Status</h2>
              <div className="text-center py-4">
                <div className="text-5xl font-bold mb-2">7</div>
                <p className="text-sm opacity-90">People ahead of you</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Estimated wait: 35 mins</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition mt-4">
                Track Live
              </button>
            </div>

            {/* Health Vitals */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Health Vitals</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Heart Rate</span>
                    <span className="text-sm font-bold text-green-600">Normal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-2xl font-bold">72 BPM</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Blood Pressure</span>
                    <span className="text-sm font-bold text-green-600">Normal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-2xl font-bold">120/80</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Oxygen Level</span>
                    <span className="text-sm font-bold text-green-600">Normal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-2xl font-bold">98%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medication Reminders */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Medication Reminders</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Pill className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Amlodipine 5mg</p>
                    <p className="text-xs text-gray-600">After breakfast</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Pill className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Vitamin D3</p>
                    <p className="text-xs text-gray-600">Before dinner - Pending</p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Emergency Button */}
            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition shadow-lg">
              🚨 Emergency SOS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
