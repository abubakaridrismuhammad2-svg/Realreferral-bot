const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN);
const APP_URL = "https://realreferral-bot.vercel.app";

// CHANNEL DINKA - Mai makon @realreferralBotads / A_ToolsX
const CHANNEL_ID = "@realreferralBotads"; // Sunan username idan kana dashi
const CHANNEL_LINK = "https://t.me/+Rwe4riOGKPszMTI0"; // Link dinka na Invite

let referrals = {};

module.exports = async (req, res) => {
  if (req.method === 'GET') return res.status(200).send('Bot is Running!');

  if (req.method === 'POST') {
    const msg = req.body.message;
    if (!msg) return res.status(200).send('ok');
    const chatId = msg.chat.id;
    const text = msg.text || '';

    if (text.startsWith('/start')) {

      // Tilasta shiga Channel DINKA (ba A_ToolsX ba)
      try {
        const member = await bot.getChatMember(CHANNEL_ID, chatId);
        if (member.status === 'left' || member.status === 'kicked') {
          return await bot.sendMessage(chatId,
`👋 Dole ka shiga Channel dinmu kafin ka ci gaba!`, {
            reply_markup: {
              inline_keyboard: [
                [{ text: '📢 Shiga Channel', url: CHANNEL_LINK }],
                [{ text: '✅ Na Shiga', callback_data: 'check' }]
              ]
            }
          });
        }
      } catch (e) {
        // Idan bot baya cikin channel, kar ya hana - ya wuce
        console.log("Channel check failed, skipping");
      }

      const args = text.split(' ');
      const referrerId = args[1];
      if (referrerId && referrerId!= chatId) {
        if (!referrals[referrerId]) referrals[referrerId] = 0;
        referrals[referrerId] += 1;
      }

      return await bot.sendMessage(chatId,
`Welcome to RealReferral! 🎉

ID: ${chatId}
Link: https://t.me/realreferralAdsbot?start=${chatId}

Tap Open App!`, {
        reply_markup: {
          inline_keyboard: [[{ text: "🚀 Open App", web_app: { url: APP_URL } }]]
        }
      });
    }
    return res.status(200).send('ok');
  }
};
