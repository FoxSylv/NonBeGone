import PogObject from 'PogData';

var storage = new PogObject("NonBeGone", {
    levelMin: 100
});


register("chat", (message, event) => {
    var parts = message.split(" ");
    var level = parts[0].substring(1, parts[0].length - 1);

    if (level - storage.levelMin < 0 && Number.isInteger(parseInt(level))) {
        cancel(event);
    }
}).setCriteria("${message}");

register("command", (arg1, arg2) => {
    var subcommand = (arg1 === undefined ? "" : arg1.toLowerCase());
    switch(subcommand) {
        case "setmin":
            storage.levelMin = (Number.isInteger(parseInt(arg2)) ? arg2 : 0);
            storage.save();
            ChatLib.chat("&cYour new minimum chat level is &8[" + color(storage.levelMin) + storage.levelMin + "&8]");
            break;
        case "min":
            ChatLib.chat("&cYour minimum chat level is &8[" + color(storage.levelMin) + storage.levelMin + "&8]");
            break;
        default:
            ChatLib.chat("&b" + ChatLib.getChatBreak("-") + "&c/nbg min - Views your current minimum chat level\n&c/nbg setmin <level> - Sets your minimum chat level\n&b" + ChatLib.getChatBreak("-"));
    }
}).setName("nbg").setAliases("nonbegone", "nonsbegone");



/*
* Returns the Skyblock-appropriate color code for the given `level`.
*/
const LEVEL_COLORS = ["&7", "&f", "&a", "&9", "&5", "&6", "&d", "&b", "&c"];
function color(level) {
    var denom = Math.floor(level / 40);
    if (denom < 9 && denom >= 0) {
        return LEVEL_COLORS[denom];
    }
    return "&4";
}
