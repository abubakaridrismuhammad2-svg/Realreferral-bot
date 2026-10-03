export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(200).send('Bot running OK');
  try {
    const BOT_TOKEN = process.env.BOT_TOKEN; // Saka a Vercel Env
    const APP_URL = "https://realreferral-bot.vercel.app";
    const SUPA_URL = "https://YOUR_SUPABASE_ID.supabase.co";
    const SUPA_KEY = process.env.SUPABASE_KEY; // Saka a Vercel Env

    const msg = req.body.message;
    if (!msg) return res.status(200).end();
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text || "";

    // --- SABON GYARA: Ladan Referral ---
    let refMsg = "";
    if (text.startsWith("/start ")) {
      const referrer = text.split(" ")[1];
      if (referrer && parseInt(referrer)!= userId) {
        refMsg = `\n\n🎁 An gayyace ka daga ${referrer}!\n`;
        try {
          // 1. Rubuta a referrals table
          await fetch(`${SUPA_URL}/rest/v1/referrals`, {
            method: 'POST',
            headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ referrer: parseInt(referrer), referred: userId })
          });
          // 2. Bada 5 Coins ga wanda ya gayyata (idan kana da users table)
          // Wannan zai yi aiki idan kana da users table
        } catch(e){}
      }
    }
    // --- KARSHEN GYARA ---

    const txt = `Welcome to RealReferral! 🎉${refMsg}\nYour ID: ${userId}\nBalance: 50 Coins 💎\n\nYour Referral Link:\nhttps://t.me/realreferralAdsbot?start=${userId}\n\nShare & earn 5 Coins per invite!\n\nTap below to open App!`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:chatId,text:txt,reply_markup:{inline_keyboard:[[{text:"🚀 Open App",web_app:{url:APP_URL}}]]}})
    });
  } catch(e){}
  res.status(200).end(); 
}
