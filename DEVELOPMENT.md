# Development Guide

## Project Overview
This is a comprehensive Smart Hospital AI System built with Next.js 14, TypeScript, Tailwind CSS, and Firebase.

## Development Workflow

### Starting Development
```bash
npm run dev
```
Access the application at http://localhost:3000

### Building for Production
```bash
npm run build
npm start
```

### Code Quality
```bash
npm run lint    # Check for linting errors
```

## Project Architecture

### Frontend (Next.js 14)
- **App Router**: Uses Next.js 14 app directory structure
- **Server Components**: Default for better performance
- **Client Components**: Marked with 'use client' directive

### State Management (Zustand)
- Lightweight and simple
- Located in `/store` directory
- Currently managing authentication state

### Styling (Tailwind CSS)
- Utility-first CSS framework
- Custom configurations in `tailwind.config.ts`
- Global styles in `app/globals.css`

### Backend (Firebase)
- **Authentication**: Email/Password and Google Sign-In
- **Firestore**: NoSQL database for all data
- **Storage**: File storage for images and documents

## Component Structure

### Shared Components (`/components`)
- **Navbar.tsx**: Main navigation with role-based links
- **Footer.tsx**: Footer with links and social media
- **ChatBot.tsx**: AI chatbot widget
- **Hero.tsx**: Landing page hero section
- **Features.tsx**: Features showcase
- **Departments.tsx**: Department cards
- **HowItWorks.tsx**: Process explanation

### Page Components (`/app`)
- Each route has its own directory with `page.tsx`
- Layouts can be added with `layout.tsx`
- Loading states with `loading.tsx`
- Error handling with `error.tsx`

## Data Models

### User Types
```typescript
interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'patient' | 'doctor' | 'admin';
  phoneNumber?: string;
  photoURL?: string;
  createdAt: Date;
}
```

### Appointment
```typescript
interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  tokenNumber: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  symptoms?: string;
}
```

### Health Record
```typescript
interface HealthRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  diagnosis: string;
  prescription: Prescription[];
  testResults?: TestResult[];
}
```

## Firestore Collections

### users
```
users/
  {userId}/
    - displayName: string
    - email: string
    - role: string
    - phoneNumber: string
    - createdAt: timestamp
```

### appointments
```
appointments/
  {appointmentId}/
    - patientId: string
    - patientName: string
    - doctorId: string
    - doctorName: string
    - department: string
    - date: string
    - time: string
    - tokenNumber: string
    - status: string
    - createdAt: timestamp
```

### healthRecords
```
healthRecords/
  {recordId}/
    - patientId: string
    - appointmentId: string
    - doctorId: string
    - diagnosis: string
    - prescription: array
    - testResults: array
    - createdAt: timestamp
```

### doctors
```
doctors/
  {doctorId}/
    - specialization: string
    - department: string
    - experience: number
    - consultationFee: number
    - availability: array
    - rating: number
    - status: string
```

## Adding New Features

### 1. Create a New Page
```bash
# Create directory
mkdir -p app/my-feature

# Create page file
touch app/my-feature/page.tsx
```

```typescript
'use client';

export default function MyFeaturePage() {
  return (
    <div>
      <h1>My Feature</h1>
    </div>
  );
}
```

### 2. Add to Navigation
Edit `components/Navbar.tsx` and add your link.

### 3. Create Types
Add TypeScript interfaces in `types/index.ts`.

### 4. Add Firestore Collections
Create collection in Firebase Console and add CRUD operations.

## Best Practices

### Component Organization
- One component per file
- Use descriptive names
- Keep components small and focused
- Extract reusable logic into custom hooks

### State Management
- Use Zustand for global state
- Use React hooks for local state
- Avoid prop drilling with context when needed

### Styling
- Use Tailwind utility classes
- Create custom classes in globals.css for reusable styles
- Use cn() utility for conditional classes

### TypeScript
- Always define types for props
- Use interfaces for object shapes
- Avoid 'any' type
- Enable strict mode

### Firebase
- Use async/await for all Firebase calls
- Add proper error handling
- Use transactions for critical operations
- Implement proper security rules

## Testing

### Manual Testing Checklist
- [ ] Test all authentication flows
- [ ] Verify role-based access control
- [ ] Check responsive design on different devices
- [ ] Test chatbot interactions
- [ ] Verify appointment booking flow
- [ ] Test queue management
- [ ] Check dashboard data loading
- [ ] Test emergency SOS features

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### Images
- Use Next.js Image component
- Optimize images before upload
- Use appropriate formats (WebP, AVIF)

### Code Splitting
- Lazy load heavy components
- Use dynamic imports for routes
- Split large bundles

### Caching
- Use SWR or React Query for data fetching
- Implement proper cache strategies
- Use service workers (optional)

## Security

### Authentication
- Never store sensitive data in localStorage
- Use httpOnly cookies for tokens
- Implement CSRF protection

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Appointments
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.patientId 
                    || request.auth.uid == resource.data.doctorId;
    }
    
    // Health records - read only by patient and doctor
    match /healthRecords/{recordId} {
      allow read: if request.auth.uid == resource.data.patientId 
                  || request.auth.uid == resource.data.doctorId;
      allow create, update: if request.auth.uid == resource.data.doctorId;
    }
  }
}
```

## Deployment

### Environment Variables
Make sure to set all environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Firebase Hosting: Use Firebase Functions config

### Build Optimization
```bash
# Analyze bundle size
npm run build
```

### CI/CD
Set up GitHub Actions for automatic deployment:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

## Troubleshooting

### Common Issues

1. **Firebase Auth Error**
   - Check if Firebase config is correct
   - Verify domain is authorized in Firebase Console

2. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **Styling Issues**
   - Clear Tailwind cache
   - Check for conflicting class names
   - Verify Tailwind config is correct

4. **Type Errors**
   - Run `npm run lint` to check for issues
   - Verify all imports are correct
   - Check TypeScript version compatibility

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

## Support

For help and questions:
- GitHub Issues: Create an issue on the repository
- Email: work.oshimkhan@gmail.com
- Documentation: Check SETUP.md and README.md

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
