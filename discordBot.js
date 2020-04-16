/**
 * DiscordBots "mainloop"
 * @param {object} app Master application container
 */

var discordBot = function(app) {

    var App         = app;
    var CommandMgr  = App.CommandMgr;
    var client      = App.client;
    var Translator  = App.Translator;

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    

    client.on('message', msg => {

        if(CommandMgr.parseCommand(msg))  { // check if message starts with
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
}

module.exports = discordBot;