import controlCheckbox from './controlCheckbox.js';
import makeCheckbox from './makeCheckbox.js';

const addCheckboxesToSettingsDiv = ({ settingsDiv, settings }) => {
    //make the animation checkbox
    const animationCheckbox = makeCheckbox({
        checked: settings.animation,
        label: 'Animation',
        name: 'animation',
    });

    //make the beeps checkbox
    const beepsCheckbox = makeCheckbox({
        checked: settings.beeps,
        label: 'Beeps',
        name: 'beeps',
    });

    //adds space in between the two checkboxes
    const spacer = document.createElement('span');
    spacer.innerHTML = '&nbsp&nbsp&nbsp';

    //adding the checkboxes to the settingsDiv
    settingsDiv.appendChild(animationCheckbox);
    settingsDiv.appendChild(spacer);
    settingsDiv.appendChild(beepsCheckbox);

    //the controlCheckbox function bound to the settings object
    const bindCheckbox = name => controlCheckbox.bind(null, name, settings)();

    //hook checkboxes to the settings object
    bindCheckbox('animation');
    bindCheckbox('beeps');
};

export default addCheckboxesToSettingsDiv;
