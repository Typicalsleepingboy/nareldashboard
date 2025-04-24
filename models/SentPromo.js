import mongoose from 'mongoose';

const SentPromoSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  lastSent: { type: Date, default: Date.now }
});

const SentPromo = mongoose.model('SentPromo', SentPromoSchema);
export default SentPromo;
