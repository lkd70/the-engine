'use strict';

exports.init = (bot, prefs) => {

    bot.register.command(['spongebob','spongify','mock'], {
        fn: msg => {
            if (!msg.args) {
                return "ProVidE SoME TExt, duDE!!";
            }

            bot.api.sendPhoto(msg.chat.id, 'https://i.imgflip.com/1p4jje.jpg', {
                caption: Array.from(msg.args).map(c => ((Math.random()<.6) ? c.toLowerCase() : c.toUpperCase())).join(''),
                reply: msg.message_id
            });
        }
    });

    bot.register.command(['belikebill','blb'], {
        fn: msg => {
            if (!msg.args) {
                return "Please provide some text...";
            }

            bot.api.sendPhoto(msg.chat.id, 'http://belikebill.azurewebsites.net/billgen-API.php?text=' + encodeURIComponent(msg.args), {
                caption: "Be like Bill...",
                reply: msg.message_id
            });
        }
    });

    bot.register.command(['cat'], {
        fn: msg => {
            bot.api.sendPhoto(msg.chat.id, 'http://thecatapi.com/api/images/get?type=jpg&size=small&ts=' + Date.now(), {
                caption: "Meow!",
                reply: msg.message_id
            });
        }
    });

    bot.register.command(['chuck'], {
        fn: msg => {
            http.get('http://api.icndb.com/jokes/random', function(res) {
                var content = '';

                res.on('data', function(chunk) {
                    body += chunk;
                });

                res.on('end', function() {
                    var response = JSON.parse('body');
                    if (response['type'] = "success") {
                        return response['value']['joke'];
                    } else {
                        return "Failed to fetch a joke.";
                    }
                });
            }).on('error', function(e) {
                return "An API error occured: " + e;
            });
        }
    });

    bot.register.command(['coinflip','flip'], {
        fn: () => "The coin landed on " + ((Math.random()>=0.5) ? "Heads" : "Tails") + "!"
    });

};
