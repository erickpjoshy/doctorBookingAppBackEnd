import express from 'express';
import cors from 'cors';
import DB from './DB/dbConnection.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import ejs from 'ejs';
dotenv.config();
const app = express();
//malewares
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(express.static('uploads'));
app.set('view engine', 'ejs');

app.use('*', (req, res) => {
  console.log('invalid link');
});
app.listen(process.env.PORT, () => {
  console.log('app is running @ http://localhost:4444/');
});
