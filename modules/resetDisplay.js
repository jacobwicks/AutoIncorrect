import displayCase from './displayCase.js';
import enableGoButton from './enableGoButton.js';
import highlightInputAt from './highlightInputAt.js';

//used to clear the currentInput, currentOutput, and keyboard displays
const resetDisplay = ({ display, inputString, keyboard, prev }) => {
    const {
        arrowSpan,
        currentInputSpan,
        currentOutputSpan,
        outputDiv,
    } = display;

    const { key, innerHTML, mistakes } = prev;

    setTimeout(() => {
        //clear the keyboard highlight
        if (key) {
            key.classList.remove('highlighted');
            key.classList.remove('mistake');
        }

        //clear the currentInput and currentOutput displays
        currentInputSpan.innerHTML = '&nbsp';
        currentOutputSpan.innerHTML = '&nbsp';

        //and the display arrow
        arrowSpan.style.color = null;

        //clear cursor from input box
        //by calling highlightInputAt with no index
        highlightInputAt({
            input: inputString,
        });

        //prev.innerHTML doesn't have a cursor in it,
        //so this clears the cursor from the outputDiv
        outputDiv.innerHTML = innerHTML;

        //if there was a previous mistake, clear the styling
        if (mistakes) {
            //from the keyboard key
            mistakes.forEach(
                mistakeKey =>
                    mistakeKey && mistakeKey.classList.remove('mistake')
            );
        }

        //unpress the shift key
        displayCase('lower', keyboard);

        //enable the go button
        enableGoButton();

        //1 second timeout lets the user see the last result
    }, 1000);
};

export default resetDisplay;
