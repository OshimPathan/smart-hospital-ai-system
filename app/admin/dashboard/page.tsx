'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { signOut } from 'firebase/auth';
import { auth, isFirebaseAvailable } from '@/lib/firebase';
import toast from 'react-hot-toast';
import {
  Users,
  UserPlus,
  Calendar,
  TrendingUp,
  DollarSign,
  Activity,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuthStore();
  const router = useRouter();

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

  const stats = [
    { label: 'Total Patients', value: '2,453', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Doctors', value: '150', change: '+5%', icon: UserPlus, color: 'bg-green-500' },
    { label: "Today's Appointments", value: '245', change: '+8%', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Revenue (Monthly)', value: '₹8.5L', change: '+15%', icon: DollarSign, color: 'bg-orange-500' },
  ];

  const departments = [
    { name: 'Cardiology', patients: 45, doctors: 15, revenue: '₹2.1L' },
    { name: 'Neurology', patients: 38, doctors: 12, revenue: '₹1.8L' },
    { name: 'Orthopedics', patients: 52, doctors: 18, revenue: '₹2.4L' },
    { name: 'General Medicine', patients: 67, doctors: 20, revenue: '₹1.9L' },
    { name: 'Pediatrics', patients: 43, doctors: 14, revenue: '₹1.3L' },
  ];

  const recentActivities = [
    { type: 'new_patient', user: 'John Doe', action: 'registered as new patient', time: '5 mins ago' },
    { type: 'appointment', user: 'Dr. Sarah Johnson', action: 'completed consultation', time: '12 mins ago' },
    { type: 'emergency', user: 'Emergency Dept', action: 'handled critical patient', time: '25 mins ago' },
    { type: 'payment', user: 'Jane Smith', action: 'paid consultation fee', time: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="glass-effect shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold gradient-text">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Hospital Management System</p>
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
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Department Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Department Performance</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patients</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doctors</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-medium">{dept.name}</td>
                        <td className="py-3 px-4">{dept.patients}</td>
                        <td className="py-3 px-4">{dept.doctors}</td>
                        <td className="py-3 px-4 font-semibold text-green-600">{dept.revenue}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Analytics Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Patient Growth</h3>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-2">+24%</div>
                  <p className="text-sm text-blue-100">vs last month</p>
                  <div className="mt-4 h-16 bg-white/20 rounded-lg flex items-end justify-around p-2">
                    {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                      <div key={i} className="w-2 bg-white rounded-full" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Revenue Growth</h3>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-2">+18%</div>
                  <p className="text-sm text-green-100">vs last month</p>
                  <div className="mt-4 h-16 bg-white/20 rounded-lg flex items-end justify-around p-2">
                    {[50, 55, 60, 58, 70, 75, 80].map((height, i) => (
                      <div key={i} className="w-2 bg-white rounded-full" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </div>
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
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Add New Doctor</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Manage Patients</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">View Schedule</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">Generate Reports</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'emergency' ? 'bg-red-500' :
                      activity.type === 'payment' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">System Health</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Server Status</span>
                    <span className="text-green-600 font-medium">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Database</span>
                    <span className="text-green-600 font-medium">Optimal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">API Response</span>
                    <span className="text-yellow-600 font-medium">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
