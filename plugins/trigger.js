'use strict'

exports.init = (bot, prefs) => {
    bot.register.command('trigger', {
        help: "`/trigger <name>` -- summon replied-to message each time someone starts their message with #<name> hashtag.",
        fn: (msg) => {
            const tag = msg.args.replace(/^#/, '').toLowerCase();
            console.log(tag);
            if (!/\w+/.test(tag)) {
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
        }
    });
    bot.register('text', async msg => {
        if (!msg.entities || msg.entities[0].type !== 'hashtag') {
            return;
        }
        const tag = msg.text.slice(1, msg.entities[0].length).toLowerCase()
        const rawEntry = await bot.db.hget(`chat${msg.chat.id}:triggers`, tag);
        if (rawEntry) {
            const entry = JSON.parse(rawEntry);
            bot.api.forwardMessage(msg.chat.id, entry.chat, entry.msg);
        }
    });
};
