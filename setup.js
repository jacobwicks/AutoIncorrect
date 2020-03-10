import addTypos from './modules/addTypos.js';
import addTyposToHeader from './modules/addTyposToHeader.js';
import getHomeRowIndexes from './modules/getHomeRowIndexes.js';
import getKeyboard from './modules/getKeyboard.js';
import handleScroll from './modules/handleScroll.js';
import makeAudioContext from './modules/makeAudioContext.js';
import setupKeyboardDisplay from './modules/setupKeyboardDisplay.js';
import setupSettingsDiv from './modules/setupSettingsDiv.js';

//setup script
//enclosing the function in curly brackets without anything else makes it an IIFE
//so it will be invoked and run on startup
{
    //the display object contains references to commonly accessed elements in the page
    //it will be passed as an argument to functions that need it
    const display = {
        //these are the big displays above the keyboard
        currentInputSpan: document.getElementById('currentInputSpan'),
        currentOutputSpan: document.getElementById('currentOutputSpan'),
        arrowSpan: document.getElementById('arrow'),

        //the text area where the user typed their input
        inputTextarea: document.getElementById('inputTextarea'),

        //the div where the output is displayed
        outputDiv: document.getElementsByClassName('output')[0],

        settingsDiv: document.getElementsByClassName('settings')[0],
    };

    const keyboardModel = {
        //the homerow is where the fingers are supposed to rest while typing
        //we use the homerow to model realistic typos, finding keys
        //on the path from the homerow to the target key
        //you can put any character from the keyboard into the homerow
        homeRow: Array.from('asdfjkl;'),

        //array of arrays of elements with upper and lower properties
        keyboard: getKeyboard(),

        //rows are offset from each other on my keyboard
        //spacebar is offset 2 full keys from 4
        //to calculate offset, get the offset of each row. Subtract the higher row from the lower
        offsets: [0, 1, 1.5, 2, 4],
    };

    //calculate homerowIndexes and add them to the keyboardModel
    keyboardModel.homeRowIndexes = getHomeRowIndexes(keyboardModel);

    //the settings for the typos
    const settings = {
        //audioContext will store an AudioContext player after the createAudioContext function has been called
        audioContext: undefined,
        //if animation is true, the animation of input to output will play
        //if false, output will be displayed instantly
        animation: true,

        //if beeps is true, you'll hear some excellent beeping noises
        beeps: true,

        //%chance to add an extra character on a typo
        extraCharacters: 20,

        //frequency is a number 0-100
        //it is the % chance that a typo will occur
        frequency: 20,

        //%chance to miss a character on a typo
        missedCharacters: 20,
        //weightSeverity is a number 1-4
        //it changes how likely it is that typos are more 'severe', or farther from the intended key
        //the higher the number, the more likely it is that a typo will select a key that is far from the intended key
        //the lower the number, the more likely a typo will select a key close to the indended key
        severity: 2,

        //the likelihood of transposing the current character with the next character
        transposition: 40,
    };

    //add the keyboard keys to the display
    setupKeyboardDisplay(keyboardModel);

    //use the typos code to add typos to the header
    addTyposToHeader(keyboardModel);

    //setUpSettingsDiv function adds the sliders and checkboxes to the settings div
    setupSettingsDiv({ display, settings });

    //attach handleScroll to the input textarea
    display.inputTextarea.addEventListener('scroll', handleScroll, false);

    //make clicking the 'GO' button invoke the addTypos function
    document.getElementById('addTyposButton').addEventListener('click', () => {
        //if beeps are on and audioContext is undefined, call the makeAudioContext function
        //we don't do this until the user clicks
        //because you can't create an audio context without some action by the user
        settings.beeps && !settings.audioContext && makeAudioContext(settings);

        //use .bind to pass the keyboardModel and settings to the addTypos function
        addTypos.bind(null, {
            display,
            keyboardModel,
            settings,
        })();
    });
}
