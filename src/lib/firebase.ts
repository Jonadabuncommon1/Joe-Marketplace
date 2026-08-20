import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

/**
 * Auth is the only Firebase product every visitor's browser needs on first
 * load (the navbar and route guards check sign-in state immediately). It is
 * kept in its own small module deliberately: Firestore and Messaging, used
 * only for visitor-log tracking and admin push notifications, live in
 * firebaseExtras.ts and are pulled in with a dynamic import so an anonymous
 * shopper never downloads either just to browse the shop.
 *
 * initializeApp() throws synchronously when the config is incomplete, and
 * since this module is imported eagerly by AppContext, an unhandled throw
 * here blanks the entire app, not just sign-in. That happens for real during
 * a Firebase project migration (env vars briefly cleared/mid-swap), so it is
 * guarded rather than left to crash: `firebaseConfigured` is false and
 * `auth` is null until real values are back, and every consumer checks the
 * flag first.
 */
export const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;

if (firebaseConfigured) {
  try {
    appInstance = initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
  } catch (err) {
    console.error('Firebase failed to initialize, sign-in will be unavailable:', err);
  }
}

export const app = appInstance;
export const auth = authInstance;
