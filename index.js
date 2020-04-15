const Discord   = require('discord.js');
const client    = new Discord.Client();
var translate   = require('translation-google');
var Translator  = require('./modules/translator.js');

// variables
var discordBotToken =  'YOUR_DISCORD_BOT_TOKEN_HERE'; // your bot token from your discordapps bot page

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('message', msg => {

    if(Translator.checkIfCommand(msg.content))  {

        switch(Translator.currentCommand) {
        
            // Viro translation command
            case 'viro': 
                Translator.translateFinToEstonia(currentArgs, function(result){
                    msg.channel.send(result);
                });
            break;

            // sets change to speak value or views current
            case 'viroRNG': 
                var message = "";
                var translateMessage = true;

                if (Translator.currentArgs !== undefined) {
                    if(Number.isInteger(parseInt(Translator.currentArgs))) { // check if parameter is number
                        Translator.currentArgs = Math.min(Translator.currentArgs, 100); // limit value to 100
                        Translator.currentArgs = Math.max(Translator.currentArgs, 0); // limit value to 0
                        Translator.changeToSpeak = Translator.currentArgs;
                        message = "Viron käännöksiä tulee nyt " + Translator.changeToSpeak + "% mahdollisuudella";
                    }
                    else {
                        translateMessage = false;
                        message = "Huom! Käyttö !viroRNG <0-100>";  
                    }
                }
                else { 
                    message = "Viron käännöksiä nyt " + Translator.changeToSpeak + "% mahdollisuudella";
                }

                if (translateMessage === true) { // translate message if needed
                   
                    Translator.translateFinToEstonia(message, function(result){
                        msg.channel.send(result);
                    });
                }
                else {
                    msg.channel.send(message); // send message to channel
                }
                
            break;

            default:
            break;
        }
       
        // reset current command and arguments
        Translator.currentCommand  = undefined;
        Translator.currentArgs     = undefined;
    }
    
    else if(msg.author.bot === false) { // continue if message is not from bot user
        if(Translator.allowSpeak()) {
            Translator.translateFinToEstonia(msg.content, function(result){
                msg.channel.send(result);
            });
        } 
    }
});
  
client.login(discordBotToken);