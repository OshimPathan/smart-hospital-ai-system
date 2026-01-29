'use client';

import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, isFirebaseAvailable } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { doc, getDoc } from 'firebase/firestore';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // If Firebase is not configured, just set loading to false
    if (!isFirebaseAvailable || !auth) {
      console.warn('Firebase is not configured. Running in demo mode.');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && db) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || userData.displayName || '',
              role: userData.role || 'patient',
              phoneNumber: firebaseUser.phoneNumber || userData.phoneNumber,
              photoURL: firebaseUser.photoURL || userData.photoURL,
              createdAt: userData.createdAt?.toDate() || new Date(),
            });
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}
