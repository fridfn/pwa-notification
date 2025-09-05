import { db } from '../firebase/firebase-admin.js'

export default async function Register(req,res) {
   try {
   const user = req.body
   const { uid, email, createdAt, lastLoginAt } = user;
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