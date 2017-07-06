'use strict';

exports.init = (bot, prefs) => {

    bot.register.command('jsondump', {

        format: true,
        fn: message =>
            `<code>${JSON.stringify(message, undefined, 2).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`

    });

};
