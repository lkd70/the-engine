'use strict';

const request = require('request-promise');

const spongify = (text) => Array.from(text).map(c => ((Math.random()<.6) ? c.toLowerCase() : c.toUpperCase())).join('')

exports.init = (bot, prefs) => {

    bot.register.command(['spongebob', 'spongify', 'mock'], {
        fn: msg => {
            let text;
            if (!msg.args && msg.reply_to_message) {
                text = msg.reply_to_message.text;
            } else {
                text = msg.args;
            }
            if (!text) {
                return "ProVidE SoME TExt, duDE!!";
            }

            bot.api.sendPhoto(msg.chat.id, 'https://i.imgflip.com/1p4jje.jpg', {
                caption: spongify(text),
                reply: msg.message_id
            });
        }
    });

    bot.register.command(['belikebill', 'blb'], {
        fn: msg => {
            if (!msg.args) {
                return "Please provide some text...";
            }

            bot.api.sendPhoto(msg.chat.id, 'http://belikebill.azurewebsites.net/billgen-API.php?text=' + encodeURIComponent(msg.args), {
                caption: "Be like Bill...",
                reply: msg.message_id
            });
        }
    });

    bot.register.command(['cat'], {
        fn: msg => {
            bot.api.sendPhoto(msg.chat.id, 'http://thecatapi.com/api/images/get?type=jpg&size=small&ts=' + Date.now(), {
                caption: "Meow!",
                reply: msg.message_id
            });
        }
    });

    bot.register.command(['chuck'], {
        fn: msg => {
            request.get('https://api.icndb.com/jokes/random', {
                json: true,
                qs: { escape: 'javascript' },
            })
            .then(res => res.value.joke)
            .then(msg.reply.text);
        }
    })

    bot.register.command(['coinflip', 'flip'], {
        fn: () => "The coin landed on " + ((Math.random()>=0.5) ? "Heads" : "Tails") + "!"
    });

};
