import displayOutputAtIndex from './displayOutputAtIndex.js';
import resetDisplay from './resetDisplay.js';

//animation loop will call displayOutputAtIndex for each character in the inputString
//then it will wait 1 second and clear the highlights from the keyboard
const animationLoop = ({
    display,
    index,
    inputString,
    keyboard,
    prev,
    resultArray,
    settings,
}) => {
    //use setTimeout to delay execution of the displayOutput
    setTimeout(() => {
        //call the displayOutputAtIndex function
        //displayOutputAtIndex makes all the visible changes to the page
        displayOutputAtIndex({
            display,
            index,
            inputString,
            keyboard,
            prev,
            resultArray,
            settings,
        });

        //if there are still characters left in the input string, recursively call animationLoop with the next index
        if (index++ < inputString.length - 1) {
            animationLoop({
                display,
                index,
                inputString,
                keyboard,
                prev,
                resultArray,
                settings,
            });
        } else {
            //if we have done every character in the input string
            resetDisplay({
                display,
                inputString,
                keyboard,
                prev,
            });
        }
    }, 500);
};

export default animationLoop;
