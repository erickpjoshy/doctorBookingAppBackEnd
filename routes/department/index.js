import express from 'express';
import Department from '../../DB/models/departmentSchema.js';
import Doctor from '../../DB/models/doctorSchema.js';
import checkToken from '../../DB/middlewares/checkToken.js';
const router = express.Router();

router.get('/', checkToken(['DOCTOR', 'User']), async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/getDepartment', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 4;
    const departments = await Department.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json(departments);
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get('/location/district/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = await Doctor.find({ district: id }).populate('department');
    // console.log(doctors);
    res.status(200).json(doctors);
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get('/spdepartment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    console.log(department);
    // console.log(doctors);
    res.status(200).json(department);
  } catch (e) {
    res.status(500).json(e);
  }
});
router.post('/', async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(200).json(department);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndUpdate(id, req.body);
    res.status(200).json(department);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
