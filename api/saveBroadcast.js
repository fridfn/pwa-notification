import { db } from '../firebase/firebase-admin';
import { generateKey } from "../utils/generateKey";

export default async function saveBroadcast(req, res) {
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
  
  const broadcast = req.body;
  try {
    const ref = db.ref(`broadcast/${generateKey(true)}`);
    await ref.push(broadcast);
    res.status(200).json({ message: 'broadcast berhasil disimpan!' });
  } catch (err) {
    console.error('Error simpan broadcast:', err);
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
}