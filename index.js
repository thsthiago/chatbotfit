const TelegramBot = require('node-telegram-bot-api')
const { sendMessage } = require('./dialogflow')
const { searchVideo } = require('./youtube')

const token = "1610681198:AAFAGu8M9K4qgyZDDTps05NV5lw56xDDGUo"

const bot = new TelegramBot(token, { polling: true })

bot.on('message',async (msg) => {
  const chatId = msg.chat.id
  const response = await sendMessage(chatId.toString(), msg.text)

  let responseText = response.text
  if(response.intent === 'Treino especifico') {
    responseText = await searchVideo(responseText, response.fields.corpo.stringValue)
  }

  bot.sendMessage(chatId, responseText)
})

