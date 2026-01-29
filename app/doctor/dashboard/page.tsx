'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { signOut } from 'firebase/auth';
import { auth, isFirebaseAvailable } from '@/lib/firebase';
import toast from 'react-hot-toast';
import {
  Users,
  Clock,
  CheckCircle,
  FileText,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Activity,
  TrendingUp,
  Video,
  Search,
} from 'lucide-react';

export default function DoctorDashboard() {
  const { user, loading, logout } = useAuthStore();
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

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

  // Mock data
  const queuePatients = [
    {
      id: '1',
      name: 'John Doe',
      token: 'TKN348',
      age: 45,
      symptoms: 'Chest pain, shortness of breath',
      status: 'waiting',
      waitTime: 5,
    },
    {
      id: '2',
      name: 'Jane Smith',
      token: 'TKN349',
      age: 32,
      symptoms: 'Regular checkup',
      status: 'waiting',
      waitTime: 20,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      token: 'TKN350',
      age: 58,
      symptoms: 'Follow-up consultation',
      status: 'waiting',
      waitTime: 35,
    },
  ];

  const stats = [
    { label: "Today's Patients", value: '15', icon: Users, color: 'bg-blue-500' },
    { label: 'In Queue', value: '8', icon: Clock, color: 'bg-orange-500' },
    { label: 'Completed', value: '7', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Avg Time/Patient', value: '12m', icon: Activity, color: 'bg-purple-500' },
  ];

  const todayAppointments = [
    { time: '10:00 AM', patient: 'Sarah Williams', type: 'New Patient', status: 'completed' },
    { time: '10:30 AM', patient: 'David Brown', type: 'Follow-up', status: 'completed' },
    { time: '11:00 AM', patient: 'John Doe', type: 'Emergency', status: 'in-progress' },
    { time: '11:30 AM', patient: 'Jane Smith', type: 'Regular', status: 'upcoming' },
    { time: '02:00 PM', patient: 'Mike Johnson', type: 'Follow-up', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="glass-effect shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold gradient-text">Doctor Dashboard</h1>
              <p className="text-xs text-gray-500">Dr. {user.displayName} • Cardiology</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Available</span>
              </div>
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
        {/* Stats */}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient Queue */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Patient Queue</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search patient..."
                      className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {queuePatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-gray-800">{patient.name}</h3>
                          <span className="bg-blue-100 px-2 py-0.5 rounded text-xs font-mono font-bold text-blue-700">
                            {patient.token}
                          </span>
                          <span className="text-sm text-gray-500">Age: {patient.age}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Symptoms:</span> {patient.symptoms}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Waiting: {patient.waitTime} mins</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                          Call Next
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition">
                          Start Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
              <div className="space-y-2">
                {todayAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-bold text-blue-600 w-20">{appointment.time}</div>
                      <div>
                        <p className="font-medium text-gray-800">{appointment.patient}</p>
                        <p className="text-xs text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : appointment.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Write Prescription</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <Video className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Start Video Call</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">View Schedule</span>
                </button>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">This Week</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Patients Treated</span>
                    <span className="font-bold">72/80</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Avg Rating</span>
                    <span className="font-bold">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-bold">8 mins</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Feedback */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Recent Feedback</h2>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Sarah W.</span>
                    <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-xs text-gray-600">"Excellent care and very thorough!"</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Mike J.</span>
                    <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-xs text-gray-600">"Very professional and caring."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
