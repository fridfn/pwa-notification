import webpush from 'web-push';
import { db } from '../firebase/firebase-admin.js';

const vapidKeys = {
  publicKey: 'BG36Zp6Qg1pM7czK5qVSBOmccF87woXofKRBhI9gPM3C0rMPwlrpvaCLcovgmAGmxJXXKwEpCKWAC9IlDZQXnRg',
  privateKey: 'U2PpAUhPIU0mAd3zQJJxVi5nV6WPxbZWQuVNGRbxk38'
};

webpush.setVapidDetails(
  'mailto:kamu@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default async function sendNotification(req, res) {
  try {
    const snapshot = await db.ref('subscriptions').once('value');
    const subs = snapshot.val();

    const tasks = Object.values(subs || {}).map(sub =>
      webpush.sendNotification(sub, 'Notif spesial dari project kamu! 😚')
    );

    await Promise.all(tasks);
    res.status(200).json({ message: 'Notifikasi terkirim ke semua subscriber!' });
  } catch (err) {
    console.error('Error kirim notif:', err);
    res.status(500).json({ error: 'Gagal kirim notifikasi' });
  }
}
