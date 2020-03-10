import isNewline from './isNewLine.js';

//move the cursor forward one character
const advanceOutputCursor = ({
    display,
    isMistake,
    prev,
    resultCharacters,
}) => {
    //find the outputDiv
    const { outputDiv } = display;

    //get prevCharacters and prevInnerHTML out of prev
    let { characters: prevCharacters, innerHTML: prevInnerHTML } = prev;

    //break Tag
    const breakElement = '<br/>';

    //the mark element open tag
    const normalOpen = '<mark>';

    //if there's a mistake, add a <mark class="mark__mistake">
    const mistakeOpen = '<mark class="mark__mistake">';

    //if there is a mistake, use the mistake open tag
    //otherwise the normal open tag
    const markOpenTag = isMistake ? mistakeOpen : normalOpen;

    const markCloseTag = '</mark>';

    //if resultcharacters is a newline, add a br element
    isNewline(resultCharacters) && (resultCharacters = breakElement);

    //if prevCharacters were a newline, set prevCharacters equal to <br/>
    isNewline(prevCharacters) && (prevCharacters = breakElement);

    //newInnerHTML starts the same as prevInnderHTML
    let newInnerHTML = prevInnerHTML;

    //if there are characters to add
    if (resultCharacters) {
        //newInnerHTML prevInnerHTML with mark tags and the result characters
        newInnerHTML += `${markOpenTag}${resultCharacters}${markCloseTag}`;

        //referencing prev.innerHTML directly changes the prev object
        //prev.innerHTML gets the result characters added without mark tags
        //this will persist to the next loop
        prev.innerHTML += resultCharacters;
    }

    //display the innerHTML
    //the mark will highlight one letter and look like a moving cursor
    outputDiv.innerHTML = newInnerHTML;
};

export default advanceOutputCursor;
