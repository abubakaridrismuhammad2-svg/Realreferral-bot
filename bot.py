import os
import telebot
from flask import Flask
import threading

BOT_TOKEN = os.environ.get("BOT_TOKEN")
bot = telebot.TeleBot(BOT_TOKEN)
app = Flask(__name__)

@bot.message_handler(commands=['start'])
def start(message):
    bot.reply_to(message, "🎉 Barka da zuwa Real Referral Ads!\n\nBot yana aiki 100% ✅\nKa tura /help don taimako")

@bot.message_handler(commands=['help'])
def help(message):
    bot.reply_to(message, "Commands:\n/start - Fara\n/help - Taimako")

@app.route('/')
def home():
    return "Bot is Live! ✅"

def run_bot():
    bot.infinity_polling()

if __name__ == "__main__":
    threading.Thread(target=run_bot).start()
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
