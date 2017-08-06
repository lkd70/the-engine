'use strict';

const id = require('./id');
const Rq = require('./requirements');

let bot;

const kick = exports.kick = async (chatid, userid) =>
    bot.api.kickChatMember(chatid, userid, {untilDate: Math.floor(Date.now() / 1000) + 300});

const mute = exports.mute = async (chatid, userid) =>
    bot.api.restrictChatMember(chatid, userid, {canSendMessages: false});

const unmute = exports.unmute = async (chatid, userid) =>
    bot.api.restrictChatMember(chatid, userid, {
        canSendMessages: true,
        canSendMediaMessages: true,
        canSendOtherMessages: true,
        canAddWebPagePreviews: true,
    });


const ifInSupergroup = Rq.wrap(Rq.inChatType('supergroup'));
const ifCallerCanRestrict = Rq.wrap(Rq.callerHasPermission('can_restrict_members'));
const ifBotCanRestrict = Rq.wrap(Rq.botHasPermission('can_restrict_members'));


const resolve = async username => {
    const user = await id.resolve(username);
    if (user) {
        return user;
    } else {
        throw new Error(`Failed to resolve ${username}`);
    }
}

const getTargets = async (msg) => {
    const splitted = msg.args.split(/\s+/g);
    if (splitted.length >= 2) {
        return splitted.map(resolve);
    }
    if (!msg.args && msg.reply_to_message && msg.reply_to_message.new_chat_members) {
        return msg.reply_to_message.new_chat_members;
    }
    const target = await id.getTarget(msg);
    if (target) {
        return [target];
    }
    return [];
};

const formatUser = (user) => {
    if (user.username) {
        return '@' + user.username;
    } else {
        return user.id;
    }
}

const createHandler = (actionName, actionNameDone, fn) =>
    ifCallerCanRestrict(ifBotCanRestrict((msg) => {
        getTargets(msg)
        .then(users => {
            if (users.length === 0) {
                return `Reply to someone you wish to ${actionName}. Alternatively, pass their @username as an argument.`;
            }
            const promises = users.map(async userPromise => {
                let user;
                try {
                    user = await userPromise;
                } catch (e) {
                    return e.message;
                }

                try {
                    await fn(msg.chat.id, user.id);
                    return `${actionNameDone} ${formatUser(user)}`;
                } catch (e) {
                    return `${e.description} (${formatUser(user)})`;
                }
            });
            return Promise.all(promises).then(arr => arr.join('\n'));
        })
        .catch(String)
        .then(msg.tag);
    }));


exports.init = (bot_, prefs) => {
    bot = bot_
    bot.register.command('ban', {
        fn: createHandler('ban', 'Banned', bot.api.kickChatMember.bind(bot.api))
    });

    bot.register.command('unban', {
        fn: ifInSupergroup(createHandler('unban', 'Unbanned', bot.api.unbanChatMember.bind(bot.api)))
    });

    bot.register.command('kick', {
        fn: createHandler('kick', 'Kicked', kick)
    });

    bot.register.command('mute', {
        fn: ifInSupergroup(createHandler('mute', 'Muted', mute))
    });

    bot.register.command('unmute', {
        fn: ifInSupergroup(createHandler('unmute', 'Unmuted', unmute))
    });
};
