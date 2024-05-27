import State from '../../DB/models/stateSchema.js';
import District from '../../DB/models/districtSchema.js';
import express from 'express';
import checkToken from '../../DB/middlewares/checkToken.js';

const router = express.Router();

router.post('/state', async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/state', async (req, res) => {
  try {
    const states = await State.find();
    res.status(201).json(states);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.post('/district', async (req, res) => {
  try {
    const district = await District.create(req.body);
    res.status(201).json(district);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/district/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const districts = await District.find({ state: id });
    res.status(201).json(districts);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/district', checkToken(['Doctor', 'User']), async (req, res) => {
  try {
    //   const { id } = req.params;
    const districts = await District.find();
    res.status(201).json(districts);
  } catch (e) {
    res.status(403).json(e);
  }
});

export default router;
