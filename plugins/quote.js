'use strict';

const id = require('./id');

exports.init = (bot, prefs) => {
    bot.register.command('savequote', {
        fn: (msg) => {
            if (msg.from.id === msg.reply_to_message.from.id) {
                return "You cannot save your own message, someone else must find it worthwhile";
            }
            const entry = JSON.stringify({
                chat: msg.chat.id,
                msg: msg.reply_to_message.message_id,
            })
            bot.db.sadd(`chat${msg.chat.id}:quotes`, entry);
            bot.db.sadd(`chat${msg.reply_to_message.from.id}:quotes`, entry);
            return `Quote saved. Use /quote to retrieve a random quote.`;
        }
    });
    bot.register.command('quote', {
        fn: async msg => {
            let target = (await id.getTarget(msg) || msg.chat).id;
            
            while (true) {
                const rawEntry = await bot.db.srandmember(`chat${target}:quotes`);
                if (rawEntry) {
                    const entry = JSON.parse(rawEntry);
                    try {
                        return await bot.api.forwardMessage(msg.chat.id, entry.chat, entry.msg);
                    } catch (e) {
                        if (e.description === "Bad Request: message to forward not found") {
                            await bot.db.srem(`chat${target}:quotes`, rawEntry);
                        } else {
                            throw e;
                        }
                    }
                } else {
                    return msg.reply.text('No quotes. Reply to a message with /savequote first.');
                }
            }
        }
    });
};
