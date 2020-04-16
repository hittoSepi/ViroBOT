/**
 * 
 * @module vb/BotCommands
 * @description Scriptish file for bot commands
 * @file BotCommands.js
 */

/**
 * 
 * @property {function} viro translates finnish text to Estonia
 * @property {function} viroRNG sets or views bots talking frequency
 * 
 */
let BotCommands = {
    
    /**
     * @example
     * !viro <text-to-translate> // translates finnish text to Estonia
     * @param {CommandManager} CommandMan Reference for CommandManager
     */
    "viro": function(CommandMan) {
        CommandMan.translateText(CommandMan.currentArgs, function(result){
            CommandMan.currentMsg.channel.send(result);
        });   

    },
    
    /**
     * @example
     * !viroRNG <0-100> // sets bots talking frequency
     * !viroRNG         // show current talking frequency
     * @param {CommandManager} CommandMan Reference for CommandManager
     */
    "viroRNG": function(CommandMan) {
        var message = "";
        var translateMessage = true;

        if (CommandMan.currentArgs !== undefined) {
            if(Number.isInteger(parseInt(CommandMan.currentArgs))) { // check if parameter is number
                CommandMan.currentArgs = Math.min(CommandMan.currentArgs, 100); // limit value to 100
                CommandMan.currentArgs = Math.max(CommandMan.currentArgs, 0); // limit value to 0
                CommandMan.changeToSpeak = CommandMan.currentArgs;
                message = "Viron käännöksiä tulee nyt " + CommandMan.changeToSpeak + "% mahdollisuudella";
            }
            else {
                translateMessage = false;
                message = "Huom! Käyttö !viroRNG <0-100>";  
            }
        }
        else { 
            message = "Viron käännökset tulevat " + CommandMan.changeToSpeak + "% mahdollisuudella";
        }   

        if (translateMessage === true) { // translate message if needed
           
            CommandMan.translateText(message, function(result){
                CommandMan.currentMsg.channel.send(result);
            });
        }
        else {
            console.log("no need for translation")
            CommandMan.currentMsg.channel.send(message); // send message to channel
        }
        
    }
}

module.exports = BotCommands;