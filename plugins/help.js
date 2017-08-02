'use strict'

const emoji = require('../emoji');

exports.init = (bot, prefs) => {

    const help = [
        "Use `/help <command>` to get help for one of the /commands.",
    ].join('\n')

    bot.register.command('start', {
        fn: (msg) => {
            msg.reply.text("*Welcome to The Engine " + msg.from.first_name + "!*\n\nThe Engine is a powerful Telegram [Node.js](https://nodejs.org) bot based on Mattata.\nThe bot is fully modular in that it relies purely on plugins to function; This means you can add plugins to include additional functionality.\n\nWhere to go from here?\nTry the /help command for some assistance.\nOr check out some other /commands", {parseMode: 'markdown'});
        }
    });

    bot.register.command('help', {
        help,
        fn: msg => {
            var command = msg.args.toLowerCase();

            if (command !== "") {
                if (bot.functions.hasOwnProperty(command)) {
                    if ("help" in bot.functions[command]) {
                        return msg.reply.text(bot.functions[command].help, {
                            parseMode: 'markdown',
                            asReply: msg.chat.type !== 'private',
                        });
                    } else {
                        return "There's no help for the '" + command + "' command yet, sorry.";
                    }
                } else {
                    return "The command '" + command + "' wasn't found. Use /commands to list all available commands.";
                }
            } else {
                return msg.reply.text("Hey *" + msg.from.first_name + "!* Welcome to The Engine " + emoji.get('grin') + "\n\nThe Engine is an intelligent plugin-based bot.\nAt its core, The Engine is a simple yet powerful plugin platform. This makes expanding the bots functionality as simple as adding a plugin.\nTo see all loaded plugins, try the /plugins command!\n\nNeed help for a specific command? " + help, {
                    parseMode: 'markdown',
                    asReply: msg.chat.type !== 'private',
                });
            }
        }
    })

    let commands

    process.nextTick(() => {
        commands = Object.keys(bot.functions)
            .sort()
            .map(command => `\`/${command}\``)
            .join('\n');
    });

    bot.register.command('commands', {
        help: "Lists all commands provided by the bot.",
        fn: msg => {
            bot.api.sendMessage(msg.chat.id, commands, {
                reply: msg.message_id,
                parseMode: "markdown"
            });
        }
    });
}
