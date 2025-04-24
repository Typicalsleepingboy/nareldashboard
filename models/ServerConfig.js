import mongoose from 'mongoose';

const ChannelConfigSchema = new mongoose.Schema({
  channelId: { type: String, required: true },
  message: { type: String, required: true }
});

const ServerConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  guildName: { type: String },
  channels: [ChannelConfigSchema] // ← array of channel configs
});

const ServerConfig = mongoose.model('ServerConfig', ServerConfigSchema);
export default ServerConfig;
