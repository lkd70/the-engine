const { emojioneList } = require('emojione');

exports.shortToEmoji = new Map();
exports.emojiToShort = new Map();

Object.entries(emojioneList).sort().forEach(([baseShortname, properties]) => {
    const emoji = properties.uc_base.split('-')
        .map(cp => String.fromCodePoint(parseInt(cp, 16))).join('');

    let allShortnames = [baseShortname];
    allShortnames = allShortnames.concat(properties.shortnames);

    // Remove leading and trailing colon (e.g. ':smile:' -> 'smile')
    allShortnames = allShortnames.map(n => n.slice(1, -1));

    allShortnames.forEach(shortname => {
        exports.shortToEmoji.set(shortname, emoji);
    });

    exports.emojiToShort.set(emoji, baseShortname);
});

exports.get = name => exports.shortToEmoji.get(name);
