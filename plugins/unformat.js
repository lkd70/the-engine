'use strict'

const replace = (s, from, length, replacement) =>
    s.slice(0, from) + replacement + s.slice(from + length)

const escapeHtml = exports.escapeHtml = (unsafe) =>
    unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")


function* reversed(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        yield arr[i]
    }
}


const tomd = exports.tomd = exports.unformat = (msg) => {
    let text = msg.text
    for (const {type, offset, length, url} of reversed(msg.entities || [])) {
        const original = msg.text.slice(offset, offset + length)
        switch (type) {
            case 'bold':
                text = replace(text, offset, length, `*${original}*`)
                break
            case 'italic':
                text = replace(text, offset, length, `_${original}_`)
                break
            case 'code':
                text = replace(text, offset, length, `\`${original}\``)
                break
            case 'pre':
                text = replace(text, offset, length, "```" + original + "```")
                break
            case 'text_link':
                text = replace(text, offset, length, `[${original}](${url})`)
                break
        }
    }
    return text
}

const tohtml = exports.tohtml = (msg) => {
    let text = msg.text
    for (const {type, offset, length, url} of reversed(msg.entities || [])) {
        const original = escapeHtml(msg.text.slice(offset, offset + length))
        const escapedUrl = url? escapeHtml(url): null
        switch (type) {
            case 'bold':
                text = replace(text, offset, length, `<b>${original}</b>`)
                break
            case 'italic':
                text = replace(text, offset, length, `<i>${original}</i>`)
                break
            case 'code':
                text = replace(text, offset, length, `<code>${original}</code>`)
                break
            case 'pre':
                text = replace(text, offset, length, `<pre>${original}</pre>`)
                break
            case 'text_link':
                text = replace(text, offset, length, `<a href="${escapedUrl}">${original}]</a>`)
                break
        }
    }
    return text
}

exports.init = (bot, prefs) => {
    bot.register.command(['tomd', 'unformat'], {
        fn: msg => {
            if (!msg.reply_to_message) {
                return "Reply to a message you'd like to unformat to Markdown."
            }
            return tomd(msg.reply_to_message)
        },
    })
    bot.register.command('tohtml', {
        fn: msg => {
            if (!msg.reply_to_message) {
                return "Reply to a message you'd like to unformat to HTML."
            }
            return tohtml(msg.reply_to_message)
        },
    })
}
