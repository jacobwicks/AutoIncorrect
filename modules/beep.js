//plays a beep at the given frequency for the duration
const beep = ({ audioContext, duration, frequency }) => {
    //oscillator is an oscillatorNode => https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
    const oscillator = audioContext.createOscillator();

    //the type of wave function is 'square'
    //there are a few types and they all sound different
    oscillator.type = 'square';

    //connect the oscillator to the audioContext destination
    //the destination is the device that makes sound, usually the speakers
    //https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination
    oscillator.connect(audioContext.destination);

    //set the oscillator to the requested frequency
    oscillator.frequency.value = frequency;

    //oscillatorNode.start starts playing the sound
    //if oscillator has the start method, invoke it
    if (oscillator.start) oscillator.start();
    //for webkit, invoke noteOn() method
    else oscillator.noteOn(0);

    //after starting the tone, run setTimeout to stop the tone
    setTimeout(
        () => {
            //oscillatorNode.stop specifies the time to stop playing
            //if oscillator has the stop method, invoke it when the setTimeout runs
            if (oscillator.stop) oscillator.stop(0);
            //for webkit, invoke noteOff() method
            else oscillator.noteOff(0);
        },
        //setTimeout will run the code inside after the duration in milliseconds
        duration
    );
};

export default beep;
