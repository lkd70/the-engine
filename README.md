# The Engine
A mattata-esque Telegram bot written in [Node.js](https://nodejs.org)

This bot is currently out of fuel, maybe one day development will continue.

### Powered by...
The Engine couldn't work without a few projects:
* [TeleBot](https://github.com/mullwar/telebot) - A Telegram Framework for [Node.js](https://nodejs.org).
* [ioredis](https://github.com/luin/ioredis) - A Redis client for [Node.js](https://nodejs.org).
* [Node-Emoji](https://www.npmjs.com/package/node-emoji) - Simple emoji support for [Node.js](https://nodejs.org) projects.

### Installation

The Engine requires [Node.js](https://nodejs.org) in order to run.
Download the project from our git & install dependencies:
```sh
$ git clone https://github.com/lkd70/the-engine.git
$ cd the-engine
$ npm install
$ node bot
```

### Configuration
In order to use The Engine, you must first configure the bot.
Configuration is handled by the `config.json` file.

Example `config.json`:

```json
{
    "auth_token": "YOUR_API_TOKEN",
    "db": {},
    "plugins": [
        { "path": "./plugins/plugins", "essential": true },
        { "path": "./plugins/sayhi" },
        { "path": "./plugins/ping"  },
        { "path": "./plugins/help"  },
        { "path": "./plugins/quote" },
        { "path": "./plugins/id"    },
        { "path": "./plugins/trigger"  },
        { "path": "./plugins/unformat" },
        { "path": "./plugins/demojify" },
        { "path": "./plugins/echo"     }
    ]
}
``` 

| Element | Example Data | Description |
| ----- | ----- | ----- |
| auth_token | 123456789:a1B2c3D4e5F6g7H8i9JkLmNoPqRsTuVwXyZ | Your bots token as provided by @BotFather |
| db | {} | DB settings, following the ioredis format |
| plugins | { "path": "./plugins/plugins", "essential": true },</br>{ "path": "./plugins/sayhi" },</br>{ "path": "./plugins/getid" }| Plugins you wish the bot to load | 


### Plugins
Listed below are the official plugins that are maintained by the The Engine team.
To learn more about the plugins, read their corresponding README files.

| Plugins | README |
| ------ | ------ |
| demojify | [demojify.js](docs/plugins/demojify.md) |
| echo | [echo.js](docs/plugins/echo.md) |
| help | [help.js](docs/plugins/help.md) |
| id | [id.js](docs/plugins/id.md) |
| jsondump | [jsondump.js](docs/plugins/jsondump.md) |
| ping | [ping.js](docs/plugins/ping.md) |
| plugins | [plugins.js](docs/plugins/plugins.md) |
| quote | [quote.js](docs/plugins/quote.md) |
| sayhi | [sayhi.js](docs/plugins/sayhi.md) |
| trigger | [trigger.js](docs/plugins/trigger.md) |
| unformat | [unformat.js](docs/plugins/unformat.md) |

### Commands
These are the stock commands provided by the official plugins

| Command | Plugin | Description |
| ------ | ------ | ------ |
| /demojify | [demojify](docs/plguins/demojify.md#demojify) | Returns the word representation of the given Emoji(s) |
| /echo | [echo](docs/plguins/echo.md#echo) | Returns the given text with additional formatting |
| /help | [help](docs/plugins/help.md#help) | Returns help information about the given `/command` |
| /id |[id](docs/plugins/id.md#id) | Returns the ID of a given @username |
| /jsondump |[jsondump](docs/plugins/jsondump.md#jsondump) | Returns a JSON formatted object dump of the message |
| /ping | [ping](docs/plugins/ping.md#ping) | Returns "PONG!" (with any luck...) |
| /plugins | [plugins](docs/plugins/plugins.md#plugins) | Returns a list of available plugins and their active status |
| /enable | [plugins](docs/plugins/plugins.md#plugins) | Enables the named plugin(s) |
| /disable | [plugins](docs/plugins/plugins.md#plugins) | Disables the named plugin(s) |
| /commands | [plugins](docs/plugins/plugins.md#plugins) | Lists all available `/commands` |
| /savequote | [quote](docs/plugins/quote.md#quote) | Saves the replied to message, can be called upon using `/quote` |
| /quote | [quote](docs/plugins/quote.md#quote) | Returns a random quite from the replied to user |
| /sayhi | [sayhi](docs/plugins/sayhi.md#sayhi) | Returns a 'hi' message through all methods available |
| /trigger | [trigger](docs/plugins/trigger.md#trigger) | Creates a `#trigger` allowing custom responses to specified hash-tags | 
| /tomd /unformat | [unformat](docs/plugins/unformat.md#unformat) | Unformats the given markdown message |
| /tohtml | [unformat](docs/plugins/unformat.md#unformat) | Unformats the given markdown to HTML |
| /chatid | [getid](docs/plugins/ping.md#getid) | Returns the ID of the current chat |
| /myid | [getid](docs/plugins/ping.md#getid) | Returns your user ID |

### License

[BSD 3-Clause License](LICENSE)

### The Team

The Engine consists of several skilled developers (and Matt), all working together efficiently.

| Name | Telegram | Role |
| ------ | ------ | ------ |
| GingerPlusPlus | [@GingerPlusPlus](https://t.me/GingerPlusPlus) | Developer & innovator |
| Kuvam | [@snarkie](https://t.me/snarkie) | Developer & innovator |
| LKD70 | [@LKD70](https://t.me/LKD70) | Documenter & innovator |
| Matt | [@wrxck0](https://t.me/wrxck0) | Leech |
| nyuszika7h | [@nyuszika7h](https://t.me/nyuszika7h) | Developer & innovator |
