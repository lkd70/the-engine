'use strict'

/* Module manager */

const path = require('path')
const emoji = require('node-emoji')

let moduleList
let moduleSet
let bot

exports.disable = async (chatid, names) => {
    if (typeof names === 'string') {
        names = [names]
    }
    names = names.map(name => name.toLowerCase())
    for (var name of names) {
        if (name === 'modules') {
            throw new Error("I won't disable myself")
        }
        if (!moduleSet.has(name)) {
            throw new Error(`Unknown module: ${name}`)
        }
    }
    return bot.db.sadd(`chat${chatid}:disabledModules`, names)
}

exports.enable = async (chatid, names) => {
    if (typeof names === 'string') {
        names = [names]
    }
    names = names.map(name => name.toLowerCase())
    for (var name of names) {
        if (!moduleSet.has(name)) {
            throw new Error(`Unknown module: ${name}`)
        }
    }
    return bot.db.srem(`chat${chatid}:disabledModules`, name)
}


exports.isDisabled = (chatid, name) => bot.db.sismember(`chat${chatid}:disabledModules`, name.toLowerCase())


exports.init = (bot_, prefs) => {
    bot = bot_

    moduleList = exports.moduleList = bot.control.config.modules
        .filter(module => !module.essential)
        .map(module => path.basename(module.path, path.extname(module.path)))
        .filter(name => name != 'modules')
        .sort()

    moduleSet = exports.moduleSet = new Set(moduleList)

    const requiresPermission = (perm, fn) => fn // temporary, will be replaced with proper function

    bot.register.command('modules', {
        fn: msg => {
            bot.db.pipeline(
                moduleList.map(name => ['sismember', `chat${msg.chat.id}:disabledModules`, name])
            ).exec()
            .map(([, disabled], i) => (disabled? emoji.get('x'): emoji.get('white_check_mark')) + moduleList[i])
            .then(array => msg.reply.text(array.join('\n')))
        }
    })


    bot.register.command('disable', {
        fn: requiresPermission('can_change_info', msg => {
            const plugins = msg.text.split(/\s+/g).slice(1)
            if (plugins.length === 0) return 'Give me name of a module to disable.'
            exports.disable(msg.chat.id, plugins)
                .then((number) => `${number} plugins disabled.`)
                .catch(e => e.message)
                .then(msg.reply.text)
            })
    })

    bot.register.command('enable', {
        fn: requiresPermission('can_change_info', msg => {
            const plugins = msg.text.split(/\s+/g).slice(1)
            if (plugins.length === 0) return 'Give me name of a module to enable.'
            exports.enable(msg.chat.id, plugins)
                .then((number) => `${number} plugins enabled.`)
                .catch(e => e.message)
                .then(msg.reply.text)
            })
    })

    bot.register.command('commands', {

        fn: message => {
            var reply = "";
            for (var key in bot.functions) {
                if (bot.functions.hasOwnProperty(key)) {
                    reply += "`/"+key+"`";
                    if ("help" in bot.functions[key]) reply += " - " + bot.functions[key].help;
                    reply += "\n";

                }
            }
            bot.api.sendMessage(message.chat.id, reply, {
                reply: message.message_id,
                parseMode: "markdown"
            });
        }
    });

    Object.freeze(exports)
}
