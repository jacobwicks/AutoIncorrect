//adds a cursor to the 'highlights' div behind the input textarea
//at the requested index, highlighting the text in the input textarea
//if index is undefined, no mark will be added to the input, clearing the highlights
const highlightInputAt = ({ input, index }) => {
    //when clearhighlights is true, no mark element will be added to the input string
    if (!input.length) {
        return;
    } else if (index && input[index]) {
        //but if an index is defined, then a mark will be added, highlighting the index
        input = `${input.slice(0, index)}<mark>${input.charAt(
            index
        )}</mark>${input.slice(index, input.length)}`;
    }

    //get reference to the highlights div
    const highlights = document.getElementsByClassName('highlights')[0];
    //set innerHTML equal to the input text with a mark element
    //this will show through the textarea div in front
    highlights.innerHTML = input;
};

export default highlightInputAt;
