const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "-1004344600915";
const CHANNEL_LINK = "https://t.me/RealreferralAds1";
const WEBAPP = "https://real-referral-v19.vercel.app";

const bot = new Telegraf(BOT_TOKEN);

async function checkJoin(userId) {
  try {
    const m = await bot.telegram.getChatMember(CHANNEL_ID, userId);
    return ['member','administrator','creator'].includes(m.status);
  } catch { 
    return false; 
  }
}

bot.start(async (ctx) => {
  const ok = await checkJoin(ctx.from.id);
  if (!ok) {
    return ctx.reply(
`⚠️ You must join our channel to continue:

${CHANNEL_LINK}

After joining, send /start again!`,
      Markup.inlineKeyboard([
        [Markup.button.url("📢 JOIN CHANNEL", CHANNEL_LINK)],
        [Markup.button.callback("✅ I HAVE JOINED", "chk")]
      ])
    );
  }
  return ctx.reply(
`Hello ${ctx.from.first_name}! 🎉
Welcome to Real Referral!

Earn rewards by completing tasks and referring friends.`,
    Markup.inlineKeyboard([
      [Markup.button.webApp("🚀 OPEN REAL REFERRAL", WEBAPP)]
    ])
  );
});

bot.action('chk', async (ctx) => {
  const ok = await checkJoin(ctx.from.id);
  if (ok) {
    await ctx.answerCbQuery("✅ Verified!");
    return ctx.reply("✅ Great! You have joined. Now send /start");
  } else {
    await ctx.answerCbQuery("❌ You haven't joined yet!", {show_alert: true});
  }
});

bot.launch().then(()=>console.log("BOT LIVE - ENGLISH VERSION"));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
