'use strict'


exports.init = (bot, prefs) => {

    bot.register.command('help', {
        help: "You are here!",
        fn: msg => {
            var message = msg.text.replace('/help','');
            
            if (message != "") {
                if (message.substring(1) in bot.functions) {
                    if ("help" in bot.functions[message.substring(1)]) {
                        return bot.functions[message.substring(1)].help;
                    } else {
                        return "There's no help yet for the" + message + " command, sorry.";
                    }
                } else {
                    return "The command" + message + " wasn't found.";
                }
            } else {
                return "Welcome to the help section...";
            }
        }
    })

}