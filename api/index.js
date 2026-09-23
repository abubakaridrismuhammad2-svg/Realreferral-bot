export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  res.status(200).send("Bot is Running! RealReferral Bot Active");
}         
