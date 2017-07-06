'use strict'

const emoji = require('node-emoji')
const emojiRegex = require('emoji-regex')()

const demojify = exports.demojify = text => text.replace(emojiRegex, char => `:${emoji.which(char)}:`)

exports.init = (bot, prefs) => {
    bot.register.command('demojify', {
        fn: msg => demojify(msg.args || msg.reply_to_message.text)
    })
}
