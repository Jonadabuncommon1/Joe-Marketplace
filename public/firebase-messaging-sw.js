/* Firebase Cloud Messaging Service Worker */
/* This file MUST be named firebase-messaging-sw.js and placed in the public folder */

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAouZUjbGE8sfeU7QR8VIxNryWcdUofptU',
  authDomain: 'joetechresources-marketplace.firebaseapp.com',
  projectId: 'joetechresources-marketplace',
  storageBucket: 'joetechresources-marketplace.firebasestorage.app',
  messagingSenderId: '538161002244',
  appId: '1:538161002244:web:07e47b33c512cd6fa3c251',
});

const messaging = firebase.messaging();

// Handle background push messages (when browser tab is not open)
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || '🛍️ Joe Tech Marketplace';
  const options = {
    body: payload.notification?.body || 'A new visitor just signed in.',
    icon: '/joetech-logo.jpg',
    badge: '/favicon.png',
    vibrate: [200, 100, 200],
    tag: 'visitor-notification',
    data: {
      url: 'https://www.joetechresources.com/admin',
    },
  };

  self.registration.showNotification(title, options);
});

// When user clicks notification, open the admin panel
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://www.joetechresources.com/admin';
  event.waitUntil(clients.openWindow(url));
});
