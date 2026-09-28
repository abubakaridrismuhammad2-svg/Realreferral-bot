const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN);
const CHANNEL = process.env.CHANNEL_USERNAME || '@realreferralBotads';

// Wannan wuri ne za ka saka Database daga baya
// Yanzu yana memory ne kawai (zai goge idan kayi redeploy)
// Daga baya za mu saka MongoDB/Firebase
let referrals = {}; // { userId: count }

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).send('Bot is Running!');
  }

  if (req.method === 'POST') {
    const msg = req.body.message;
    if (!msg) return res.status(200).send('ok');

    const chatId = msg.chat.id;
    const text = msg.text || '';

    if (text.startsWith('/start')) {
      // 1. DUBA CHANNEL
      try {
        const member = await bot.getChatMember(CHANNEL, chatId);
        if (member.status === 'left' || member.status === 'kicked') {
          return await bot.sendMessage(chatId,
`👋 Dole ka shiga channel ${CHANNEL} kafin ka ci gaba!`, {
            reply_markup: {
              inline_keyboard: [
                [{ text: '📢 Shiga Channel', url: `https://t.me/${CHANNEL.replace('@','')}` }],
                [{ text: '✅ Na Shiga', callback_data: 'check' }]
              ]
            }
          });
        }
      } catch (e) { console.log(e.message); }

      // 2. DUBA REFERRAL
      const args = text.split(' ');
      const referrerId = args[1]; // ID na wanda ya kawo shi

      if (referrerId && referrerId!= chatId) {
        // An zo ta referral!
        if (!referrals[referrerId]) referrals[referrerId] = 0;
        referrals[referrerId] += 1;

        await bot.sendMessage(referrerId,
`🎉 Sabon Referral!

Wani ya shiga ta link dinka! Yanzu kana da ${referrals[referrerId]} referral.`).catch(()=>{});

        await bot.sendMessage(chatId,
`Assalamu Alaikum! Barka da zuwa! 👋

Ka zo ta hanyar ID: ${referrerId}

ID dinka: ${chatId}
Link dinka na gayyata:
https://t.me/realreferralAdsbot?start=${chatId}

Ka yada link dinka ka samu kyauta!`);
      } else {
        // Ba referral bane, /start ne kai tsaye
        const count = referrals[chatId] || 0;
        await bot.sendMessage(chatId,
`Assalamu Alaikum! Barka da zuwa RealReferral Bot ✅

ID dinka: ${chatId}
Referrals dinka: ${count}

Link dinka na musamman:
https://t.me/realreferralAdsbot?start=${chatId}

Yada wannan link din, duk wanda ya shiga ta cikinsa za a kirga maka!`);
      }
    }
    return res.status(200).send('ok');
  }
  return res.status(405).send('Method not allowed');
};
