'use strict';

const emoji = require('../emoji');
const { unformat } = require('./unformat');

const searchEmoji = exports.searchEmoji = s => {
    for (const [shortname, emoji_] of emoji.shortToEmoji) {
        if (shortname.replace(/[_-]/g, '').includes(s.replace(/[_-]/g, ''))) {
            return emoji_;
        }
    }
};

const emojify = exports.emojify = text =>
    text.replace(/:([\w-]+):|\\:|`.+`|```[\s\S]```/g, (match, emojiname) => {
        if (match === '\\:') {
            return ':';
        } else if (emojiname) {
            emojiname = emojiname.toLowerCase();
            return emoji.get(emojiname) || searchEmoji(emojiname) || match;
        } else {
            return match;
        }
    });

exports.init = (bot, prefs) => {

    bot.register.command('echo', {

        format: true,
        fn: message => {

            if (!message.args) {
                return "Supply some text to echo in markdown. (For example: <code>/echo *bold text*</code>.)";
            }

            const cut = message.entities[0].length + 1;

            // we run unformat with the command intact, to not mess up entity offsets,
            // only after that we get rid of command
            let response = unformat(message).slice(cut);

            response = emojify(response);

            bot.api.sendMessage(message.chat.id, response, {
                parseMode: 'markdown',
                reply: (message.reply_to_message || message).message_id
            }).catch(e =>
                e.description.includes('entity')
                    ? message.tag(response)
                    : message.error(e.error_code, e.description)
            );

        }

    });

}
