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
  } catch { return false; }
}
bot.start(async (ctx) => {
  const ok = await checkJoin(ctx.from.id);
  if (!ok) {
    return ctx.reply(`⚠️ Dole ka shiga channel:\n${CHANNEL_LINK}\nBayan ka shiga tura /start`, Markup.inlineKeyboard([[Markup.button.url("📢 JOIN CHANNEL", CHANNEL_LINK)],[Markup.button.callback("✅ NA SHIGA","chk")]]));
  }
  return ctx.reply(`Sannu ${ctx.from.first_name}! 🎉`, Markup.inlineKeyboard([[Markup.button.webApp("🚀 BUDE REAL REFERRAL", WEBAPP)]]));
});
bot.action('chk', async (ctx) => {
  const ok = await checkJoin(ctx.from.id);
  if (ok) { await ctx.answerCbQuery("✅ Madalla!"); return ctx.reply("✅ Ka shiga! Tura /start"); }
  else await ctx.answerCbQuery("❌ Baka shiga ba",{show_alert:true});
});
bot.launch().then(()=>console.log("BOT LIVE"));
