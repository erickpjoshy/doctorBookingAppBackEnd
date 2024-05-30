import express from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
import fs from 'fs';
import { log } from 'console';
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/image', upload.single('file'), (req, res) => {
  res.status(201).json({ url: `http://localhost:4444/${req.file.filename}` });
});

router.post('/delete', async (req, res) => {
  console.log(req.body);
  const image = req.body.image;
  fs.unlink(`uploads/${image}`, err => {
    console.log(err);
    console.log('image unploaded');
  });
  res.status(200).json({ message: 'image deleted' });
});
export default router;
