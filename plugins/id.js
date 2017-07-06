'use strict';

exports.init = (bot, prefs) => {

    bot.register.command('userid', {

        format: true,
        fn: message =>
            message.reply_to_message
            ? `The tagged user's id is <code>${message.reply_to_message.from.id}</code>.`
            : `Your user id is <code>${message.from.id}</code>.`

    });

    bot.register.command('chatid', {

        format: true,
        fn: message =>
            `This chat id is <code>${message.chat.id}</code>.`

    });

};
