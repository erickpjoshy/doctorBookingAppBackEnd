import express from 'express';
import cors from 'cors';
import DB from './DB/dbConnection.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import ejs from 'ejs';
dotenv.config();

const app = express();

// CORS middleware setup
const allowedOrigins = [
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'https://doctorbookingapp.erickpjoshy.cloud',
];

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
app.options('*', cors(corsOptions));
app.get('/', (req, res) => {
  res.status(200).json('Service started');
});

// middlewares
app.use(express.json());

app.use(routes);
app.use(express.static('uploads'));
app.set('view engine', 'ejs');

// Catch-all for invalid routes
app.use('*', (req, res) => {
  console.log('invalid link');
  res.status(404).send('Invalid link');
});

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`app is running @ http://localhost:${PORT}/`);
});
