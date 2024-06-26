import express from 'express';
import departmentRoutes from './department/index.js';
import imageRoutes from './image/index.js';
import PrescriptionRoutes from './prescription/index.js';
import DoctorRoutes from './doctor/index.js';
import UserRoutes from './user/index.js';
import AppointmentRouter from './appointment/index.js';
import SlotRouter from './slots/index.js';
import SliderRouter from './slider/index.js';
import locationRouter from './location/index.js';
const router = express.Router();

router.use('/department', departmentRoutes);
router.use('/upload', imageRoutes);
router.use('/prescription', PrescriptionRoutes);
router.use('/doctor', DoctorRoutes);
router.use('/user', UserRoutes);
router.use('/appointments', AppointmentRouter);
router.use('/slot', SlotRouter);
router.use('/slider', SliderRouter);
router.use('/location', locationRouter);
export default router;
