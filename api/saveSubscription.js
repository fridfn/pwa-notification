import { db } from '../firebase/firebase-admin.js';

export default async function saveSubscription(req, res) {
  try {
    const subscription = req.body;
    const ref = db.ref('subscriptions');
    await ref.push(subscription);
    res.status(200).json({ message: 'Subscription berhasil disimpan!' });
  } catch (err) {
    console.error('Error simpan subscription:', err);
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
}
