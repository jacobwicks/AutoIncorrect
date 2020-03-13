//makes a checkbox element with the provided label and name
const makeCheckbox = ({ label, checked, name }) => {
    const checkbox = document.createElement('label');

    checkbox.setAttribute('class', 'checkbox__container');

    checkbox.innerHTML = `${label}<input type="checkbox" id="${name}CheckboxInput" ${
        checked ? "checked='checked'" : ''
    }/><span class="checkmark"></span>`;

    return checkbox;
};

export default makeCheckbox;
