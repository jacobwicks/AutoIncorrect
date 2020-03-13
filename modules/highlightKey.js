import getIndexOfCharacter from './getIndexOfCharacter.js';

const highlightKey = ({ index, key, keyboard, highlight = true }) => {
    //if no index passed in, get the index
    !index && (index = getIndexOfCharacter(key, keyboard));

    const { row, column } = index;

    //use the row and column to find the lower case version of the character
    const inputCharacterLowercase = keyboard[row][column].lower;

    //get the span that represents the input character
    const keySpan = document.getElementById(
        `keyCharacter${inputCharacterLowercase}`
    );

    //highlight the keySpan or remove highlight
    keySpan && highlight
        ? keySpan.classList.add('highlighted')
        : setTimeout(() => keySpan.classList.remove('highlighted'), 200);
};

export default highlightKey;
