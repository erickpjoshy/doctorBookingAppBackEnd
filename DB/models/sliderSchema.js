import { Schema, model } from 'mongoose';

const sliderSchema = Schema(
  {
    name: String,
    image: String,
  },
  { timestamps: true }
);

const Slider = model('Slider', sliderSchema);

export default Slider;
