import { getFirestore, type Firestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';
import { app, firebaseConfigured } from './firebase';

/**
 * Firestore (visitor logs) and Messaging (push notifications) are only ever
 * needed after a customer signs in or an admin opens the dashboard, never on
 * the first paint of the shop. This module is loaded with a dynamic import
 * from visitorTracking.ts, so its ~150KB stays out of every anonymous
 * visitor's initial bundle.
 */
export const db: Firestore | null = firebaseConfigured && app ? getFirestore(app) : null;

export const getFirebaseMessaging = async () => {
  if (!firebaseConfigured || !app) return null;
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(app);
};
