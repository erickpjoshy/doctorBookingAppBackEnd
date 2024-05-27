import express from 'express';
import Slider from '../../DB/models/sliderSchema.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const images = await Slider.find();
    res.status(200).json(images);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const images = await Slider.create(req.body);
    res.status(200).json(images);
  } catch (e) {
    res.status(403).json(e);
  }
});

export default router;
