import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import saveSubscription from './api/saveSubscription.js';
import sendNotification from './api/sendNotification.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/saveSubscription', saveSubscription);
app.post('/api/sendNotification', sendNotification);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
