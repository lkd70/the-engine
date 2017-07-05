'use strict';

exports.init = (bot, prefs) => {

    bot.register.command('sayhi', {

        fn: message => {

            bot.api.sendMessage(message.chat.id, 'Hi from explicit bot api usage.', {
                reply: message.message_id
            });

            message.tag('Hi from reply function.');

            return 'Hi from implicit reply.';

        }

    });

};