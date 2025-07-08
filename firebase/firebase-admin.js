import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fridfn-pwa-notif-default-rtdb.asia-southeast1.firebasedatabase.app'
  });
}

export const db = admin.database();
