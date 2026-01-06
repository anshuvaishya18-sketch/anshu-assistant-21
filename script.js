let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voiceImg = document.querySelector("#voice");

let voices = [];

function loadVoices(){
  voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;

// Speak
function speak(text){
  let utter = new SpeechSynthesisUtterance(text);
  let female = voices.find(v => v.name.toLowerCase().includes("kalpana")) ||
               voices.find(v => v.lang === "hi-IN");
  if(female) utter.voice = female;

  utter.lang="hi-IN";
  utter.rate=0.9;
  utter.pitch=1.3;
  utter.volume=1;
  speechSynthesis.speak(utter);
}

// Unlock audio on first user tap (mobile rule)
function unlockAssistant(){
  loadVoices();
  let h=new Date().getHours();
  if(h<12) speak("Good morning Vinayak");
  else if(h<16) speak("Good afternoon Vinayak");
  else speak("Good evening Vinayak");
  btn.removeEventListener("touchstart", unlockAssistant);
  btn.removeEventListener("click", unlockAssistant);
}

btn.addEventListener("touchstart", unlockAssistant, {once:true});
btn.addEventListener("click", unlockAssistant, {once:true});

// Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interimResults = false;

function startListening(){
  recognition.start();
  btn.innerText="Listening...";
  voiceImg.style.display="block";
}

function stopListening(){
  recognition.stop();
  btn.innerText="Click to Talk with Me";
  voiceImg.style.display="none";
}

// Desktop
btn.addEventListener("click", startListening);

// Mobile
btn.addEventListener("touchstart", (e)=>{
  e.preventDefault();
  startListening();
});

// Result
recognition.onresult = (event)=>{
  let transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
  stopListening();
};

function takeCommand(msg){
  if(msg.includes("hello anshu")) speak("Hello sir, how are you");
  else if(msg.includes("open youtube")){
    speak("Opening youtube");
    window.open("https://youtube.com");
  }
  else if(msg.includes("time")){
    let t=new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    speak("Abhi time hai " + t);
  }
  else if(msg.includes("main theek hun")){
    speak("Main bhi theek hoon, aapka din kaisa gaya");
  }
  else if(msg.includes("acha raha")){
    speak("Ye to kaafi achchi baat hai");
  }
  else if(msg.includes("haa")){
    speak("Ji, aur bataiye aap kya jaan na chahte hain");
  }
  else{
    speak("Ok sir");
    window.open(`https://www.google.com/search?q=${msg}`);
  }
}
