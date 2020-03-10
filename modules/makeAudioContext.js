//if the audioContext hasn't been initialized yet, then initialize it
//audioContext allows browsers to play sounds
const makeAudioContext = settings =>
    !settings.audioContext &&
    //some browswers use audioContext, others use webkitAudioContext
    //set audioContext equal to a new instance of whichever returns true from the browswer
    (settings.audioContext = new (AudioContext || webkitAudioContext)());

export default makeAudioContext;
