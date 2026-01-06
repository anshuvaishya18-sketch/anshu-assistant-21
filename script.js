// 🔓 Mobile audio unlock fix
function unlockAudio(){
  let test = new SpeechSynthesisUtterance(" ");
  speechSynthesis.speak(test);
  document.removeEventListener("touchstart", unlockAudio);
  document.removeEventListener("click", unlockAudio);
}
document.addEventListener("touchstart", unlockAudio);
document.addEventListener("click", unlockAudio);



let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voiceImg = document.querySelector("#voice");

let voices = [];

function loadVoices(){
  voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

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

btn.addEventListener("touchstart", ()=>{
  let h=new Date().getHours();
  if(h<12) speak("Good morning Vinayak");
  else if(h<16) speak("Good afternoon Vinayak");
  else speak("Good evening Vinayak");
},{once:true});


// Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interimResults = false;

function startListening(){
  recognition.start();
  btn.innerText="Listening...";
  voiceImg.style.display="block";
}

// Laptop
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
  recognition.stop();   // 🔥 auto off
  btn.innerText="Click to Talk with Me";
  voiceImg.style.display="none";
};

function takeCommand(msg){
  
  if(waitingReply){
    
  if(msg.includes("theek") || msg.includes("acha")){
    speak("Ye sunkar mujhe bahut khushi hui");
  }
  else if(msg.includes("bura") || msg.includes("thak")){
    speak("Ohh, kya hua? aap mujhe bata sakte ho");
  }
  waitingReply = false;
  return;
}

  if(msg.includes("hello anshu")){ speak("Hello Sir ,how are you");
    waitingReplay = true; }
  else if(msg.includes("open youtube")){
    speak("Opening youtube");
    window.open("https://youtube.com");
  }
  else if(msg.includes("time")){
    let t=new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    speak("Abhi time hai " + t);
  }
    else if(msg.includes("main theek hun") || msg.includes("theek hun tum batao kaise ho")){

      speak("Main bhi theek hu..or aapka din kaisa gya aaj kaa")
    }
      else if(msg.includes("mera to theek hi raha") || msg.includes("acha raha")){

        speak("Ye to kaafi achchi baat hai")
      }
        else if(msg.includes("haa") || msg.includes("haan")){

          speak("Jii..or bataieye aapko kya jaan naa hai ")
        }
  else if(msg.includes("open linkedin")){
    speak("ok sir");
  window.open(`https://in.linkedin.com/`)
  }
  else if(msg.includes("who are you")){
    speak("I am Mr Vinayak's assistant, he has appointed me, and I can do some general work, how can I help you? ")
  }
  else if (msg.includes("can you help me")){
    speak("ofcourse sir, please tell me")
  }
  else if(msg.includes("open google map")){
    speak("ok sir,openning google map");
  window.open("https://www.google.co.in/maps")
  }
  else{
    speak("ok sir");
    window.open(`https://www.google.com/search?q=${msg}`);
  }
}
