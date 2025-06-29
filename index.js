require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client();

client.on('ready', async () => {
  console.log(`✅ Bağlandı: ${client.user.tag}`);

  try {
    const channel = await client.channels.fetch(process.env.VOICE_CHANNEL_ID);
    if (!channel) {
      console.error("❌ Kanal fetch edilemedi.");
      return;
    }

    console.log(`🎯 Kanal bulundu: ${channel.name}, Türü: ${channel.type}`);

    if (channel.type !== 'GUILD_VOICE') {
      console.error("❌ Bu kanal bir SES kanalı değil. Metin kanalı olamaz.");
      return;
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false
    });

    console.log(`🔊 Ses kanalına bağlandı: ${channel.name}`);
  } catch (err) {
    console.error("❌ Kanal bağlanma hatası:", err);
  }
});

client.login(process.env.TOKEN);
