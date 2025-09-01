import { db } from '../firebase/firebase-admin.js'

export default async function registerUser (req,res) {
   const allowredOrigin = [
    'http://localhost:5173',
    'https://localhost:5173',
    'https://cdn-icons-png.flaticon.com',
    'https://portofolio-fridfn.vercel.app',
    'https://pwa-notification-phi.vercel.app'
   ]
   
   const origin = req.headers.origin;
   
   if (allowredOrigin.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
   }
   
   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
   res.setHeader("Access-Control-Allow-Headers", "Content-Type")
   
   if (req.method === "OPTIONS") {
    return res.status(200).end()
   }
   
   if (req.method !== "POST") {
    return res.status(200).send("method not allowed")
   }
   
   const user = req.body
   const { uid, email, createdAt, lastLoginAt } = user;
   try {
     const ref = db.ref(`users/${uid}`)
     await ref.set({
       profile: {
         fullname: "-",
         nickname: "-",
         dob: "-",
         bio: "-",
         createAt: "-",
         role: "-",
         phone: "-"
       },
       account: {
         email: email,
         createAt: createdAt,
         lastLoginAt: lastLoginAt
       }
     })
     
    res.status(200).json({ message: "success register user" })
   } catch (err) {
    res.status(500).json({ error: "GAGAL menyimpan "})
   }
}