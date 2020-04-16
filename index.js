const Discord       = require('discord.js');
const client        = new Discord.Client();
const Translator    = require('./modules/translator.js');
let CommandManager  = require('./modules/CommandManager.js');

// variables
require ('custom-env').env('staging');

var discordBotToken = process.env.DISCORD_TOKEN; // your bot token from your discordapps bot page
var CommandMgr      = new CommandManager("./../BotCommands.js"); // Manager for bot commands

/**
* client is ready
* @description Discord bot is connected and ready.
*/
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
/**
* client gets message
* @description Bot gets message in channel and checks if command or speak
*/
client.on('message', msg => {

    if(CommandMgr.parseCommand(msg))  { // check if message starts with !
        CommandMgr.execCommand();
    }

    else if(msg.author.bot === false) { // continue if message is not from bot user
        if(Translator.allowSpeak()) {
            Translator.translateFinToEstonia(msg.content, result => {
                msg.channel.send(result);
            }); 
        } 
    }
});
  
// Start discord bot
client.login(discordBotToken);
