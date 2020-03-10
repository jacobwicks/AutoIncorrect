import getResults from './getResults.js';
import resultArrayToString from './resultArrayToString.js';

//uses the typo generating code to introduce typos to the big title header
const addTyposToHeader = keyboardModel => {
    //get reference to the big title header
    const bigHeader = document.getElementsByClassName('header--big')[0];
    //grab the innerHTML as an inputString
    const inputString = bigHeader.innerHTML;

    //create a settings object
    const settings = {
        extraCharacters: 5,
        frequency: 10,
        missedCharacters: 15,
        severity: 1,
        transposition: 30,
    };

    //use the typo functions to add typos to the header
    const resultArray = getResults({
        inputString,
        keyboardModel,
        settings,
    });

    //reduce it to a string
    const headerWithTypos = resultArrayToString(resultArray);

    //set the innerhtml to the string with typos
    bigHeader.innerHTML = headerWithTypos;
};

export default addTyposToHeader;
