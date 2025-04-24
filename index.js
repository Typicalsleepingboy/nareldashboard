import connectDB from './config/db.js';
import kirimPromosi from './autopost.js';
import { Client } from 'discord.js-selfbot-v13';
import 'dotenv/config';
const client = new Client();

connectDB(); 

client.on('ready', () => {
  console.log(`🔓 Login sebagai ${client.user.tag}`);
  kirimPromosi(client); 
  setInterval(() => kirimPromosi(client), 5 * 1000); 
});

client.login(process.env.DISCORD_TOKEN);
