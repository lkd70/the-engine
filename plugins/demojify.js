'use strict'

const emoji = require('node-emoji')
const XRegExp = require('xregexp')

const demojify = exports.demojify = s => {
    Object.entries(emoji.emoji).forEach(([k, v]) => {
      let regex = XRegExp(XRegExp.escape(v), 'g')
      s = XRegExp.replace(s, regex, `:${k}:`)
    })

    return s
}

exports.init = (bot, prefs) => {
    bot.register.command('demojify', {
        fn: msg => demojify(msg.args || msg.reply_to_message.text)
    })
}
