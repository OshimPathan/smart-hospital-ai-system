# 🏥 Smart Hospital Queue & Token System  
### with Patient Health Log and AI Chatbot Assistant 🤖  

---

## 📘 Overview

The **Smart Hospital Queue & Token System** is an advanced, AI-powered healthcare management platform that digitalizes hospital workflows and enhances patient experience through **automation, cloud integration, and real-time communication**.

It enables patients to:
- 📅 Book doctor appointments online  
- 🎫 Receive digital tokens for consultation  
- ⏱️ Track live queue status in real time  
- 📚 Maintain a personal health record  
- 💬 Interact with an **AI Chatbot Assistant** via WhatsApp, SMS, or phone calls  

This project combines **AI + Web + IoT + Cloud** to build a unified smart hospital ecosystem — ensuring faster service, reduced waiting time, and seamless communication between patients and hospitals.

---

## ✨ Key Features

### 🤖 AI Chatbot & Voice Assistant
- Multi-channel chatbot via **WhatsApp / SMS / Voice calls**  
- Understands natural human language using **Dialogflow / Gemini / OpenAI API**  
- Multi-language support (English, Hindi, Nepali, Tamil)  
- Symptom-based department & doctor suggestions  
- Voice input/output for non-tech or elderly users  

💬 **Example Conversation:**
👤 Patient: "I want to see a cardiologist."
🤖 Bot: "Dr. Meena (Cardiology) is available from 10 AM to 2 PM. Would you like to book an appointment?"

yaml
Copy code

---

### 🏥 Hospital Information & Services
- View hospital details: address, contact, map, and hours  
- Browse departments, doctors, and consultation charges  
- Explore treatments, facilities, and health packages  
- Doctor profiles with experience, specialization, and feedback  
- Virtual hospital tour (optional 3D integration)  

---

### 📅 Smart Appointment & Queue Management
- Online appointment booking system  
- Auto token generation with QR code  
- Real-time queue and estimated wait time  
- Push/SMS notifications for next turn  
- AI-based queue optimization (priority/emergency patients)  

---

### 🩺 Patient Health Log & Digital Prescription
- Cloud-stored health records and reports  
- Doctor updates diagnosis and prescription  
- Download digital reports (PDF format)  
- AI-generated health summaries and trends  
- Medicine reminders and re-visit notifications  

---

### 💻 Telemedicine & Virtual Consultation
- Secure **video or chat consultations**  
- Upload medical reports for review  
- Online payment gateway for appointments  
- Google Calendar integration for reminders  
- Doctor-Patient chatroom (private and secure)  

---

### 🔔 Smart Notifications
- Real-time queue updates  
- Appointment reminders via push/SMS/email  
- Medicine and follow-up alerts  
- Weekly health progress report to patients  

---

### 🧑‍⚕️ Doctor Dashboard
- Manage patient queue and appointment list  
- Access complete patient health history  
- Add new diagnosis and digital prescriptions  
- Toggle availability (Online / Busy / On Leave)  
- AI analytics of patient progress and trends  

---

### 🧑‍💼 Admin Dashboard
- Manage doctors, patients, and departments  
- Monitor queues and appointment flow  
- Generate analytics reports (daily/weekly)  
- Chatbot query analytics (common user questions)  
- Role-based access for Admin, Doctor, Receptionist  

---

### 🚑 Emergency & SOS Module
- One-tap emergency request (calls ambulance)  
- Blood donor directory and nearest availability  
- GPS tracking for ambulance/hospital location  
- Critical patients auto-prioritized in queue  

---

### 🌡️ IoT & Wearable Integration (Advanced)
- Connect IoT devices or smartwatches (Heart rate, BP, SpO₂)  
- Real-time health data streaming  
- Auto health alerts for abnormal readings  

---

### 📊 AI & Data Analytics
- Predicts hospital crowd and waiting times  
- Tracks patient visit frequency and recovery patterns  
- Generates insights on busiest departments  
- Predictive analytics for hospital resource management  

---

### 🌐 Accessibility & Multi-Platform Support
- Web portal for doctors and admin staff  
- Mobile app for patients  
- Voice interface for calls and non-smartphone users  
- Accessible design for visually impaired users  

---

## 🧠 System Architecture

Patient → WhatsApp / App / Web / Voice Call
↓
AI Chatbot (Dialogflow / Gemini / Twilio)
↓
Smart Hospital Backend (Node.js / Express)
↓
Database (Firebase / Supabase)
↓
Doctor / Admin Dashboards & Health Logs

yaml
Copy code

---

## ⚙️ Tech Stack

| Component | Technology |
|------------|-------------|
| Frontend | React.js / Flutter |
| Backend | Node.js / Express.js |
| Database | Firebase Firestore / Supabase |
| Authentication | Firebase Auth |
| Chatbot AI | Dialogflow / Gemini / OpenAI API |
| Messaging | Twilio WhatsApp / SMS / Voice |
| Notifications | Firebase Cloud Messaging |
| Telemedicine | WebRTC / Zoom API |
| Hosting | Firebase Hosting / Vercel |
| Optional | Python Flask (AI Wait-Time Predictor) |

---

## 🪜 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/smart-hospital-ai-system.git
cd smart-hospital-ai-system
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Setup Environment Variables
Create a .env.local file and add your Firebase + Twilio credentials:

ini
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
4️⃣ Run the Application
bash
Copy code
npm start
5️⃣ Open in Browser
arduino
Copy code
http://localhost:3000
🧩 Project Workflow
1️⃣ Patient logs in or interacts with chatbot
2️⃣ Bot interprets user query (doctor info, booking, etc.)
3️⃣ System processes and generates digital token
4️⃣ Queue updates dynamically in real-time
5️⃣ Doctor views queue, consults, and updates health log
6️⃣ System sends prescription/report to patient

📸 Screenshots (Add after UI ready)
/screenshots/hospital-home.png

/screenshots/chatbot.png

/screenshots/queue-dashboard.png

/screenshots/doctor-dashboard.png

👨‍💻 Developed By
Oshim Pathan
🎓 Vellore Institute of Technology, India
💻 Full Stack Developer (React.js + Firebase + Node.js)
📧 work.oshimkhan@gmail.com
🔗 LinkedIn | GitHub

🔮 Future Enhancements
AI chatbot learns and adapts to patient behavior

Insurance & billing integration

Blockchain-based health data storage

Multi-branch hospital management

Predictive triage for emergency prioritization

Regional language voice assistant

🏁 Conclusion
The Smart Hospital Queue & Token System with AI Chatbot Assistant redefines modern healthcare management by combining AI, Cloud, and Automation to build a seamless hospital experience.
From booking appointments to tracking queues, and from consultations to digital prescriptions — everything is handled smartly, efficiently, and transparently.

💡 “From Appointment to Recovery — All Managed Smartly with AI.”
