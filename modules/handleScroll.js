//keeps the input textarea lined up with the highlight element behind it
//in case the user enters enough text to make it scrollable
const handleScroll = () => {
    const inputTextarea = document.getElementById('inputTextarea');
    const scrollTop = inputTextarea.scrollTop();
    const backdrop = document.getElementById('backdrop');
    backdrop.scrollTop(scrollTop);
};

export default handleScroll;
