'use strict';

const MORSE = {'a':'.-','b':'-...','c':'-.-.','d':'-..','e':'.','f':'..-.','g':'--.','h':'....','i':'..','j':'.---','k':'-.-','l':'.-..','m':'--','n':'-.','o':'---','p':'.--.','q':'--.-','r':'.-.','s':'...','t':'-','u':'..-','v':'...-','w':'.--','x':'-..-','y':'-.--','z':'--..',' ':'/','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','0':'-----'};
const LEET = {"a":"4","b":"8","c":"¢","e":"3","f":"ƒ","g":"9","h":"#","i":"!","j":"]","l":"1","o":"0","q":"¶","r":"2","s":"5","t":"7","u":"µ","x":"%","y":"¥","z":"2"};

exports.init = (bot, prefs) => {

	bot.register.command('morse', {
        fn: msg => {
            return Array.from(msg.args.toLowerCase()).map(c => MORSE[c.toLowerCase()] || '').join(" ");
        }
    })

    bot.register.command('aesthetic', {
        fn: msg => {
        	if (!msg.args) return "Supply some text to receive an aesthetic response";
        	return (Array.from(msg.args).map(c => {const n = c.charCodeAt(0);return ((33 <= n && n <= 126) ? String.fromCharCode(n + 65248) : c);}).join(''));
        }
    })

    bot.register.command(['leetize','leetify','leet','1337'], {
        fn: msg => {
            if (!msg.args) {
                return "Supply some text to be `1337!ƒ!3d`";
            }
            return Array.from(msg.args).map(c => (c in LEET) ? LEET[c] : c.toLowerCase()).join('');
        }
    })

};
