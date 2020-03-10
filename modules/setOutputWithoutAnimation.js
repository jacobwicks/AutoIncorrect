import beep from './beep.js';
import resultArrayToString from './resultArrayToString.js';

//sets the output field without playing the cursor animation or waiting
const setOutputWithoutAnimation = ({ display, resultArray, settings }) => {
    //the outputDiv display element
    const { outputDiv } = display;

    //just turn the resultArray into a string
    //and set the outputDiv innerHTML
    outputDiv.innerHTML = resultArrayToString(resultArray);

    //if beeps are on, play some beeps
    if (settings.beeps) {
        const { audioContext } = settings;
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                //change the frequency based on if i is odd or even
                const frequency = 300 + (i % 2) * 300;
                const duration = 50;
                beep({ audioContext, duration, frequency });

                //wait 100 ms * i to play the beep so they don't all play at once
            }, i * 100);
        }
    }
};

export default setOutputWithoutAnimation;
