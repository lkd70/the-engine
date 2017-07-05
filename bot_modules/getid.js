'use strict';

exports.init = (bot, prefs) => {

    bot.functions.myid = {

        fn: message => {

            return `Your user id is: ${message.from.id}`;

        }

    };

    bot.functions.chatid = {

        fn: message => {

            return `This chat id is: ${message.chat.id}`;

        }

    };

};