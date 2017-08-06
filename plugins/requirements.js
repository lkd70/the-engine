'use strict'

let bot

const castArray = (value) => {
    if (Array.isArray(value)) {
        return value
    } else {
        return [value]
    }
}

const curry = (fn, arity=fn.length) => {
    const wrapped = function() {
        if (arguments.length < arity) {
            return wrapped.bind(this, ...arguments)
        } else {
            return fn.apply(this, arguments)
        }
    }
    Object.defineProperty(wrapped, 'name', {value: `curry(${fn.name})`})
    Object.defineProperty(wrapped, 'length', {value: arity})
    return wrapped
}


exports.either = (rqs) => ({
    check: async (msg) => {
        for (const rq of rqs) {
            if (await rq.check(msg)) {
                return true
            }
        }
        return false
    },
    failMessage: () => {
        const failMessages = rqs.map(rq => rq.failMessage())
        return joinOptions('or', failMessages)
    }
})


exports.wrap = curry(async function(rq, fn, msg) {
    if (await rq.check(msg)) {
        msg.tag(fn.call(this, msg))
    } else {
        msg.reply.text(`You need to ${rq.failMessage()} in order to use this command!`)
    }
})


const joinOptions = exports.joinOptions = curry((sep, array) => {
    if (array.length < 2) {
        return array[0]
    }
    array = Object.create(array)
    const last = array.pop()
    return array.join(', ') + ` ${sep} ` + last
    return `${array.join(', ')} ${sep} ${last}`
})


const checks = exports.checks = {
    permission: async (chat, userid, perms) => {
        if (chat.type == 'private' || chat.all_members_are_administrators) {
            return true
        }
        if (typeof userid === 'object') {
            userid = userid.id
        }
        const member = (await bot.api.getChatMember(chat.id, userid)).result
        return member.status === 'creator' || castArray(perms).every(perm => member[perm.toLowerCase()])
    },

    callerHasPermission: curry((perms, msg) => checks.permission(msg.chat, msg.from, perms)),
    botHasPermission: curry((perms, msg) => checks.permission(msg.chat, bot.profile, perms)),
}


exports.callerHasPermission = (perms) => ({
    check: checks.callerHasPermission(perms),
    failMessage: () => `have ${joinOptions('and', castArray(perms))} permission(s)`
})

exports.botHasPermission = (perms) => ({
    check: checks.botHasPermission(perms),
    failMessage: () => `give me the ${joinOptions('and', castArray(perms))} permission(s)`
})

exports.inChatType = (types) => ({
    check: (msg) => castArray(types).includes(msg.chat.type),
    failMessage: () => `be in a ${joinOptions('or', castArray(types))}`
})


exports.init = (bot_, prefs) => {
    bot = bot_
}
