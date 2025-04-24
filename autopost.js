import SentPromo from './models/SentPromo.js';
import ServerConfig from './models/ServerConfig.js';

export default async function kirimPromosi(client) {
  const configs = await ServerConfig.find();
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

  for (const config of configs) {
    try {
      const alreadySent = await SentPromo.findOne({
        guildId: config.guildId,
        lastSent: { $gte: todayStart }
      });

      if (alreadySent) {
        console.log(`[SKIP] ${config.guildName} sudah dikirimi hari ini`);
        continue;
      }

      for (const ch of config.channels) {
        const channel = client.channels.cache.get(ch.channelId);
        if (!channel) {
          console.log(`[X] Channel tidak ditemukan: ${ch.channelId}`);
          continue;
        }

        await channel.send(ch.message);
        console.log(`[✓] Kirim ke ${config.guildName} di channel ${ch.channelId}`);
      }

      await SentPromo.findOneAndUpdate(
        { guildId: config.guildId },
        { lastSent: new Date() },
        { upsert: true }
      );

    } catch (err) {
      console.error(`[X] Gagal kirim ke ${config.guildName}:`, err.message);
    }
  }
}
