import { db } from "../firebase/firebase-admin.js"
import { generateKey } from "../utils/generateKey.js"

export default async function DailyActivity (req, res) {
  const allowedOrigins = [
   'http://localhost:5173',
    'https://localhost:5173',
    'https://cdn-icons-png.flaticon.com',
    'https://portofolio-fridfn.vercel.app',
    'https://pwa-notification-phi.vercel.app'
  ]
  
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
   res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  
  if (req.method === "OPTIONS") {
   return res.status(200).end()
  }
  
  if (req.method !== "POST") {
   return res.status(200).send("Method not allowed")
  }
  
  const { uid, dataActivity } = req.body;
  const uniqueTimeKey = generateKey(false)
  try {
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