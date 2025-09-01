import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

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

app.post('/api/saveSubscription', saveSubscription);
app.post('/api/sendNotification', sendNotification);
app.post('/api/saveBroadcast', saveBroadcast);
app.post('/api/saveFeedback', saveFeedback);
app.post('/api/checkemail', checkEmail);
app.post('/api/user/register', registerUser);
app.post('/api/user/activity', DailyActivity);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));