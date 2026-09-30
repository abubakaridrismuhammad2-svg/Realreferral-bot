export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('Bot running OK');
  try {
    const BOT_TOKEN = "8945722454:AAE900lhrT9KG9sj-OgNyuVvX6u0sgL_b5k";
    const APP_URL = "https://realreferral-bot.vercel.app";
    const msg = req.body.message;
    if (!msg) return res.status(200).end();
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const txt = `Welcome to RealReferral! 🎉\n\nYour ID: ${userId}\nBalance: 50 Coins 💎\n\nYour Referral Link:\nhttps://t.me/realreferralAdsbot?start=${userId}\n\nShare & earn 10 Coins!\n\nTap below to open App!`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:chatId,text:txt,reply_markup:{inline_keyboard:[[{text:"🚀 Open App",web_app:{url:APP_URL}}]]}})
    });
  } catch(e){}
  res.status(200).end();
}
