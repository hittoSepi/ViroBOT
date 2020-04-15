var translate = require('translation-google');

var Translator = {

    currentCommand: undefined,
    currentArgs:    undefined,

    // change to speak stuff
    randomMax: 100,
    changeToSpeak: 5,


    isFunction: function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },

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
    translateFinToEstonia: function(input, callback) {
        translate(input, {from:"fi", to:'et'}).then(res => {
            callback(res.text);
        }).catch(err => {
            console.error(err);
        });
    },

    /** 
    * roll some dice and check if random is greater than change to speak, then allow spam.
    * @constructor
    */
    allowSpeak: function() {
        var random = Math.round(Math.random() * this.randomMax).toFixed(0);
        if(random  >= (this.randomMax - this.changeToSpeak)) {
            return true;
        }
        return false;
    },

    /** 
    * checks if message is command
    * @constructor
    * @param string input - Raw msg content
    */
    checkIfCommand: function(input) {
        if(input.startsWith("!")) {
            const regex = /^!([a-zA-Z]*)\s?(.*)?/g;
            var regres = regex.exec(input);
        
            if(regres !== null) {
                // check if command and inputs are present and apply new values
                if(regres[1]) {
                    this.currentCommand = regres[1];
                }
                else {
                    this.currentCommand = undefined;
                    return false;
                }
                if(regres[2]) {
                    this.currentArgs = regres[2];
                }
                else {
                    this.currentArgs = undefined;
                }
                
                // check if command and text are good
                if(this.currentCommand !== undefined) {
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = Translator;