export const saveBroadcast = async (data) => {
  const { title, message } = data;
  
  try {
   const respond = await fetch("https://pwa-notification-phi.vercel.app/api/sendNotification", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
       title,
       body: message,
       icon: "https://pwa-notification-phi.vercel.app/mailbox.png",
       badge: "https://cdn-icons-png.flaticon.com/64/545/545782.png"
      })
   })
   
   if (!respond.ok) {
    const result = await respond.text()
    console.error("❌ Server Error:", result);
    return;
   }
   
   const result = await respond.json()
   console.log("✅ Berhasil kirim:", data);
  } catch (err) {
    console.error("❌ Gagal Kirim:", err);
  }
}