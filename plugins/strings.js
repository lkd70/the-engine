'use strict'

exports.init = (bot, prefs) => {

    bot.register.command('echo', {

        format: true,
        fn: message => {

            var response = message.text.replace('/echo', "");

            if (!response)
                return "Supply some text to echo in markdown. (For example: <code>/echo *bold text*</code>.)";

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
