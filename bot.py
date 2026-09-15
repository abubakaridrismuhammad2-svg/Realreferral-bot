import os
import telebot
from flask import Flask
import threading

BOT_TOKEN = os.environ.get("BOT_TOKEN")
bot = telebot.TeleBot(BOT_TOKEN)

app = Flask(__name__)

@bot.message_handler(commands=['start'])
def start(message):
    bot.reply_to(message, "Sannu! Bot yana aiki akan Render ✅")

@bot.message_handler(func=lambda m: True)
def echo(message):
    bot.reply_to(message, f"Ka ce: {message.text}")

@app.route('/')
def home():
    return "Bot is Live! ✅"

def run_bot():
    bot.infinity_polling()

if __name__ == "__main__":
    threading.Thread(target=run_bot).start()
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
