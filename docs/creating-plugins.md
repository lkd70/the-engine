# Creating plugins

0. If you want to create plugin manager, don't, not yet, I'm planning a rework there.
1. Create new Node module (ie. file) (or a directory with index.js, if one file is not enough), anywhere on your filesystem. Its name cannot contain uppercase letters and whitespace characters, otherwise `plugins` won't be able to disable it.
2. Add it to `plugins` section in your config file, so the bot will actually run it. Plugins are loaded and initialized in the order in which they're specified.
3. Export `init` function from yor module. You can export other things for other modules to use, too.
4. `init` is called to initialize your module, with 2 arguments, `bot` object, and `prefs` object, which is the `prefs` value passed in the entry in `plugins`, and it's designed to be an object holding configuration for your module. Note that if you don't specify it in config, it'll be `undefined`. I'll describe what's in `bot` object in a minute.
5. Note that if a plugin throws while requiring or `init`ing, the whole bot won't crash, rest of the plugins will run fine (if they don't depend on the crashed module). You'll see the error in the console, and `/plugins` will mark the module with ⚠️.
6. Use a reloader and a debugger, it'll make bugfixing easier, and development faster. I personally installed "Node.js Inspector Manager (NiM)" in my Chrome (should work in Chromium too) and run  `nodemon --inspect`, which causes the code to auto-reload on save and auto opens Chrome debugger attached to the bot, and reloads it if neccesary. It's beautiful. It could only get better if the debugger ran directly in my text editor. Keep in mind tho, this is JS, there is no one right way, whatever works for you.
7. You can look at the code of other plugins for examples. You can read code of the core (`bot.js`) too, to better understand how everything works. We try to keep the code as simple as possible, but not at the expense of functionality.

Ok, now, finally, what's in the `bot` object?

## `bot.register.command` and `bot.register`

First things you'll need. `bot.register.command` (which may get aliased into `bot.registerCommand` in the future) allows you to add commands. First argument is command or array of commands (without leading slash), second argument is an *object* (**not** a function!) with `fn` property, which is an function which will get called when somebody types the command, with single argument, `message` (or `msg`), augumented with some stuff. Take a look at `msg.args` for example.

The second argument, the object, can contain other stuff too, like `help` property, which will be used by `/help` as help message. We have ideas for other properties there, but we haven't implemented them yet.

`bot.register` allows you to attach listers almost directly to the Telebot instance. Almost, because it adds checking if message was not marked as fully processed, and if the plugin is not disabled. Use `bot.api.on` instead if and only if you wish to bypass those checks. `bot.register` takes 2 arguments, which would be valid arguments for `bot.api.on` too.

Note that you have to call these function synchronously, you cannot wait for any non-blocking operation, after `init` returns, core considers plugin fully loaded and proceeds to other plugins. After all plugins are loaded, `bot.register` is set to `null`.

## `bot.db`

`ioredis` instance, providing access to the redis database. Keep in mind that this is shared across all plugins, so don't do anything that'd break stuff for them, like calling subscribe or changing database number using select. If you need to do those, do it on `.duplicate()` of the instance.

## `bot.api`

Telebot instance. Enough said.

## `bot.control.config`

Main config, as object (ie. parsed, not left as string).

There may be other stuff there, consider it private, it may change at any time without major release or warning, use at your own risk.
