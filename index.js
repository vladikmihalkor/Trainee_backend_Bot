const TelegramBot = require('node-telegram-bot-api');
const config = require('./src/config');
const bot = new TelegramBot(config.TOKEN,{polling: true});
const request = require('request');

const kb = require('./src/keyboard-buttons');
const keyboard = require('./src/keyboard');
const helper = require('./src/helper');

var font_arab = [1,4,5,9,10,40,50,90,100,400,500,900,1000];
var font_roman = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"];

bot.on('message', msg => {
    var chatId = msg.chat.id;
    var text = msg.text;

    switch (text) {
        case '/start':
            bot.sendMessage(chatId, `✋ Привет <b>${msg.from.first_name}</b>.\nЯ бот-конвертер римских и арабских чисел. Напиши мне любое число, систему счисления я сам определю. Значение должно быть в диапазоне [1 .. 3999].\n<i>- Для удобства основные римские числа я вывел в меню.</i>`, {
                parse_mode: 'html',
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: keyboard.Keyboard
                }
            });
            break;
        default:
            if (helper.isNumeric(text)) {
                if (parseFloat(text) > 3999) {
                    bot.sendMessage(chatId, `❗️ Значение должно быть в диапазоне [1 .. 3999]`)
                } else {
                    bot.sendMessage(chatId, `Преобразование десятичного числа в число, записанное римскими цифрами:\n➡️ <b>${text}</b> => <b>${helper.to_roman(text,font_arab,font_roman)}</b>`, {
                        parse_mode: 'html'
                    });
                }
            } else if (helper.isRoman(text)) {
                bot.sendMessage(chatId, `Преобразование числа, записанного римскими цифрами в десятичное число:\n➡️ <b>${text}</b> => <b>${helper.to_arab(text,font_arab,font_roman)}</b>`, {
                    parse_mode: 'html'
                });
            } else {
                bot.sendMessage(chatId, `👌 Прости, но не понимаю тебя.`);
            }
            break;
    }
});
