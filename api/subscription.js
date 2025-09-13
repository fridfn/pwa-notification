import { db } from '../firebase/firebase-admin.js';

export default async function Subscription(req, res) {
  try {
    const subscription = req.body;
    
    if (!subscription) {
      return res.status(400).json({ error: 'Subscription kosong' });
    }
    
    const ref = db.ref('subscriptions');
    await ref.push({
     subscription,
     subscribeAt: new Date().toISOString()
    });
    
    res.status(200).json({
      subscription,
      message: 'Subscription berhasil disimpan!'
    });
  } catch (err) {
    console.error('Error simpan subscription:', err);
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
}