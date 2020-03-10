//asInnerHTML replaces the space character with the non-breaking space character
//if it receives an undefined it will return the non-breaking space character
const asInnerHTML = string =>
    string ? string.replace(/\s|\n/g, '&nbsp') : '&nbsp';

export default asInnerHTML;
