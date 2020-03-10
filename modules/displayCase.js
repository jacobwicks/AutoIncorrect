//changes the keyboard to display desired case of characters
// upper or lower
const displayCase = (desiredCase, keyboard) => {
    keyboard.forEach((row, rowIndex) => {
        //rowIndex 4 is the spacebar.
        //If you change the keyboard model, you'll need to change this code
        if (rowIndex < 4) {
            row.forEach(key => {
                //find the key span
                const thisKeySpan = document.getElementById(
                    `keyCharacter${key.lower}`
                );
                thisKeySpan.innerHTML = key[desiredCase];
            });
        }
    });

    const shiftKey = document.getElementById('shiftKey');
    //if uppercase, highlight the shift key
    desiredCase === 'upper'
        ? shiftKey.classList.add('highlighted')
        : shiftKey.classList.remove('highlighted');
};

export default displayCase;
