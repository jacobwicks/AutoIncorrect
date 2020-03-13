//makes a slider element with the given label and value
const makeSlider = ({ label, max = 100, min = 0, name, value }) => {
    const slider = document.createElement('div');

    slider.setAttribute('class', 'slider__container');

    slider.innerHTML = `${label}<span id="${name}Display">${value}</span><input type="range" min="${min}" max="${max}" value="${value}" class="slider" id="${name}Slider"/>`;

    return slider;
};

export default makeSlider;
