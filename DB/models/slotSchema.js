import { Schema, model } from 'mongoose';

const slotSchema = Schema(
  {
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ['FREE', 'BOOKED', 'NOT AVAILABLE'],
      default: 'FREE',
    },
  },
  { timestamps: true }
);

const Slot = model('Slot', slotSchema);

export default Slot;
