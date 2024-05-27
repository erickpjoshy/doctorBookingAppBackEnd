import express from 'express';
import Doctor from '../../DB/models/doctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const body = { ...req.body };
    const doctor = await Doctor.findOne({ email: body.email });
    if (doctor) {
      return res.status(400).json({ error: 'EMAIL ALREADY EXIST' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ error: 'PASSWORDS DOES NOT MATCH' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const newDoctor = await Doctor.create(body);
    return res
      .status(201)
      .json({ message: 'SIGNUP SUCCESSFULL', doctor: newDoctor });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = { ...req.body };
    const doctor = await Doctor.findOne({ email: body.email });
    if (!doctor) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }
    const isMatching = await bcrypt.compare(body.password, doctor.password);
    if (!isMatching) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }

    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ role: 'DOCTOR', id: doctor._id }, key, {
      expiresIn: '10d',
    });
    return res.status(200).json({ message: 'Login Successfull', token: token });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/department/:id', async (req, res) => {
  const { id } = req.params;
  const doctors = await Doctor.find({ department: id });
  res.status(200).json(doctors);
});

router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = await Doctor.findById(id).populate('department');
    res.status(200).json(doctors);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.patch('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    console.log(body);
    // const doctors = await Doctor.findById(id);
    const doctor = await Doctor.findByIdAndUpdate(id, body);
    res.status(200).json({ doctor: doctor, message: 'doctor updated' });
  } catch (e) {
    res.status(403).json(e);
  }
});
// router.patch('/:id')

export default router;
