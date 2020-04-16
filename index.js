const Discord       = require('discord.js');
const Translator    = require('./modules/translator.js');
let CommandManager  = require('./modules/CommandManager.js');

require ('custom-env').env('staging');

// Initialize CommandManager
var App = {
    client:     new Discord.Client(),
    CommandMgr: new CommandManager('./../BotCommands.js'),
    Translator: Translator,
};

var discordBot = require('./discordBot')(App);

// Start discord bot
App.client.login(process.env.DISCORD_TOKEN);