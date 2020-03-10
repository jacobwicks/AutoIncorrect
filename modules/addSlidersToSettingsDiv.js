import controlSlider from './controlSlider.js';
import makeSlider from './makeSlider.js';

const addSlidersToSettingsDiv = ({ settingsDiv, settings }) => {
    //% chance that a typo will occur
    const frequencySlider = makeSlider({
        label: 'Typo Frequency: ',
        name: 'frequency',
        value: settings.frequency,
    });

    //weights how bad the typo will be
    //worse typos result in a character farther from the target character
    const severitySlider = makeSlider({
        label: 'Average Severity: ',
        name: 'severity',
        min: 1,
        max: 4,
        value: settings.severity,
    });

    //% chance that a typo will add an extra character
    //will not be called if the typo is a missed character
    //Examply: intended to type 'why?' h is typoed to j, becomes 'wjjy?'
    const extraCharactersSlider = makeSlider({
        label: 'Extra Characters: ',
        name: 'extraCharacters',
        value: settings.extraCharacters,
    });

    //% chance that a typo will be a missed character
    //nothing will be typed
    //Example: intended to type 'why?' h is missed, becomes 'wy?'
    const missedCharactersSlider = makeSlider({
        label: 'Missed Characters: ',
        name: 'missedCharacters',
        value: settings.missedCharacters,
    });

    //% chance that a typo will transpose the intended letters
    //Example: Intended to type 'why?', w and h transposed becomes 'hwy?'
    const transpositionSlider = makeSlider({
        label: 'Transposition: ',
        name: 'transposition',
        value: settings.transposition,
    });

    //add each slider to the settingsDiv
    settingsDiv.appendChild(frequencySlider);
    settingsDiv.appendChild(severitySlider);
    settingsDiv.appendChild(transpositionSlider);
    settingsDiv.appendChild(missedCharactersSlider);
    settingsDiv.appendChild(extraCharactersSlider);

    //the controlSlider function bound to the settings object
    const bindSlider = name => controlSlider.bind(null, name, settings)();

    //hook sliders to the settings object and value display elements
    bindSlider('frequency');
    bindSlider('severity');
    bindSlider('extraCharacters');
    bindSlider('missedCharacters');
    bindSlider('transposition');
};

export default addSlidersToSettingsDiv;
