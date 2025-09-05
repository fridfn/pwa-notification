import webpush from 'web-push';
import { db } from '../firebase/firebase-admin.js';

const vapidKeys = {
  publicKey: 'BG36Zp6Qg1pM7czK5qVSBOmccF87woXofKRBhI9gPM3C0rMPwlrpvaCLcovgmAGmxJXXKwEpCKWAC9IlDZQXnRg',
  privateKey: 'U2PpAUhPIU0mAd3zQJJxVi5nV6WPxbZWQuVNGRbxk38'
};

webpush.setVapidDetails(
  'mailto:faridfathonin@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default async function Notification(req, res) {
  try {
    const { title, body, icon, badge } = req.body
    const snapshot = await db.ref('subscriptions').once('value');
    const subs = snapshot.val();
    
    if (!subs) {
      return res.status(404).json({ error: 'Tidak ada subscription ditemukan.' });
    }
    
    const payload = JSON.stringify({
      title: title || 'Notifikasi Baru!',
      body: body || 'Ini pesan default dari server mu 😚',
      icon: icon || "https://pwa-notification-phi.vercel.app/mailbox.png",
      badge: badge || "https://cdn-icons-png.flaticon.com/64/545/545782.png"
    });

    const results = await Promise.allSettled(
      Object.values(subs).map(sub =>
        webpush.sendNotification(sub, payload)
      )
    );

    const success = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    res.status(200).json({
      message: 'Push Notification selesai dikirim.',
      success,
      failed,
      datas: req.body
    });
  } catch (err) {
    console.error('❌ Gagal total kirim notif:', err);
    res.status(500).json({ error: 'Server error saat kirim notifikasi' });
  }
}
