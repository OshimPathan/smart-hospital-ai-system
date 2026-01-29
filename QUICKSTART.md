# ⚡ Quick Start - 5 Minutes to Running App

## Prerequisites Check
- ✅ Node.js 18+ installed? Run: `node --version`
- ✅ npm installed? Run: `npm --version`
- ✅ Git installed? Run: `git --version`

## Step 1: Install (2 minutes)
```bash
cd /Users/oseempathan/Developer/smart-hospital-ai-system
npm install
```

## Step 2: Firebase Setup (3 minutes)

### Quick Firebase Setup:
1. Go to: https://console.firebase.google.com/
2. Click "Add project" → Enter "smart-hospital-ai" → Create
3. Click "Authentication" → "Get started" → Enable "Email/Password" & "Google"
4. Click "Firestore Database" → "Create database" → "Test mode" → Enable
5. Click "Storage" → "Get started" → "Test mode" → Done
6. Click ⚙️ (Settings) → "Project settings" → Scroll to "Your apps" → Click Web icon `</>`
7. Copy the `firebaseConfig` object

### Configure App:
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and paste your Firebase config
# (Use any text editor)
```

Your `.env.local` should look like:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=smart-hospital-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=smart-hospital-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=smart-hospital-ai.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:...
```

## Step 3: Run! (30 seconds)
```bash
npm run dev
```

**🎉 Done! Visit: http://localhost:3000**

## What You'll See

### 1. Landing Page
- Beautiful hero section
- AI Chatbot (click bottom-right 💬 button)
- Features showcase
- Department cards

### 2. Try the Chatbot
- Click the chatbot icon (bottom-right)
- Type: "I want to book an appointment"
- Try voice input (microphone button)
- Change language (globe icon)

### 3. Create Account
- Click "Login" → "Sign up"
- Enter: name, email, password
- Choose role: Patient/Doctor
- Register!

### 4. Explore Dashboards

**Patient Dashboard** (`/patient/dashboard`)
- View appointments
- Track queue status
- Health records
- Emergency SOS

**Doctor Dashboard** (`/doctor/dashboard`)
- Patient queue
- Today's schedule
- Performance stats

**Admin Dashboard** (`/admin/dashboard`)
- Hospital analytics
- Department management
- System monitoring

*Note: After registering, update user role in Firebase Console → Firestore → users → {userId} → Edit "role" field*

### 5. Emergency Page
Visit: http://localhost:3000/emergency
- Emergency call
- Request ambulance
- Blood donor search
- Nearby hospitals

## Test Accounts (After Setup)

Create these via UI, then update role in Firestore:

**Patient**
- Email: patient@test.com
- Password: test123456
- Role: patient

**Doctor**
- Email: doctor@test.com
- Password: test123456
- Role: doctor (update in Firestore)

**Admin**
- Email: admin@test.com
- Password: test123456
- Role: admin (update in Firestore)

## Common Issues & Fixes

### "Firebase not defined"
→ Check `.env.local` exists and has correct values

### "Module not found"
→ Run: `rm -rf node_modules && npm install`

### "Port 3000 in use"
→ Run: `lsof -ti:3000 | xargs kill` or use `npm run dev -- -p 3001`

### Build errors
→ Run: `rm -rf .next && npm run dev`

## Mobile Testing

### On Same Network:
1. Find your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. Visit on phone: `http://YOUR_IP:3000`

## Features to Try

✅ **Landing Page**: Smooth animations, responsive design  
✅ **Chatbot**: Multi-language, voice input, smart responses  
✅ **Auth**: Register, login, Google Sign-In  
✅ **Dashboards**: Patient, doctor, admin views  
✅ **Queue**: Real-time tracking, token system  
✅ **Emergency**: SOS, ambulance, blood donors  
✅ **Responsive**: Try on mobile/tablet/desktop  

## Next Steps

1. ✅ Test all features
2. ✅ Customize colors in `tailwind.config.ts`
3. ✅ Add your logo to `/public`
4. ✅ Update hospital info in Footer
5. ✅ Add real doctor data to Firestore
6. ✅ Deploy to Vercel/Firebase

## Production Deployment

### Vercel (Easiest):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📚 Full Documentation

- **Complete Guide**: README.md
- **Detailed Setup**: SETUP.md
- **Development**: DEVELOPMENT.md
- **Project Overview**: PROJECT_COMPLETE.md

## 💬 Need Help?

- 📧 Email: work.oshimkhan@gmail.com
- 📝 Check: SETUP.md for detailed instructions
- 🐛 Issues? Check DEVELOPMENT.md troubleshooting

---

**Ready to revolutionize healthcare! 🏥 ✨**

Run `npm run dev` and enjoy your Smart Hospital AI System!
