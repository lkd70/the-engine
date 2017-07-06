'use strict';

exports.init = (bot, prefs) => {

    bot.register.command('ping', {

        fn: () => 'PONG!'

    });

};
