import { db } from "../firebase/firebase-admin.js"

export default async function checkEmail(req, res) {
  const allowredOrigin = [
    'http://localhost:5173',
    'https://localhost:5173',
    'https://cdn-icons-png.flaticon.com',
    'https://portofolio-fridfn.vercel.app',
    'https://pwa-notification-phi.vercel.app'
  ]
  
  const origin = req.headers.origin
  
  if (allowredOrigin.includes(origin)) {
   res.setHeaders("Access-Control-Allow-Origin", origin)
  }
  
  res.setHeaders("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeaders("Access-Control-Allow-Headers", "Content-Type")
  
  if (req.method === "OPTIONS") {
   return res.status(200).end()
  }
  
  if (req.method !== "POST") {
   return res.status(200).send("method not allowed")
  }
  
  const { email } = req.body;
  try {
   const snapshot = await db.ref("users")
   .orderByChild("email")
   .equalTo(email)
   .once("value")
   
   if (snapshot.exists()) {
     return res.json({ available: false })
   } else {
     return res.json({ available: true })
   }
  } catch (err) {
   return res.status(500).json({
    error: "FAILED TO EXECUTE API"
   })
  }
}