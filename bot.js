const TelegramBot = require('node-telegram-bot-api');
const list = require("./scrape");
const date = require("./date");
const notifica = require("./notifica");

/*DEPLOY
git add .
git commit -m "First Commit"
git push origin main
*/

const token = '6256098596:AAGFVjYC96Cpt_uAVbC6cyQBe2zkMA_Vaok';
const bot = new TelegramBot(token, { polling: true });
const allowedChatIds = [1447860208]; // Sostituisci con gli ID delle chat consentite
//MESSAGE
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
  //CONTROLLO ID
  if (!allowedChatIds.includes(chatId)) {
    bot.sendMessage(chatId, 'Mi spiace, non hai accesso a questo bot.');
    notifica(msg.from.first_name,msg.from.username,msg.text,"rejected",date(msg.date),chatId);
  }
  else{
    //INIZIO COMUNICAZIONE
    await bot.sendMessage(chatId, "diegospillo ti consiglia...");
    const messageText = msg.text;
    //const res = await response(messageText);
    const res = {
      jsn:"offline",
      stato:false
    }
    
    await bot.sendMessage(chatId, res.jsn);

    notifica(msg.from.first_name,msg.from.username,messageText,res.stato,date(msg.date),chatId);
    await bot.sendMessage(chatId, "Cerca altre parole per vincere contro chiunque 😁");
  }
});

//RESPONSE FROM PUPPETTER
async function response(istr) {
      istr = istr.replace(/ /g, "-");
      const val = await list(istr);
      return val;
}