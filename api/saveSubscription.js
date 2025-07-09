import { db } from '../firebase/firebase-admin.js';

export default async function saveSubscription(req, res) {
  // Tambah CORS header di awal
    const allowedOrigins = [
    'http://localhost:5173',
    'https://localhost:5173',
    'https://cdn-icons-png.flaticon.com',
    'https://portofolio-fridfn.vercel.app',
    'https://pwa-notification-phi.vercel.app'
    ]; 
  
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Biar Vercel gak error waktu preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const subscription = req.body;
  try {
    const ref = db.ref('subscriptions');
    await ref.push(subscription);
    res.status(200).json({ message: 'Subscription berhasil disimpan!' });
  } catch (err) {
    console.error('Error simpan subscription:', err);
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
}
