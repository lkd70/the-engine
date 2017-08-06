'use strict';

const {kick} = require('./ban');
const Rq = require('./requirements');

exports.init = (bot, prefs) => {
    bot.register('newChatMembers', async msg => {
        const bots = msg.new_chat_members.filter(user => /bot$/i.test(user.username));
        if (bots.length === 0) {
            return;
        }
        const member = (await bot.api.getChatMember(msg.chat.id, msg.from.id)).result;
        if (member.status === 'administrator' || member.status === 'creator') {
            return;
        }

        if (!await Rq.checks.botHasPermission('can_restrict_members', msg)) {
            msg.reply.text("Antibot is enabled, but I don't have sufficient permissions to kick those new bots.");
            return;
        }

        for (const bot of bots) {
            kick(msg.chat.id, bot.id);
        }
        const usernames = bots.map(bot => '@' + bot.username);
        msg.reply.text(`Kicked ${Rq.joinOptions('and', usernames)} because antibot is enabled!`)
    });
}
