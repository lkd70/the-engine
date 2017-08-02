'use strict';

exports.init = (bot, prefs) => {

    bot.register.command(['spongebobify','spongebob','spongify','mock'], {
        fn: msg => {
            if (!msg.args) {
                return "ProVidE SoME TExt, duDE!!";
            }

            bot.api.sendPhoto(msg.chat.id, 'https://i.imgflip.com/1p4jje.jpg', {
                caption: Array.from(msg.args).map(c => ((Math.random()<.6) ? c.toLowerCase() : c.toUpperCase())).join(''),
                reply: msg.message_id
            });
        }
    });

};
