'use strict'

const emoji = require('node-emoji')

exports.init = (bot, prefs) => {
    bot.register.command('emojify', {
        fn: msg => emoji.emojify(msg.args)
    })
    try {
        const emojiRegex = require('emoji-regex')()
        const demojify = exports.demojify = text => text.replace(emojiRegex, char => `:${emoji.which(char)}:`)
        bot.register.command('demojify', {
            fn: msg => demojify(msg.args || msg.reply_to_message.text)
        })
    } catch (e) {
        console.error("emoji-regex module not found, /demojify and emojify.demojify won't be available")
    }
}
