const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).send('Bot is Running! RealReferral Bot Active');
  }
  if (req.method === 'POST') {
    const msg = req.body.message;
    if (msg) {
      const chatId = msg.chat.id;
      if (msg.text === '/start') {
        await bot.sendMessage(chatId, `Assalamu Alaikum! Barka da zuwa RealReferral Bot. ID dinka: ${chatId}`);
      }
    }
    return res.status(200).send('ok');
  }
  return res.status(405).send('Method not allowed');
};
