'use strict';

const path = require('path')

let moduleList
let bot

exports.init = (bot, prefs) => {

    bot.register.command('ping', {

        fn: message => {

            return 'PONG!';

        }

    });

};