import advanceOutputCursor from './advanceOutputCursor.js';
import asInnerHTML from './asInnerHTML.js';
import beep from './beep.js';
import displayCase from './displayCase.js';
import getIndexOfCharacter from './getIndexOfCharacter.js';
import highlightInputAt from './highlightInputAt.js';

//display output at index takes the result array and the index
//and displays the input character, the result character
//and highlights the intended key and the mistakes
//it also calls the advance output cursor function that moves the cursor
//in the input textarea and output div
const displayOutputAtIndex = ({
    //object containing references to display elements on the page
    display,

    //the target index in the result array
    index,

    //the complete input string, used to highlight the input textarea
    inputString,

    //array of arrays representing the keyboard
    keyboard,

    //object containing values from the previous loop
    prev,

    //the array of input characters and result characters
    resultArray,

    //the settings the user has chosen
    settings,
}) => {
    //get reference to the elements on the page
    const { arrowSpan, currentInputSpan, currentOutputSpan } = display;

    //remove the highlight from the previous key
    //prev.key is a reference to the <span> element
    if (!!prev.key) {
        prev.key.classList.remove('highlighted');
        prev.key.classList.remove('mistake');
    }

    //clear the currentMistakeSpan
    //and remove the mistake styling from the previous mistake key
    if (prev.mistakes) {
        prev.mistakes.forEach(
            prevMistake =>
                prevMistake && prevMistake.classList.remove('mistake')
        );
        arrowSpan.style.color = null;
    }

    //highlight the input field only at the given index
    highlightInputAt({ input: inputString, index });

    const { inputCharacter, resultCharacters } = resultArray[index];

    currentInputSpan.innerHTML = asInnerHTML(inputCharacter);
    currentOutputSpan.innerHTML = asInnerHTML(resultCharacters);

    const charIndex = getIndexOfCharacter(inputCharacter, keyboard);

    //no character index means it's not a character modeled in the keyboard
    if (!charIndex) {
        //we don't generate mistakes for characters not on the keyboard
        advanceOutputCursor({
            display,
            isMistake: false,
            prev,
            resultCharacters,
        });

        //record the resultCharacters for the next loop iteration
        prev.characters = resultCharacters;
        return;
    }

    const { row, column, isUppercase } = charIndex;

    //match the displayed case to the current character
    isUppercase
        ? displayCase('upper', keyboard)
        : displayCase('lower', keyboard);

    //all the key spans are labeled with the lowercase characters
    const inputCharacterLowercase = keyboard[row][column].lower;

    //get the span that represents the input character
    const key =
        inputCharacterLowercase &&
        document.getElementById(`keyCharacter${inputCharacterLowercase}`);

    //highlight the key
    key && key.classList.add('highlighted');

    //set the frequency of the beep noise
    //beep noise is lower if the row is farther down the keyboard
    let frequency = 600;
    !!row && (frequency = -row * 100);
    //duration is 50 milliseconds
    let duration = 50;

    //if the character in the result array doesn't match
    //the input character, then there's a typo, isMistake is true
    const isMistake = resultCharacters !== inputCharacter;

    if (isMistake) {
        //set frequency and duration to the unpleasant mistake noise
        frequency = 100;
        duration = 250;

        //turn the arrow red, indicating a mistake
        arrowSpan.style.color = 'red';

        //when resultCharacters undefined- the typo was failing to type a character
        if (!resultCharacters) {
            //highlight the input key as a mistake
            key && key.classList.add('mistake');

            advanceOutputCursor({
                display,
                isMistake,
                prev,
                resultCharacters,
            });

            prev.characters = undefined;
            //advance output cursor can look at prev.mistakes and see that a mistake was made
            //but also that the mistake was not a key
            prev.mistakes = [null];
        } else {
            //resultCharacters may have more than one character
            //so make an array out of the string and iterate through it
            //to get an array of references to the key <span>s
            const mistakeKeys = Array.from(resultCharacters).map(char => {
                const { row, column } = getIndexOfCharacter(char, keyboard);
                const mistakeCharacter = keyboard[row][column].lower;

                const mistakeKey = document.getElementById(
                    `keyCharacter${mistakeCharacter}`
                );

                return mistakeKey;
            });

            //highlight each mistake key in red
            mistakeKeys.forEach(mistakeKey =>
                mistakeKey.classList.add('mistake')
            );

            //advance the output cursor
            advanceOutputCursor({
                display,
                isMistake,
                prev,
                resultCharacters,
            });

            prev.mistakes = mistakeKeys;
        }
    } else {
        //no mistake was made
        //if there are result characters
        !!resultCharacters &&
            //advance the output cursor
            advanceOutputCursor({
                display,
                isMistake,
                prev,
                resultCharacters,
            });

        //next iteration, any function that examines the prev.mistakes
        //will see that there were no mistakes made
        prev.mistakes = undefined;
    }

    //set prev.key to the the span element for the current key
    prev.key = key;
    //set prev.characters to the resultCharacters for the current key
    prev.characters = resultCharacters;

    //if beeps are on
    //beep at the frequency for the duration
    const { audioContext, beeps } = settings;
    beeps && beep({ audioContext, duration, frequency });
};

export default displayOutputAtIndex;
