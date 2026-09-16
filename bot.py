import os, telebot
from telebot import types
from flask import Flask
import threading

BOT_TOKEN = os.environ.get("BOT_TOKEN")
bot = telebot.TeleBot(BOT_TOKEN)
app = Flask(__name__)

# --- DATABASE NA SAUKI (don referral) ---
users = {}

# --- /START - MAFI KYAU ---
@bot.message_handler(commands=['start'])
def start(message):
    user_id = message.from_user.id
    name = message.from_user.first_name

    # Referral logic
    ref_id = None
    if len(message.text.split()) > 1:
        ref_id = message.text.split()[1]

    if user_id not in users:
        users[user_id] = 0
        if ref_id and ref_id!= str(user_id):
            users[int(ref_id)] = users.get(int(ref_id), 0) + 1
            bot.send_message(int(ref_id), f"🎉 Taya murna! {name} ya shigo ta link dinka!\nYanzu referral dinka: {users[int(ref_id)]}")

    # Design mai burgewa
    text = f"""
✨ *BARKA DA ZUWA REAL REFERRAL ADS* ✨
━━━━━━━━━━━━━━━━━━━━
👋 Sannu *{name}*!

🚀 Wannan shine bot na musamman don samun kuɗi ta hanyar referral.

👥 *Referral dinka:* `{users.get(user_id, 0)}`
🔗 *Link dinka:* `https://t.me/realreferralAdsbot?start={user_id}`

Zabi abinda kake so a kasa 👇
"""
    markup = types.InlineKeyboardMarkup(row_width=2)
    btn1 = types.InlineKeyboardButton("📢 Shiga Channel", url="https://t.me/RealreferralAds")
    btn2 = types.InlineKeyboardButton("💰 Farashi", callback_data="price")
    btn3 = types.InlineKeyboardButton("🔗 My Link", callback_data="mylink")
    btn4 = types.InlineKeyboardButton("📊 Kididdiga", callback_data="stats")
    btn5 = types.InlineKeyboardButton("📞 Tallafi", callback_data="support")
    markup.add(btn1, btn2, btn3, btn4, btn5)

    bot.send_message(message.chat.id, text, reply_markup=markup, parse_mode="Markdown")

# --- BUTTON AUTO-REPLY ---
@bot.callback_query_handler(func=lambda call: True)
def buttons(call):
    uid = call.from_user.id
    if call.data == "price":
        bot.answer_callback_query(call.id, "Farashi 💰")
        bot.send_message(call.message.chat.id, "💰 *JADAWALIN FARASHI*\n━━━━━━━━━━━━\n👥 1,000 Members - ₦2,000\n👥 5,000 Members - ₦8,000\n👥 10,000 Members - ₦15,000\n\nTura /buy don saya", parse_mode="Markdown")
    elif call.data == "mylink":
        bot.send_message(call.message.chat.id, f"🔗 Ga link dinka na musamman:\n\n`https://t.me/realreferralAdsbot?start={uid}`\n\nKa tura wa mutane, duk wanda ya shigo zaka samu lada!", parse_mode="Markdown")
    elif call.data == "stats":
        bot.send_message(call.message.chat.id, f"📊 *KIDIDDIGARKA*\n━━━━━━━━━━━━\n👤 Suna: {call.from_user.first_name}\n👥 Referrals: `{users.get(uid, 0)}`\n💵 Kudin da ka tara: ₦{users.get(uid, 0)*100}", parse_mode="Markdown")
    elif call.data == "support":
        bot.send_message(call.message.chat.id, "📞 Tuntube mu:\n@YourUsername\n\nMuna nan 24/7!")

# --- KEYWORD AUTO-REPLY (Daburgewa) ---
@bot.message_handler(func=lambda m: True)
def auto_reply(message):
    txt = message.text.lower()

    if "sannu" in txt or "hello" in txt or "hi" in txt:
        bot.reply_to(message, f"Sannu {message.from_user.first_name} 👋\nTura /start don fara!")
    elif "farashi" in txt or "price" in txt or "kudi" in txt:
        bot.reply_to(message, "💰 Farashi daga ₦2,000 ne! Tura /start ka danna 💰 Farashi")
    elif "yaya" in txt:
        bot.reply_to(message, "Lafiya lau! 😊 Ina maka fatan alheri. /start")
    else:
        bot.reply_to(message, "🤖 Ban gane ba, amma ka tura /start don ganin abubuwan da na iya yi ✨")

@app.route('/')
def home():
    return "RealReferral Bot is Live & Beautiful! ✨"

def run_bot():
    bot.infinity_polling()

if __name__ == "__main__":
    threading.Thread(target=run_bot).start()
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 10000)))
