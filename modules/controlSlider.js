//control slider accepts a name
//and hooks up the slider element to the value in the settings object
//and the value shown in the display element
const controlSlider = (name, settings) => {
    //find the slider
    const thisInput = document.getElementById(`${name}Slider`);

    // Update the current slider value (each time you drag the slider handle)
    thisInput.oninput = function() {
        const setting = this.value;
        const thisDisplay = document.getElementById(`${name}Display`);
        settings[name] = setting;
        thisDisplay.innerHTML = setting;
    };
};

export default controlSlider;
