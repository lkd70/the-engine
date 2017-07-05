'use strict';

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

};