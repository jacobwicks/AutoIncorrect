//control checkbox accepts a name
//and hooks the checkbox up to the value in the settings object
const controlCheckbox = (name, settings) => {
    //find the checkbox
    const checkbox = document.getElementById(`${name}CheckboxInput`);

    //when the value changes, check or uncheck the checkbox
    checkbox.addEventListener('change', ({ target }) =>
        target.checked ? (settings[name] = true) : (settings[name] = false)
    );
};

export default controlCheckbox;
