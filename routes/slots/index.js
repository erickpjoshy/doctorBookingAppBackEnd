import express from 'express';
import Slot from '../../DB/models/slotSchema.js';
import checkToken from '../../DB/middlewares/checkToken.js';

const router = express.Router();

router.post('/doctor', checkToken(['DOCTOR', 'User']), async (req, res) => {
  try {
    console.log('hai2');
    const slot = await Slot.create(req.body);
    res.status(201).json(slot);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const slot = await Slot.findByIdAndUpdate(id, req.body);
    res.status(201).json(slot);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/doctor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params);
    const slots = await Slot.find({ doctor: id });
    res.status(200).json(slots);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/doctor/:id/:date', async (req, res) => {
  try {
    const { id, date } = req.params;
    // console.log(req.params);
    const slots = await Slot.find({ doctor: id, date: date });
    console.log(slots);
    res.status(200).json(slots);
  } catch (e) {
    res.status(403).json(e);
  }
});

export default router;
