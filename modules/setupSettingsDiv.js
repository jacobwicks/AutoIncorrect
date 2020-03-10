import addCheckboxesToSettingsDiv from './addCheckboxesToSettingsDiv.js';
import addSlidersToSettingsDiv from './addSlidersToSettingsDiv.js';

//sets up the settings div by adding sliders and checkboxes
const setupSettingsDiv = ({ display, settings }) => {
    const { settingsDiv } = display;

    //add the sliders
    addSlidersToSettingsDiv({ settingsDiv, settings });

    //add the checkboxes
    addCheckboxesToSettingsDiv({ settingsDiv, settings });
};

export default setupSettingsDiv;
