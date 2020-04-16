/**
 *  @module CommandManager
 *  @author hitto
 *  @callback cb
 *  @param {string} response
 */
/**
 * CommandManager
 * Handles incoming messages and checks if those are commands fire that command.
 * @class 
 * 
 */
var translate = require('translation-google');

class CommandManager {

    /**
     * @constructor
     * @author hitto
     * @param {string} js_cmd_file - path for commands js file                 
     */
    constructor(js_cmd_file) {
        
        var _self = this;

        _self.changeToSpeak = 5;
        _self.randomMax = 100;
        
        if(js_cmd_file != undefined) { // check if BotCommand file is loaded
            _self.commands        = require(js_cmd_file);
            _self.currentCommand  = undefined;
            _self.currentArgs     = undefined;
            _self.currentMsg      = undefined;
           
        }
        else {
            throw new Error("BotCommand file missing! Aborting");
        }
    }

    
    /**
     * parseCommand
     * @param {string} msg Check and Parse incoming message properly.
     * @returns {boolean} returns true if command found else false.
     */
    parseCommand(msg) {
        var _self = this;
        _self.currentCommand  = undefined;
        _self.currentArgs     = undefined;
        _self.currentMsg      = msg;

        return _self.checkIfCommand(_self.currentMsg.content);
    }

    /**
     * execCommand
     * checks if there is suitable commands to fire
     * @param {string} msg Incoming msg from user to channel
     */
    execCommand(msg) {
        var _self = this;
        if(_self.commands[_self.currentCommand] != null) {
            _self.commands[_self.currentCommand](_self);
        }
        else {
            console.error("execCommand: Command not found!");
        }  
    }
    
    /**
     * Translates Finnish to Estonia.
     * @param {cb} callback callback for translated text
     */
    translateText(msg, callback) {
        translate(msg, {from:"fi", to:'et'}).then(res => {
            callback(res.text);
        }).catch(err => {
            console.error(err);
        });
    }


    /** 
    * checks if message is command
    * @private
    * @param {string} input - Raw msg content
    * @returns - returns true if command is found, else false
    */
   checkIfCommand(input) {
        var _self = this;
        if(input.startsWith("!")) {
            const regex = /^!([a-zA-Z]*)\s?(.*)?/g;
            var regres  = regex.exec(input);
        
            if(regres !== null) {
                // check if command and inputs are present and apply new values
                if(regres[1]) {
                    _self.currentCommand = regres[1];
                }
                else {
                    _self.currentCommand = undefined;
                    return false;
                }
                if(regres[2]) {
                    _self.currentArgs = regres[2];
                }
                else {
                    _self.currentArgs = undefined;
                }
                
                // check if command and text are good
                if(_self.currentCommand !== undefined) {
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = CommandManager