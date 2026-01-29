import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function generateToken(): string {
  const prefix = 'TKN';
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${random}`;
}

export function calculateWaitTime(queuePosition: number, avgConsultationTime: number = 15): number {
  return queuePosition * avgConsultationTime;
}
