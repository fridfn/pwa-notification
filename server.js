import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import saveSubscription from './api/saveSubscription.js';
import sendNotification from './api/sendNotification.js';
import checkEmail from './api/checkEmail.js';
import saveBroadcast from './api/saveBroadcast.js';
import saveFeedback from './api/saveFeedback.js';
import registerUser from './api/registerUser.js';
import DailyActivity from './api/DailyActivity.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://localhost:5173',
    'https://cdn-icons-png.flaticon.com',
    'https://portofolio-fridfn.vercel.app',
    'https://pwa-notification-phi.vercel.app'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  if (req.method !== "POST") {
   return res.status(405).send("Method not allowed")
  }
  
  next();
});

app.post('/api/subscription', saveSubscription);
app.post('/api/notification', sendNotification);
app.post('/api/broadcast', saveBroadcast);
app.post('/api/feedback', saveFeedback);
app.post('/api/checkemail', checkEmail);
app.post('/api/user/register', registerUser);
app.post('/api/user/activity', DailyActivity);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));