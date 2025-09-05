import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import Subscription from './api/subscription'
import Notification from './api/notification'
import Checkemail from './api/checkemail.js';
import Broadcast from './api/broadcast.js';
import Feedback from './api/feedback.js';
import Register from './api/register.js';
import Activity from './api/activity.js';

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

app.post('/api/feedback', Feedback);
app.post('/api/broadcast', Broadcast);
app.post('/api/checkemail', Checkemail);
app.post('/api/user/register', Register);
app.post('/api/user/activity', Activity);
app.post('/api/subscription', Subscription);
app.post('/api/notification', Notification);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));