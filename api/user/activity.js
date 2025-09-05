import { db } from "../../firebase/firebase-admin.js"
import { generateKey } from "../../utils/generateKey.js"

export default async function Activity (req, res) {
  try {
  const { uid, dataActivity } = req.body;
  const uniqueTimeKey = generateKey(false)
    const ref = db.ref(`users/${uid}/activity/${uniqueTimeKey}`);
    
    await ref.set({
      ...dataActivity,
      createdAt: new Date().toISOString()
    });
    
    res.status(200).json({
       message: "success updates activity"
    })
   } catch (err) {
    console.error('Error updates activity:', err);
    res.status(500).json({
      error: 'Gagal menyimpan'
    });
  }
}