import connectDB from './config/db.js';
import kirimPromosi from './autopost.js';
import { Client } from 'discord.js-selfbot-v13';
const client = new Client();

connectDB();

client.on('ready', () => {
  console.log(`🔓 Login sebagai ${client.user.tag}`);
  kirimPromosi(client); 
  setInterval(() => kirimPromosi(client), 5 * 1000); 
});

client.login('NzI1ODA1Mjk0NzU5ODM3NzM2.GajJhD.HjebLvweHct7t8TKPGQr3QZjTMM8kos0ry83n4');
