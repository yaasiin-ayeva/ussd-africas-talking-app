import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { UssdRouter } from './routes/ussd.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/ussd', UssdRouter);

app.get('/', (req, res) => {
  res.send('USSD Application with Africa\'s Talking is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});