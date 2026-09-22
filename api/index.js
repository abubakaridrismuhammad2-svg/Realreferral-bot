module.exports = async (req, res) => {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (req.method === 'POST') {
    const { message } = req.body;
    if (message) {
      const chatId = message.chat.id;
      const text = `Sannu ${message.from.first_name}! 👋\n\nBot dinka yana aiki! 🚀\n\nID dinka: ${chatId}\nSakonka: ${message.text}`;
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text })
      });
    }
    res.status(200).send('OK');
  } else {
    res.status(200).send('Bot is Running! Go to Telegram.');
  }
};      
