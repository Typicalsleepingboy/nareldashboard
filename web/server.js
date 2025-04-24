import express from 'express';
import bodyParser from 'body-parser';
import connectDB from '../config/db.js';
import ServerConfig from '../models/ServerConfig.js';

connectDB();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Halaman utama
app.get('/', async (req, res) => {
  const configs = await ServerConfig.find();
  res.render('index', { configs });
});

app.post('/add', async (req, res) => {
  const { guildId, guildName, channels } = req.body;k
  const channelConfigs = channels.map((ch, index) => ({
    channelId: ch.channelId,
    message: ch.message,
  }));

  await ServerConfig.findOneAndUpdate(
    { guildId },
    { guildName, channels: channelConfigs },
    { upsert: true }
  );

  res.redirect('/');
});

// Halaman Edit Konfigurasi
app.get('/edit/:guildId/:channelIdx', async (req, res) => {
  const { guildId, channelIdx } = req.params;
  const config = await ServerConfig.findOne({ guildId });

  if (!config) {
    return res.status(404).send('Server tidak ditemukan.');
  }

  const channelConfig = config.channels[channelIdx];
  res.render('edit', { config, channelConfig, channelIdx });
});

// Route untuk menyimpan perubahan
app.post('/edit/:guildId/:channelIdx', async (req, res) => {
  const { guildId, channelIdx } = req.params;
  const { channelId, message } = req.body;

  const config = await ServerConfig.findOne({ guildId });
  if (!config) return res.status(404).send('Server tidak ditemukan.');

  config.channels[channelIdx] = { channelId, message };
  await config.save();

  res.redirect('/');
});


// Form hapus config
app.post('/delete', async (req, res) => {
  await ServerConfig.deleteOne({ guildId: req.body.guildId });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('🌐 Dashboard aktif di http://localhost:3000');
});
