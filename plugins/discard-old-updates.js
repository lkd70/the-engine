'use strict';

// makes the bot discard updates that happened before bot was running
// provided that we're using polling, not webhook
exports.init = bot => {bot.api.updateId = -1;};
