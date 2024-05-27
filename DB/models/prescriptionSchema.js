import { Schema, model } from 'mongoose';

const prescriptionSchema = Schema(
  {
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String,
    appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    medcines: [{ type: Schema.Types.ObjectId, ref: 'Medcine' }],
  },
  { timestamps: true }
);

const Prescription = model('Prescription', prescriptionSchema);

export default Prescription;
