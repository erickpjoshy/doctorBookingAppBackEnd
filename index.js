import express from 'express';
import cors from 'cors';
import DB from './DB/dbConnection.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import ejs from 'ejs';
dotenv.config();
const app = express();

// CORS middleware setup
const allowedOrigins = ['http://localhost:5174', 'http://127.0.0.1:5174'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

//malewares
app.use(express.json());

app.use(routes);
app.use(express.static('uploads'));
app.set('view engine', 'ejs');

app.use('*', (req, res) => {
  console.log('invalid link');
});
app.get('/', (req, res) => {
  res.status(200).json('Service started');
});

app.listen(process.env.PORT || 4444, () => {
  console.log('app is running @ http://localhost:4444/');
});
