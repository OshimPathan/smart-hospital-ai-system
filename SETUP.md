# Smart Hospital AI System - Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Firebase account
- Git

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name: "smart-hospital-ai"
4. Disable Google Analytics (optional)
5. Click "Create project"

### 3. Enable Firebase Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Enable "Google" sign-in method
5. Add your domain to authorized domains

### 4. Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Start in "Test mode" (for development)
4. Choose a location close to your users
5. Click "Enable"

### 5. Enable Firebase Storage
1. Go to "Storage"
2. Click "Get started"
3. Start in "Test mode"
4. Click "Done"

### 6. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (</>)
4. Register your app with nickname "smart-hospital-web"
5. Copy the firebaseConfig object

### 7. Create Environment File
Create `.env.local` in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_from_step_6
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Add later for AI features
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_DIALOGFLOW_PROJECT_ID=
```

### 8. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

### 9. Create Test Users

#### Patient Account:
- Email: patient@test.com
- Password: password123
- Role: patient

#### Doctor Account:
- Email: doctor@test.com
- Password: password123
- Role: doctor

#### Admin Account:
- Email: admin@test.com
- Password: password123
- Role: admin

**Note**: Register these accounts via the UI, then update their role in Firestore:
1. Go to Firestore Database
2. Find `users` collection
3. Click on the user document
4. Edit the `role` field to `doctor` or `admin`

### 10. Test Features
- ✅ Landing page
- ✅ AI Chatbot (click bottom-right button)
- ✅ User registration
- ✅ Login
- ✅ Patient dashboard
- ✅ Doctor dashboard
- ✅ Admin dashboard
- ✅ Emergency SOS page

## Troubleshooting

### Build Errors:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Firebase Errors:
- Verify all environment variables are set correctly
- Check Firebase project is created and services are enabled
- Ensure you're using the correct API keys

### Authentication Issues:
- Make sure email/password provider is enabled in Firebase
- Check that the domain is authorized in Firebase Console
- Clear browser cookies and try again

## Deployment

### Deploy to Vercel:
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Add environment variables
5. Deploy

### Deploy to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Next Steps
1. Customize colors in `tailwind.config.ts`
2. Add your hospital logo to `/public`
3. Update contact information in Footer.tsx
4. Configure Twilio for SMS notifications
5. Add OpenAI API key for advanced chatbot
6. Set up payment gateway integration
7. Add more doctors and departments in Firestore

## Support
For issues or questions:
- Email: work.oshimkhan@gmail.com
- GitHub: https://github.com/OshimPathan/smart-hospital-ai-system

Happy Coding! 🚀
