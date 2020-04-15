const Discord = require('discord.js');
const client = new Discord.Client();
var translate = require('translation-google');


// variables
var discordBotToken =  'YOUR_DISCORD_BOT_TOKEN'; // your bot token from your discordapps bot page

var currentCommand  = undefined;
var currentArgs     = undefined;

// change to speak stuff
var randomMax       = 100;
var changeToSpeak   = 5;


function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Translator function
 * translates from Finland to Estonia
 * @constructor
 * @param {string} input - Finnish text to translate
 * @param {function} callback - The callback that handles the translated response.
 * 
 * @example
 *  Usage: translateFinToEstonia(messageFromChat, GetResultsCB)
 *  Callback: GetResultsCB(result)
 *  Example usage:
 *   translateFinToEstonia(currentArgs, function(result){ 
 *       msg.channel.send(result);
 *   });
 */
function translateFinToEstonia(input, callback) {
    translate(input, {from:"fi", to:'et'}).then(res => {
        callback(res.text);
    }).catch(err => {
        console.error(err);
    });
}

/** 
* roll some dice and check if random is greater than change to speak, then allow spam.
* @constructor
*/
function allowSpeak() {
    var random = Math.round(Math.random() * randomMax).toFixed(0);
    if(random  >= (randomMax - changeToSpeak)) {
        return true;
    }
    return false;
}

/** 
* checks if message is command
* @constructor
* @param string input - Raw msg content
*/
function checkIfCommand(input) {
    if(input.startsWith("!")) {
        const regex = /^!([a-zA-Z]*)\s?(.*)?/g;
        var regres = regex.exec(input);
       
        if(regres !== null) {
            // check if command and inputs are present and apply new values
            if(regres[1]) {
                currentCommand = regres[1];
            }
            else {
                currentCommand = undefined;
                return false;
            }
            if(regres[2]) {
                currentArgs = regres[2];
            }
            else {
                currentArgs = undefined;
                //return false;
            }
            
            // check if command and text are good
            if(currentCommand !== undefined) {
                return true;
            }
        }
    }
    return false;
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('message', msg => {

    if(checkIfCommand(msg.content)) {
        switch(currentCommand) {

            // Viro translation command
            case 'viro': 
                translateFinToEstonia(currentArgs, function(result){
                    msg.channel.send(result);
                });
            break;

            // sets change to speak value or views current
            case 'viroRNG': 

                var message = ""
                var translateMessage = true;

                if (currentArgs !== undefined) {
                    currentArgs = parseInt(currentArgs.trim());
                    
                    if(Number.isInteger(currentArgs)) { // check if parameter is number
                        currentArgs = Math.min(currentArgs, 100); // limit value to 100
                        currentArgs = Math.max(currentArgs, 0); // limit value to 0
                        changeToSpeak = currentArgs;
                        message = "Viron käännöksiä tulee nyt " + changeToSpeak + "% mahdollisuudella";
                    }
                    else {
                        translateMessage = false;
                        message = "Huom! Käyttö !viroRNG <0-100>";  
                    }
                }
                else { 
                    message = "Viron käännöksiä nyt " + changeToSpeak + "% mahdollisuudella";
                }
                if (translateMessage === true) { // translate message if needed

                    translateFinToEstonia(message, function(result){
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
        currentCommand  = undefined;
        currentArgs     = undefined;
    }
    
    else if(msg.author.bot === false) { // continue if message is not from bot user
        if(allowSpeak()) {
            translateFinToEstonia(msg.content, function(result){
                msg.channel.send(result);
            });
        } 
    }
});
  
client.login(discordBotToken);