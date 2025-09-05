import { db } from '../firebase/firebase-admin.js';
import { generateKey } from "../utils/generateKey.js";

export default async function saveBroadcast(req, res) {
  try {
  const broadcast = req.body;
  const key = generateKey(true)
    const ref = db.ref(`broadcast/${key}`);
    await ref.set(broadcast);
    res.status(200).json({ message: 'broadcast berhasil disimpan!' });
  } catch (err) {
    console.error('Error simpan broadcast:', err);
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
}