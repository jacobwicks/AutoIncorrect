import animationLoop from './animationLoop.js';
import enableGoButton from './enableGoButton.js';
import getResults from './getResults.js';
import setOutputWithoutAnimation from './setOutputWithoutAnimation.js';

const disableGoButton = () => {
    document.getElementById('addTyposButton').setAttribute('disabled', '');
};

const addTypos = ({ display, keyboardModel, settings }) => {
    //reset the contents of the output div
    display.outputDiv.innerHTML = '';

    //get the input string from the textarea
    const inputString = display.inputTextarea.value;

    //if there's no input string, don't do anything
    if (!inputString) return;

    //disable the go button to prevent multiple clicks
    disableGoButton();

    //generate the result array
    const resultArray = getResults({
        inputString,
        keyboardModel,
        settings,
    });

    //prev is an object that holds references to the values from the previous loop
    const prev = {
        //prevCharacters is the character(s) that were added in the previous loop
        characters: undefined,

        //innerHTML is where we store a copy of the outputDiv innerHTML without mark elements
        innerHTML: '',

        //prevKey is a reference to the key <span> element that was highlighted in the previous iteration
        key: undefined,

        //prevMistakes is a reference to the key <span> element(s) that was highlighted as a mistake in the previous iteration
        mistakes: undefined,
    };

    //if animation setting is true, start the animation loop by invoking it with 0
    if (settings.animation) {
        //get the keyboard out of the keyboardModel object
        const { keyboard } = keyboardModel;

        animationLoop({
            display,
            index: 0,
            inputString,
            keyboard,
            prev,
            resultArray,
            settings,
        });
    } else {
        //animation is turned off
        setOutputWithoutAnimation({
            display,
            resultArray,
            settings,
        });

        //turn the go button back on
        enableGoButton();
    }
};

export default addTypos;
