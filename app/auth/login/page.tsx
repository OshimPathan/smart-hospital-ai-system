'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db, isFirebaseAvailable } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock, Chrome, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleDemoLogin = (role: 'patient' | 'doctor' | 'admin') => {
    // Demo login without Firebase
    setUser({
      uid: `demo-${role}`,
      email: `${role}@demo.com`,
      displayName: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role: role,
      createdAt: new Date(),
    });
    toast.success(`Logged in as Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`);
    router.push(`/${role}/dashboard`);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFirebaseAvailable || !auth || !db) {
      toast.error('Firebase not configured. Use demo login below.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          displayName: userCredential.user.displayName || userData.displayName,
          role: userData.role,
          phoneNumber: userData.phoneNumber,
          photoURL: userCredential.user.photoURL || userData.photoURL,
          createdAt: userData.createdAt?.toDate() || new Date(),
        });
        
        toast.success('Login successful!');
        
        // Redirect based on role
        if (userData.role === 'doctor') {
          router.push('/doctor/dashboard');
        } else if (userData.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/patient/dashboard');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseAvailable || !auth) {
      toast.error('Firebase not configured. Use demo login below.');
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Login successful!');
      router.push('/patient/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="glass-effect rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 p-3 rounded-full mb-4">
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to access your healthcare dashboard</p>
          </div>

          {!isFirebaseAvailable && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Demo Mode</p>
                  <p className="text-xs text-yellow-700">Firebase not configured. Use demo login below.</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !isFirebaseAvailable}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={!isFirebaseAvailable}
              className="mt-4 w-full flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Demo Login Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoLogin('patient')}
                className="py-2 px-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
              >
                Patient
              </button>
              <button
                onClick={() => handleDemoLogin('doctor')}
                className="py-2 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
              >
                Doctor
              </button>
              <button
                onClick={() => handleDemoLogin('admin')}
                className="py-2 px-3 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition"
              >
                Admin
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
