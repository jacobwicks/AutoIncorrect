import isNewline from './isNewLine.js';

//takes an array of input and result characters
//returns a string made from the resultcharacters
const resultArrayToString = resultArray =>
    resultArray.reduce((outputString, { resultCharacters }) => {
        //if the result character is a newline, replace it with a break tag
        isNewline(resultCharacters) && (resultCharacters = '<br/>');

        //if there are result characters, add them to the outputstring
        !!resultCharacters && (outputString += resultCharacters);

        return outputString;
    }, '');

export default resultArrayToString;
