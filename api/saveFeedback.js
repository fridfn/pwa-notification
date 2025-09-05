import { db } from "../firebase/firebase-admin.js"
import { generateKey } from "../utils/generateKey.js"

export default async function saveFeedback (req, res) {
  try {
    const feedback = req.body;
    const uniqueName = feedback.name
    const uniqueTimeKey = generateKey(true)
    const ref = db.ref(`feedback/${uniqueName}/${uniqueTimeKey}`)
    await ref.set(feedback);
    res.status(200).json({ message: "success save feedback" })
   } catch (err) {
    console.error('Error save feedback:', err);
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
}