export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'patient' | 'doctor' | 'admin';
  phoneNumber?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  experience: number;
  qualification: string;
  department: string;
  consultationFee: number;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  rating?: number;
  status: 'available' | 'busy' | 'on-leave';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  tokenNumber: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  queuePosition?: number;
  symptoms?: string;
  type: 'regular' | 'emergency' | 'telemedicine';
  createdAt: Date;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  diagnosis: string;
  prescription: {
    medicine: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
  testResults?: {
    name: string;
    value: string;
    unit: string;
    normalRange: string;
  }[];
  notes?: string;
  nextVisit?: Date;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  doctors: string[];
}

export interface QueueEntry {
  id: string;
  appointmentId: string;
  tokenNumber: string;
  patientName: string;
  doctorId: string;
  status: 'waiting' | 'in-consultation' | 'completed';
  estimatedWaitTime: number;
  position: number;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: Date;
  intent?: string;
  language?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'queue' | 'prescription' | 'reminder' | 'emergency';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}
