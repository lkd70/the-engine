'use strict';

const id = require('./id');
const Rq = require('./requirements');

let bot;

const ifInSupergroup = Rq.wrap(Rq.inChatType('supergroup'));
const ifCallerCanPromote = Rq.wrap(Rq.callerHasPermission('can_promote_members'));
const ifBotCanPromote = Rq.wrap(Rq.botHasPermission('can_promote_members'));


const promote = exports.promote = (chatid, userid) =>
    bot.api.promoteChatMember(chatid, userid, {
        canRestrictMembers: true,
        canDeleteMessages: true,
    });

const demote = exports.demote = (chatid, userid) =>
    bot.api.promoteChatMember(chatid, userid, {
        canChangeInfo: false,
        canPostMessages: false,
        canEditMessages: false,
        canDeleteMessages: false,
        canInviteUsers: false,
        canRestrictMembers: false,
        canPinMessages: false,
        canPromoteMembers: false,
    });


const createHandler = (actionName, fn) =>
    ifCallerCanPromote(ifBotCanPromote((msg) => {
        id.getTarget(msg)
        .then(user => {
            if (!user) {
                return `Reply to someone you wish to ${actionName}. Alternatively, pass their @username as an argument.`;
            }
            return fn(msg.chat.id, user.id)
                .then (() => 'Done.')
                .catch(e => e.description);
        })
        .catch(String)
        .then(msg.tag);
    }));


exports.init = (bot_, prefs) => {
    bot = bot_;

    bot.register.command('promote', {
        fn: ifInSupergroup(createHandler('promote to moderator', promote))
    });

    bot.register.command('demote', {
        fn: ifInSupergroup(createHandler('demote to unprivileged member', demote))
    });
}
