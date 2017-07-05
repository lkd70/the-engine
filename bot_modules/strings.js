'use strict'

exports.init = (bot, prefs) => {

    bot.register.command('echo', {
        fn: msg => {
            var message = msg.text.replace('/echo','');

            if (message != "") {
	           	bot.api.sendMessage(msg.chat.id, '```' + message + '```', {
	                parseMode:"markdown",
	                reply: msg.message_id
	            });
            } else {
            	return "Please supply some text to echo...";
            }

        }
    })

}