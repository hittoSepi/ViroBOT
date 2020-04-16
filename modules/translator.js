var translate = require('translation-google');

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

var Translator = {

    // current command and arguments for it
    currentCommand: undefined,
    currentArgs:    undefined,

    // change to speak stuff
    randomMax: 100,
    changeToSpeak: 5,

    /**
     * Translator function
     * translates from Finland to Estonia
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
    translateFinToEstonia: (input, callback) => {
        translate(input, {from:"fi", to:'et'}).then(res => {
            callback(res.text);
        }).catch(err => {
            console.error(err);
        });
    },

    /** 
    * roll some dice and check if random is greater than change to speak, then allow spam.
    * @returns - returns true if random number is greater than change to speak
    */
    allowSpeak: () => {
        var random = Math.round(Math.random() * this.randomMax).toFixed(0);
        if(random  >= (this.randomMax - this.changeToSpeak)) {
            return true;
        }
        return false;
    },


}

module.exports = Translator;