import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Baca file JSON secara manual
const raw = fs.readFileSync(path.join(__dirname, '../firebase-credentials.json'), 'utf8');
const serviceAccount = JSON.parse(raw);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fridfn-pwa-notif-default-rtdb.asia-southeast1.firebasedatabase.app'
  });
}

export const db = admin.database();
