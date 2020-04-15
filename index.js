const Discord = require('discord.js');
const client = new Discord.Client();
var translate = require('translation-google');


var discordBotToken =  'YOUR_DISCORD_BOT_TOKEN';

var currentCommand  = undefined;
var currentText     = undefined;

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function trans(input, callback) {
    translate(input, {from:"fi", to:'et'}).then(res => {
        callback(res.text)
    }).catch(err => {
        console.error(err);
    });
}

var randomMax = 100;
var changeToSpeak = 5;

// roll some dice and check if
function allowSpeak() {
    var random = Math.round(Math.random() * randomMax).toFixed(0);
    if(random  >= (randomMax - changeToSpeak)) {
        return true;
    }
    return false;
}

// check if message is command
function checkIfCommand(input) {
    if(input.startsWith("!")) {
        const regex = /^!([a-zA-Z]*)\s?(.*)?/g;
        var regres = regex.exec(input);
       
        if(regres != null) {
            // check if command and inputs are present and apply new values
            if(regres[1]) {
                currentCommand = regres[1];
            }
            else {
                currentCommand = undefined;
                return false;
            }
            if(regres[2]) {
                currentText = regres[2];
            }
            else {
                currentText = undefined;
                //return false;
            }
            
            // check if command and text are good
            if(currentCommand != undefined) {
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
            case 'viro': 
                trans(currentText, function(result){
                    msg.reply(result);
                });
            break;
            case 'viroRNG':

                var message = ""
                if(currentText != undefined) {
                    changeToSpeak = currentText;
                    message = "Viron käännöksiä tulee nyt " + changeToSpeak + "% mahdollisuudella";
                }
                else { 
                  
                    message = "Viron käännöksiä nyt " + changeToSpeak + "% mahdollisuudella";
                }

                trans(message, function(result){
                    msg.reply(result);   
                });
                
            break;
            default:
            break;
        }
       
        currentCommand = undefined;
        currentText = undefined;
    }
    
    else if(msg.author.bot == false) {
        if(allowSpeak()) {
            trans(msg.content, function(result){
                msg.reply(result);
            });
        } 
    }
});
  
client.login(discordBotToken);