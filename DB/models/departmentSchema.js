import { Schema, model } from 'mongoose';

const departmentSchema = Schema(
  {
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    icon: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const Department = model('Department', departmentSchema);

export default Department;
