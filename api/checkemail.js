import { db } from "../firebase/firebase-admin.js";
import { handleCors } from "../utils/handleCors.js"

export default async function Checkemail(req, res) {
  if (handleCors(req, res)) return;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    const { email } = req.body;
    const snapshot = await db
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value");

    if (snapshot.exists()) {
      return res.json({ available: false });
    } else {
      return res.json({ available: true });
    }
  } catch (err) {
    console.error("Firebase error:", err);
    return res.status(500).json({ error: "FAILED TO EXECUTE API" });
  }
}
