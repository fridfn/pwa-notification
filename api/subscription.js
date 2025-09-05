import { db } from '../firebase/firebase-admin.js';

export default async function Subscription(req, res) {
  try {
    const subscription = req.body;
    const ref = db.ref('subscriptions');
    await ref.push({ 
     subscription,
     subscribeAt: new Date().toISOString()
    });
    
    res.status(200).json({ message: 'Subscription berhasil disimpan!' });
  } catch (err) {
    console.error('Error simpan subscription:', err);
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
}
