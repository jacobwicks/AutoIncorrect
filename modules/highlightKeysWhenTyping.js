import displayCase from './displayCase.js';
import highlightKey from './highlightKey.js';

const highlightKeysWhenTyping = keyboard => {
    document.addEventListener('keydown', ({ key }) =>
        key === 'Shift'
            ? displayCase('upper', keyboard)
            : highlightKey({ key, keyboard })
    );

    document.addEventListener('keyup', ({ key }) =>
        key === 'Shift'
            ? displayCase('lower', keyboard)
            : highlightKey({ key, keyboard, highlight: false })
    );
};

export default highlightKeysWhenTyping;
