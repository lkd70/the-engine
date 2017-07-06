'use strict';

const util = require('util');

exports.init = (bot, prefs) => {

    bot.register.command('myid', {

        fn: message => {

            return `Your user id is: ${message.from.id}`;

        }

    });

    bot.register.command('chatid', {

        fn: message => {

            return `This chat id is: ${message.chat.id}`;

        }

    });

    bot.register.command('jsondump', {
        fn: msg => {
            bot.api.sendMessage(msg.chat.id, '```'+util.inspect(msg, false, null)+'```', {
                parseMode:"markdown",
                reply: msg.message_id
            });
        }
    });

};