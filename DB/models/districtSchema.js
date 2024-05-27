import { Schema, model } from 'mongoose';
const districtSchema = Schema(
  { state: { type: Schema.Types.ObjectId, ref: 'State' }, name: String },
  { timestamps: true }
);

const District = model('District', districtSchema);

export default District;
