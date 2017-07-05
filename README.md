# nodeMattata
A mattata-esque Telegram bot written in NodeJS

### Powered by...
nodeMattata couldn't work without a few projects:
* [TeleBot](https://github.com/mullwar/telebot) - A Telegram Framework for NodeJS
* [ioredis](https://github.com/luin/ioredis) - A Redis client for NodeJS
* [Node-Emoji](https://www.npmjs.com/package/node-emoji) - Simple emoji support for node.js projects

### Installation

nodeMattata requires [Node.js](https://nodejs.org/) in order to run.
Download the project from our git & install dependancies:
```sh
$ git clone https://github.com/lkd70/nodeMattata.git
$ cd nodeMattata
$ npm install
$ node bot
```

### Configuration
In order to use nodeMattata, you must first configure the bot.
Configuration is handled by the `config.json` file.

Example `config.json`:

```json
{
    "auth_token": "YOUR_API_TOKEN",
    "db": {},
    "modules": [
        { "path": "./bot_modules/modules", "essential": true },
        { "path": "./bot_modules/sayhi" },
        { "path": "./bot_modules/getid" }
    ]
}
``` 

| Element | Example Data | Description |
| ----- | ----- | ----- |
| auth_token | 123456789:a1B2c3D4e5F6g7H8i9JkLmNoPqRsTuVwXyZ | Your bots token as provided by @BotFather |
| db | {} | |
| modules | { "path": "./bot_modules/modules", "essential": true },</br>{ "path": "./bot_modules/sayhi" },</br>{ "path": "./bot_modules/getid" }| Modules you wish the bot to load | 


### Modules
Listed below are the official moduals that are maintained by the nodeMattata team.
To learn more about the moduals, read their corresponding readme files.

| Module | README |
| ------ | ------ |
| modules | [modules.md](docs/modules/modules.md) |
| getid | [getid.md](docs/modules/ping.md) |
| sayhi | [sayhi.md](docs/modules/help.md) |

### Commands
These are the stock commands provided by the official modules

| Command | Module | Description |
| ------ | ------ | ------ |
| /modules | [modules](docs/modules/modules.md) | Returns a list of modules and their active state |
| /enable | [modules](docs/modules/modules.md) | Enables the named module(s) |
| /disable | [modules](docs/modules/modules.md) | Disables the named module(s) |
| /chatid | [getid](docs/modules/ping.md) | Returns the ID of the current chat |
| /myid | [getid](docs/modules/ping.md) | Returns your user ID |
| /sayhi | [sayhi](docs/modules/help.md) | Returns a 'hi' message through all methods available |

### License

[BSD 3-Clause License](LICENSE)

### The Team

nodeMattata consists of several skilled developers (and Matt), all working together efficiently.

| Name | Telegram | Role |
| ------ | ------ | ------ |
| GingerPlusPlus | [@GingerPlusPlus](https://t.me/GingerPlusPlus) | Developer & innovator |
| Kuvam | [@snarkie](https://t.me/snarkie) | Developer & innovator |
| LKD70 | [@LKD70](https://t.me/LKD70) | Documentor & innovator |
| Matt | [@wrxck0](https://t.me/wrxck0) | Leech |
| nyuszika7h | [@nyuszika7h](https://t.me/nyuszika7h) | innovator |
