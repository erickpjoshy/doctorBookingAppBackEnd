import express from 'express';
import User from '../../DB/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).json({ error: 'EMAIL ALREADY EXIST' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ error: 'PASSWORDS DOES NOT MATCH' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const newUser = await User.create(body);
    return res
      .status(201)
      .json({ message: 'USER SIGNUP SUCCESSFULL', user: newUser });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }

    const key = 'jjhjhdbbsjjjsnnwjjkmkmsdjkfdnej';
    const token = jwt.sign({ role: 'User', id: user._id }, key, {
      expiresIn: '10d',
    });
    return res
      .status(200)
      .json({ message: 'User Login Successfull', token: token });
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
  const users = await User.find();
  res.status(200).json(users);
});

router.patch('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const doctor = await Doctor.findIdAndUpdate(id, body);
  res.status(200).json({ doctor: doctor, message: 'doctor updated' });
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
});

export default router;
