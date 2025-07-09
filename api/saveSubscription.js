import { db } from '../firebase/firebase-admin.js';

export default async function saveSubscription(req, res) {
  // Tambah CORS header di awal
  res.setHeader('Access-Control-Allow-Origin', 'https://portofolio-fridfn.vercel.app');
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
