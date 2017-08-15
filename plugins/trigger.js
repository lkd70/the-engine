'use strict'

const Rq = require('./requirements');

exports.init = (bot, prefs) => {
    bot.register.command('trigger', {
        help: "`/trigger <name>` -- summon replied-to message each time someone starts their message with #<name> hashtag.",
        fn: Rq.wrap(Rq.callerHasPermission('can_change_info'), (msg) => {
            const tag = msg.args.replace(/^#/, '').toLowerCase();
            if (!msg.reply_to_message) {
                return "Reply to a message you'd like to save as a trigger.";
            }
            if (!/^\w+$/.test(tag)) {
                return 'Trigger name can only contain letters, digits and underscore';
            }
            bot.db.hset(
                `chat${msg.chat.id}:triggers`,
                tag,
                JSON.stringify({
                    chat: msg.chat.id,
                    msg: msg.reply_to_message.message_id,
                }),
            );
            return `Trigger saved. Start message with #${tag} to summon that message.`;
        })
    });
    bot.register('text', async msg => {
        if (!msg.entities || msg.entities[0].type !== 'hashtag') {
            return;
        }
        const tag = msg.text.slice(1, msg.entities[0].length).toLowerCase()
        const rawEntry = await bot.db.hget(`chat${msg.chat.id}:triggers`, tag);
        if (rawEntry) {
            const entry = JSON.parse(rawEntry);
            try {
                await bot.api.forwardMessage(msg.chat.id, entry.chat, entry.msg);
            } catch (e) {
                if (e.description === "Bad Request: message to forward not found") {
                    bot.db.hdel(`chat${msg.chat.id}:triggers`, tag);
                } else {
                    throw e;
                }
            }
        }
    });
};
