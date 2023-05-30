let voiceList = document.getElementById('voiceList');
let txtInput = document.getElementById('txtInput');
let rateValue = document.getElementById('rateValue');
let rate = document.getElementById('rate');
let pitchValue = document.getElementById('pitchValue');
let pitch = document.getElementById('pitch');
let speakBtn = document.getElementById('speakBtn');

let synth = window.speechSynthesis;

let voices = [];

function getVoiceList(){
    voices = synth.getVoices();
    voices.forEach(voice => {
        let listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });
}

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoiceList;
}

rate.addEventListener('input', function(){
    rateValue.textContent = rate.value;
});
pitch.addEventListener('input', function(){
    pitchValue.textContent = pitch.value;
});

speakBtn.addEventListener('click', function(){
    let utterance = new SpeechSynthesisUtterance(txtInput.value);
    let selectedVoice = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach(voice => {
        if(voice.name == selectedVoice){
            utterance.voice = voice;
        }
    });
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;
    synth.speak(utterance);
});