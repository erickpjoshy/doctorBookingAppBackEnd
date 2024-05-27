import express from 'express';
import Prescription from '../../DB/models/prescriptionSchema.js';

const router = express.Router();

router.get('/appointment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.find({ appointment: id });
    res.status(200).json(prescription);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json(prescription);
  } catch (e) {
    res.status(400).json(e);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findByIdAndUpdate(id);
    res.status(201).json(prescription);
  } catch (e) {
    res.status(400).json(e);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findByIdAndDelete(id);
    res.status(201).json(prescription);
  } catch (e) {
    res.status(400).json(e);
  }
});
export default router;
