const TelegramBot = require('node-telegram-bot-api')
const { sendMessage } = require('./dialogflow')
const { searchVideo } = require('./youtube')
const telegram = require('../telegram.json')

const bot = new TelegramBot(telegram.token, { polling: true })

bot.on('message',async (msg) => {
  const chatId = msg.chat.id
  const response = await sendMessage(chatId.toString(), msg.text)

  let responseText = response.text
  if(response.intent === 'Treino especifico') {
    responseText = await searchVideo(responseText, response.fields.corpo.stringValue)
  }

  bot.sendMessage(chatId, responseText)
})

