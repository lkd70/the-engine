'use strict';

const Rq = require('./requirements');


const delbanPermissions = ['can_delete_messages', 'can_restrict_members'];

exports.init = (bot, prefs) => {
    help: [
        "Delete replied-to message and ban the user who sent it.",
    ].join('\n'),
    bot.register.command('delban', {
        fn: Rq.wrap(Rq.callerHasPermission(delbanPermissions), Rq.wrap(Rq.botHasPermission(delbanPermissions), async msg => {
            if (!msg.reply_to_message) {
                msg.tag("Reply to a message. I'll delete it and ban the person who sent it.");
                return;
            }
            try {
                await bot.api.kickChatMember(msg.chat.id, msg.reply_to_message.from.id);
            } catch (e) {
                msg.tag(e.description);
                return;
            }
            bot.api.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.api.deleteMessage(msg.chat.id, msg.message_id);
        })),
    });
};
