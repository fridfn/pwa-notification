import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import Subscription from './api/subscription.js'
import Notification from './api/notification.js'
import Checkemail from './api/checkemail.js';
import Broadcast from './api/broadcast.js';
import Feedback from './api/feedback.js';
import Register from './api/user/register.js';
import Activity from './api/user/activity.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/feedback', Feedback);
app.post('/api/broadcast', Broadcast);
app.post('/api/checkemail', Checkemail);
app.post('/api/user/register', Register);
app.post('/api/user/activity', Activity);
app.post('/api/subscription', Subscription);
app.post('/api/notification', Notification);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));