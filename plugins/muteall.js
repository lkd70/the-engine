'use strict';

const ms = require('ms');

const Rq = require('./requirements');

let bot;

const tempmute = exports.tempmute = (chatid, userid, untilDate) =>
    bot.api.restrictChatMember(chatid, userid, {
        canSendMessages: false,
        untilDate,
    });

const inSupergoup = Rq.wrap(Rq.inChatType('supergroup'));
const callerHasNecessaryPermissions = Rq.wrap(Rq.callerHasPermission(['can_restrict_members', 'can_delete_messages', 'can_change_info']));
const botHasNecessaryPermissions = Rq.wrap(Rq.botHasPermission(['can_restrict_members', 'can_delete_messages']));

const endMuteMessage = "Speaking won't mute you anymore, people who got muted will be able to speak in few minutes.";

exports.init = (bot_, prefs={}) => {
    bot = bot_

    const MAX_DURATION = ms(prefs.maxTime || '30 minutes');
    // const MAX_DURATION = ms(prefs.maxTime || '3 days');
    const MIN_DURATION = ms(prefs.minTime ||  '5 minutes');

    const MAX_DURATION_STRING = ms(MAX_DURATION, { long: true });
    const MIN_DURATION_STRING = ms(MIN_DURATION, { long: true });

    bot.register.command('muteall', {
        fn: inSupergoup(callerHasNecessaryPermissions(botHasNecessaryPermissions(msg => {
            if (!msg.args) {
                return 'You have to specify a duration.';
            }
            const duration = ms(msg.args);
            if (duration === undefined) {
                return 'Invalid duration specified.';
            }
            const durationString = ms(duration, { long: true });
            if (duration > MAX_DURATION) {
                return `Duration too long (${durationString}), maximum is ${MAX_DURATION_STRING}.`;
            }
            if (duration < MIN_DURATION) {
                return `Duration too short (${durationString}), minimum is ${MIN_DURATION_STRING}.`;
            }
            const object = { until: msg.date + Math.floor(duration / 1000) };
            bot.db.hset('mutedChats', msg.chat.id, JSON.stringify(object));
            return `Muted everyone except admins for ${durationString}. /unmuteall to reverse.`;
        })))
    })

    bot.register.command('unmuteall', {
        fn: inSupergoup(callerHasNecessaryPermissions(botHasNecessaryPermissions(msg => {
            bot.db.hdel('mutedChats', msg.chat.id);
            return endMuteMessage;
        })))
    })

    bot.register('*', async msg => {
        if (msg.chat.type !== 'supergroup') {
            return;
        }

        const strUntil = await bot.db.hget('mutedChats', msg.chat.id);
        if (!strUntil) {
            return;
        }

        const {until} = JSON.parse(strUntil);

        if (msg.date > until) {
            bot.db.hdel('mutedChats', msg.chat.id);
            msg.reply.text(endMuteMessage);
            return;
        }

        const {status} = (await bot.api.getChatMember(msg.chat.id, msg.from.id)).result;
        if (status === 'creator' || status === 'administrator') {
            return;
        }

        tempmute(msg.chat.id, msg.from.id, Math.max(until, msg.date + 300));
        bot.api.deleteMessage(msg.chat.id, msg.message_id);
        /* TODO: store muted people in list, set or hash
           so that they can be immiedetly unmuted on calling /unmuteall.
           When that happens, lenghten max duration time. */
    })
}
