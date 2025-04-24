import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://typicalsleepingboy:Logical91@typicalsleepingboy.8m7nxuo.mongodb.net/?retryWrites=true&w=majority&appName=typicalsleepingboy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB terkoneksi');
  } catch (error) {
    console.error('❌ Gagal konek MongoDB:', error.message);
  }
}
