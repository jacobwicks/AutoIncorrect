//displays all the keys from the keyboard on the screen
//as span elements inside the keyboard div
const setupKeyboardDisplay = ({ keyboard, offsets }) => {
    //use html api to select the keyboard div
    //reference this variable to add keys to the keyboard
    const keyboardDiv = document.querySelector('.keyboard');

    //add each key in keyboard to the keyboardDiv
    keyboard.forEach((row, rowIndex) => {
        //the div that represents this row
        const thisRowDiv = document.createElement('div');
        //we can find it again later by searching for id
        thisRowDiv.setAttribute('id', `row${rowIndex}`);
        //the css class for keyboard row
        thisRowDiv.setAttribute('class', 'keyboard__row');

        //if the keys are offset, make a blank key to put on the left
        if (!!offsets[rowIndex] && rowIndex < 4) {
            const blankKeySpan = document.createElement('span');

            //assign the css class
            blankKeySpan.setAttribute('class', 'keyboard__blank');

            //without a non breaking space the span will render with a height offset
            blankKeySpan.innerHTML = '&nbsp';

            //width of a key - 25 pixels - times the offset width
            blankKeySpan.style.width = `${Math.ceil(
                25 * offsets[rowIndex]
            ).toString()}px`;

            if (rowIndex === 3) {
                blankKeySpan.innerHTML = 'Shift';
                blankKeySpan.setAttribute('id', 'shiftKey');
            }

            //add the blank to the row
            thisRowDiv.appendChild(blankKeySpan);
        }

        if (rowIndex < 4) {
            row.forEach(key => {
                //the space breaks. the non-breaking space doesn't
                key.lower === ' ' && (key = '&nbsp');
                const thisKeySpan = document.createElement('span');
                thisKeySpan.setAttribute('id', `keyCharacter${key.lower}`);
                thisKeySpan.setAttribute('class', 'keyboard__key');
                thisKeySpan.innerHTML = key.lower;
                thisRowDiv.appendChild(thisKeySpan);
            });
        } else {
            //it's the spacebar, which gets special treatment
            //if you change the model, you may have to change this code
            const spacebarSpan = document.createElement('span');

            //keyCharacter followed by a space ' ';
            spacebarSpan.setAttribute('id', 'keyCharacter ');
            spacebarSpan.setAttribute('class', 'keyboard__spacebar');

            thisRowDiv.appendChild(spacebarSpan);
        }
        keyboardDiv.appendChild(thisRowDiv);
    });
};

export default setupKeyboardDisplay;
