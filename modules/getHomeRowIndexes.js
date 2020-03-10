import getIndexOfCharacter from './getIndexOfCharacter.js';

//returns an array of indexes for each character in the homerow string
const getHomeRowIndexes = ({ homeRow, keyboard }) =>
    homeRow.map(character => ({
        character,
        index: getIndexOfCharacter(character, keyboard),
    }));

export default getHomeRowIndexes;
