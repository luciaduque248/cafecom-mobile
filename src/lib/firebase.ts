import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const rawFirebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(rawFirebaseConfig).every(Boolean);

const firebaseConfig = {
  apiKey: rawFirebaseConfig.apiKey ?? 'demo-api-key',
  authDomain: rawFirebaseConfig.authDomain ?? 'demo-cafecom.firebaseapp.com',
  projectId: rawFirebaseConfig.projectId ?? 'demo-cafecom',
  storageBucket: rawFirebaseConfig.storageBucket ?? 'demo-cafecom.firebasestorage.app',
  messagingSenderId: rawFirebaseConfig.messagingSenderId ?? '000000000000',
  appId: rawFirebaseConfig.appId ?? '1:000000000000:web:demo',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

function createAuth() {
  try {
    const appStorage = createAsyncStorage('cafecom-auth');
    return initializeAuth(app, {
      persistence: getReactNativePersistence(appStorage),
    });
  } catch {
    return getAuth(app);
  }
}

export const auth = createAuth();
export const db = getFirestore(app);
