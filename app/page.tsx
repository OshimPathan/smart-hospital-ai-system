'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Departments from '@/components/Departments';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'doctor') {
        router.push('/doctor/dashboard');
      } else if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user.role === 'patient') {
        router.push('/patient/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Departments />
      <HowItWorks />
      <Footer />
      <ChatBot />
    </main>
  );
}
