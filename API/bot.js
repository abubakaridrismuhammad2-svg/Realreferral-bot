import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://hgdxkzzgzmiropkrdfhm.supabase.co",
  "sb_publishable_8jJGMNp-44jHaeJfe2MwNw_yv9x100O"
);
const BOT_TOKEN = "8945722454:AAE900lhrT9KG9sj-OgNyuVvX6u0sgL_b5k

export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(200).send('Bot is running');

  const { message } = req.body;
  if (!message ||!message.text) return res.status(200).end();

  const chatId = message.chat.id;
  const userId = message.from.id;
  const firstName = message.from.first_name || "User";
  const text = message.text;

  if (text.startsWith('/start')) {
    const refId = text.split(' ')[1] || null;

    try {
      let { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
      if (!user) {
        await supabase.from('users').insert([{
          id: userId, first_name: firstName, username: message.from.username || "",
          balance: 50, earned: 0, referrals: 0, referred_by: refId
        }]);
        if (refId && refId!= userId) {
          let { data: refUser } = await supabase.from('users').select('*').eq('id', refId).single();
          if (refUser) {
            await supabase.from('users').update({
              balance: refUser.balance + 10,
              referrals: (refUser.referrals || 0) + 1
            }).eq('id', refId);
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
              method: 'POST', headers: {'Content-Type':'application/json'},
              body: JSON.stringify({ chat_id: refId, text: `🎉 New Referral!\n${firstName} joined via your link!\n💎 +10 Coins earned!\nBalance: ${refUser.balance + 10}` })
            });
          }
        }
      }
      let { data: cur } = await supabase.from('users').select('*').eq('id', userId).single();
      let bal = cur? cur.balance : 50;

      let welcome = `Welcome to RealReferral! 🎉\n\n`;
      if (refId) welcome += `You were invited by ID: ${refId}\n\n`;
      welcome += `Your ID: ${userId}\nYour Balance: ${bal} Coins 💎\n\nYour Referral Link:\nhttps://t.me/realreferralAdsbot?start=${userId}\n\nShare and earn 10 Coins per invite!\n\n👇 Open App to start earning!`;

      let APP_URL = "https://your-vercel-link.vercel.app";

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          chat_id: chatId,
          text: welcome,
          reply_markup: {
            inline_keyboard: [
              [{ text: "🚀 Open App - Earn Coins", web_app: { url: APP_URL } }],
              [{ text: "👥 Join Group 1", url: "https://t.me/+Rwe4riOGKPszMTI0" }],
              [{ text: "👥 Join Group 2", url: "https://t.me/+Eyd0Z_uqQGM5ZjI0" }],
              [{ text: "👥 Join Group 3", url: "https://t.me/+OFwjUl2v-L44OTRk" }]
            ]
          }
        })
      });
    } catch (e) { console.log(e); }
  }
  res.status(200).end();
}
