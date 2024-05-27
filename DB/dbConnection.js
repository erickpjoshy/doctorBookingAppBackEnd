import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://erickpjoshy:lYnrLTMeBWAdlUwL@mebdoctortechdoctorbook.sx8coua.mongodb.net/?retryWrites=true&w=majority&appName=MebDoctorTechDoctorBookingApp'
  )
  .then(() => {
    console.log('DB Connected');
  })
  .catch(e => {
    console.log(e);
  });

export default mongoose;
