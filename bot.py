import os, telebot
from telebot import types
from flask import Flask
import threading, random

BOT_TOKEN = os.environ.get("BOT_TOKEN")
bot = telebot.TeleBot(BOT_TOKEN)
app = Flask(__name__)

LINKS = {
    "main": "https://omg10.com/4/10943082",
    "ad1": "https://www.profitableratecpmnetwork.com/rg9frw0b?key=3a285a0baa1bd805086b878c9945749a",
    "ad2": "https://www.profitableratecpmnetwork.com/jipcgnfd?key=79a72cee205f810d60114be4f4761dd1"
}

@bot.message_handler(commands=['start'])
def start(m):
    name = m.from_user.first_name
    markup = types.InlineKeyboardMarkup(row_width=2)
    b1 = types.InlineKeyboardButton("🔥 MAIN LINK", url=LINKS["main"])
    b2 = types.InlineKeyboardButton("💰 AD LINK 1", url=LINKS["ad1"])
    b3 = types.InlineKeyboardButton("🚀 AD LINK 2", url=LINKS["ad2"])
    b4 = types.InlineKeyboardButton("🎲 RANDOM EARN", callback_data="rand")
    b5 = types.InlineKeyboardButton("📢 CHANNEL", url="https://t.me/RealreferralAds")
    markup.add(b1, b2)
    markup.add(b3, b4)
    markup.add(b5)

    text = f"""
✨ *REAL REFERRAL PREMIUM* ✨
━━━━━━━━━━━━━━━━━━━━
👋 Sannu *{name}*

💎 Tsari yafi na Get Referrals kyau!

🌐 Global: *86.6K*
📤 Balance: *182*
📥 Received: *149*

🔗 *Links Dinka Na Gaske:*
Danna kasa don samun kudi 👇
"""
    bot.send_message(m.chat.id, text, reply_markup=markup, parse_mode="Markdown")

@bot.callback_query_handler(func=lambda c: True)
def cb(call):
    if call.data == "rand":
        link = random.choice(list(LINKS.values()))
        mk = types.InlineKeyboardMarkup()
        mk.add(types.InlineKeyboardButton("👉 BUƊE YANZU - KA SAMU KUDI", url=link))
        bot.send_message(call.message.chat.id, f"🎲 *Random Link:*\n`{link}`\n\nDanna don bude!", reply_markup=mk, parse_mode="Markdown")

@bot.message_handler(func=lambda m: True)
def all_msg(m):
    bot.reply_to(m, "Tura /start don ganin links dinka masu kudi 💰")

@app.route('/')
def h(): return "PREMIUM BOT LIVE WITH 3 LINKS!"
def run(): bot.infinity_polling()
if __name__ == "__main__":
    threading.Thread(target=run).start()
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT",10000)))
