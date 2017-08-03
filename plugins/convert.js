'use strict';

var fx = require("money");
var convert = require('convert-units');
const request = require('request-promise');

exports.number_delimiters = function(str) {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}

exports.init = (bot, prefs) => {

    bot.register.command(['convert'], {
        help:'usage: `/convert <value> <from unit> [to] <to unit>`',
        fn: msg => {
            if (!msg.args) {
                return msg.reply.text("Please provide some input. Format: `/convert <value> <from unit> [to] <to unit>`",
                        {
                            parseMode: 'markdown',
                            reply: msg.message_id
                        });
            }

            var args = msg.args.replace(" to ", " ").split(" ");

            if (args.length<3) {
                return msg.reply.text("Please provide a valid input. Format: `/convert <value> <from unit> [to] <to unit>`",
                        {
                            parseMode: 'markdown',
                            reply: msg.message_id
                        });
            }

            if (!convert().possibilities().includes(args[1]) || !convert().possibilities().includes(args[2])) {
                return msg.reply.text("*Invalid units received - Keep in mind, units must be of the same type. You can't convert mass in to time, sadly.*",
                    {
                        parseMode: 'markdown',
                        reply: msg.message_id
                    });
            }

            args[0] = parseFloat(args[0]);

            if (!args[0]) {
                return "Please provide a numerical value";
            }

            try {
                var result = convert(args[0]).from(args[1]).to(args[2]);
                return msg.reply.text(
                        '`' + args[0] + "` " + args[1] + " to " + args[2] + ": `" + exports.number_delimiters(result) + '`',
                        {
                            parseMode: 'markdown',
                            reply: msg.message_id
                        });
            } catch(e) {
                return "Error: " + e;
            }
        }
    });

    bot.register.command(['currency'], {
        help: "Usage: `/currency <value> <from currency> [to] <to currency>`",
        fn: msg => {
            if (!msg.args) {
                return msg.reply.text("Please provide some input. Format:\n`/currency <from currency> <to currency> <value>`\nExample: `/currency 100 GBP to USD`",
                        {
                            parseMode: 'markdown',
                            reply: msg.message_id
                        });
            }

            var args = msg.args.replace(" to "," ").split(" ");

            if (args.length<3) {
                return msg.reply.text("Please provide a valid input. Format:\n`/currency <from currency> <to currency> <value>`\nExample: `/currency 100 GBP to USD`",
                        {
                            parseMode: 'markdown',
                            reply: msg.message_id
                        });
            }

            request.get('http://api.fixer.io/latest', { json: true })
                .then(rates => {
                    fx.rates = rates.rates;
                    if (!Object.keys(rates.rates).includes(args[1])) {
                        return msg.reply.text("Unknown currency: `" + args[1] + "`\nSupported currencies: `" + Object.keys(rates.rates).join("`, `") + "`",{reply:msg.message_id,parseMode:'markdown'});
                    }
                    if (!Object.keys(rates.rates).includes(args[2])) {
                        return msg.reply.text("Unknown currency: `" + args[2] + "`\nSupported currencies: `" + Object.keys(rates.rates).join("`, `") + "`",{reply:msg.message_id,parseMode:'markdown'});
                    }
                    args[0] = parseFloat(args[0]);
                    if (!args[0]) {
                        return msg.reply.text("Please provide a numerical value",{reply:msg.message_id,parseMode:'markdown'});
                    }

                    try {
                        return msg.reply.text('`' + args[0] + "` " + args[1] + " to " + args[2] + ": `" + fx(args[0]).from(args[1]).to(args[2]) + "`",{reply:msg.message_id,parseMode:'markdown'});
                    } catch(e) {
                        return "Error: " + e;
                    }
                })

        }
    })

};
