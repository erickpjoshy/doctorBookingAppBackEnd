import express from 'express';
import Appointment from '../../DB/models/appointmentSchema.js';
import Slot from '../../DB/models/slotSchema.js';
import User from '../../DB/models/userSchema.js';
import nodemailer from 'nodemailer';
const router = express.Router();

router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.findById(id);
  res.status(200).json(appointments);
});

router.get('/doctor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.find({ doctor: id }).populate([
      'doctor',
      'user',
      'slot',
    ]);
    res.status(200).json(appointments);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.find({ user: id }).populate([
      'doctor',
      'user',
      'slot',
    ]);
    res.status(200).json(appointments);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ user: id });
  res.status(200).json(appointments);
});

//take appointment
router.post('/', async (req, res) => {
  const body = { ...req.body };
  console.log(body);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mebdoctortech@gmail.com',
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const user = await User.findById(body.user);

  let options = {
    from: 'mebdoctortech@gmail.com',
    to: user.email,
    subject: 'YOUR BOOKING CONFIRMED',
    text: 'Thank you for booking appoinment',
  };
  transporter.sendMail(options);
  const slot = await Slot.findByIdAndUpdate(body.slot, { status: 'BOOKED' });
  const appointment = await Appointment.create(body);
  res.status(201).json({ slot: slot, appointment: appointment });
});

//pdf create
router.get('/pdf/:id', async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id).populate([
    'doctor',
    'user',
    'slot',
  ]);
  res.render('pdf', { appointment: appointment });
});
//cancel appointment
router.post('/cancel/:id', async (req, res) => {
  const { id } = req.params;

  const slot = await Slot.findByIdAndUpdate(body.slot, { status: 'FREE' });
  const appointment = await Appointment.findByIdAndUpdate(id, {
    satus: 'CANCELED',
  });
  res.status(201).json({ message: 'appointment cancelled' });
});
export default router;
