'use strict'

/* plugin manager */

const path = require('path')
const emoji = require('node-emoji')

let pluginList
let pluginSet
let bot

exports.disable = async (chatid, names) => {
    if (typeof names === 'string') {
        names = [names]
    }
    names = names.map(name => name.toLowerCase())
    for (var name of names) {
        if (name === 'plugins') {
            throw new Error("I won't disable myself")
        }
        if (!pluginSet.has(name)) {
            throw new Error(`Unknown plugin: ${name}`)
        }
    }
    return bot.db.sadd(`chat${chatid}:disabledPlugins`, names)
}

exports.enable = async (chatid, names) => {
    if (typeof names === 'string') {
        names = [names]
    }
    names = names.map(name => name.toLowerCase())
    for (var name of names) {
        if (!pluginSet.has(name)) {
            throw new Error(`Unknown plugin: ${name}`)
        }
    }
    return bot.db.srem(`chat${chatid}:disabledPlugins`, names)
}


exports.isDisabled = (chatid, name) => bot.db.sismember(`chat${chatid}:disabledPlugins`, name.toLowerCase())


exports.init = (bot_, prefs) => {
    bot = bot_

    pluginList = exports.list = bot.control.config.plugins
        .filter(plugin => !plugin.essential)
        .map(plugin => path.basename(plugin.path, path.extname(plugin.path)))
        .filter(name => name != 'plugins')
        .sort()

    pluginSet = exports.set = new Set(pluginList)

    const requiresPermission = (perm, fn) => fn // temporary, will be replaced with proper function

    bot.register.command('plugins', {
        fn: msg => {
            bot.db.pipeline(
                pluginList.map(name => ['sismember', `chat${msg.chat.id}:disabledPlugins`, name])
            ).exec()
            .map(([, disabled], i) => (disabled? emoji.get('x'): emoji.get('white_check_mark')) + pluginList[i])
            .then(array => msg.reply.text(array.join('\n')))
        }
    })


    bot.register.command('disable', {
        fn: requiresPermission('can_change_info', msg => {
            if (!msg.args) {
                return 'Give me name of a plugin to disable.'
            }
            const plugins = msg.args.split(/\s+/g)
            exports.disable(msg.chat.id, plugins)
                .then((number) => `${number} plugins disabled.`)
                .catch(e => e.message)
                .then(msg.reply.text)
            })
    })

    bot.register.command('enable', {
        fn: requiresPermission('can_change_info', msg => {
            if (!msg.args) {
                return 'Give me name of a plugin to enable.'
            }
            const plugins = msg.args.split(/\s+/g)
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
