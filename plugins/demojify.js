'use strict';

const XRegExp = require('xregexp');

const emoji = require('../emoji');

const emojiReplacements = Array.from(emoji.emojiToShort.entries()).map(([emoji, shortname]) =>
    [XRegExp(XRegExp.escape(emoji), 'g'), shortname]);

const demojify = exports.demojify = text => XRegExp.replaceEach(text, emojiReplacements);

exports.init = (bot, prefs) => {
    bot.register.command('demojify', {
        fn: msg => {
            if (!(msg.args || msg.reply_to_message && msg.reply_to_message.text)) {
                return 'Pass some text to demojify, or reply to a text message.';
            }
            return demojify(msg.args || msg.reply_to_message.text);
        }
    });
};
