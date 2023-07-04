const TelegramBot = require('node-telegram-bot-api');
const list = require("./scrape");

const token = '6256098596:AAGFVjYC96Cpt_uAVbC6cyQBe2zkMA_Vaok';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const currentTime = new Date();
    const chatId = msg.chat.id;
    console.log(`-New message from ${msg.from.first_name}   (${currentTime})`)
    bot.sendMessage(chatId, "diegospillo ti consiglia...");
    const messageText = msg.text;
    const res = await response(messageText);
  
    await bot.sendMessage(chatId, res);
    await bot.sendMessage(chatId, "Cerca altre parole per vincere su tutti 😁");
  });

async function response(istr) {
      istr = istr.replace(/ /g, "-");
      const val = await list(istr);
      return val;
}
  
bot.on('new_chat_members', (message) => {
  const chatId = message.chat.id;
  const newMembers = message.new_chat_members;
  
  // Itera sui nuovi membri e invia un messaggio di benvenuto
  newMembers.forEach((member) => {
    const memberName = member.first_name; // Puoi utilizzare anche member.username o altri campi
  
    // Invia il messaggio di benvenuto al nuovo membro
    bot.sendMessage(chatId, `Benvenuto, ${memberName}!`);
  });
});