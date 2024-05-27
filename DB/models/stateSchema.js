import { Schema, model } from 'mongoose';

const stateSchema = Schema({
  name: String,
});

const State = model('State', stateSchema);

export default State;
