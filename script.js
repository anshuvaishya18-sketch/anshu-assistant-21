<script>
let waitingReply = false;
let isListening = false;

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voiceImg = document.querySelector("#voice");

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "hi-IN";

// SPEAK FUNCTION
function speak(text){
  let utter = new SpeechSynthesisUtterance(text);
  utter.lang = "hi-IN";
  speechSynthesis.speak(utter);
}

// START LISTEN
function startListening(){
  if(isListening) return;
  isListening = true;
  recognition.start();
  btn.innerText = "Listening...";
  voiceImg.style.display = "block";
}

// Button
btn.addEventListener("click", startListening);

// RESULT
recognition.onresult = function(event){
  let msg = event.results[0][0].transcript.toLowerCase();
  content.innerText = msg;
  recognition.stop();
  isListening = false;
  btn.innerText = "Click to Talk with Me";
  voiceImg.style.display = "none";
  takeCommand(msg);
};

// MAIN COMMAND LOGIC
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

  if(msg.includes("hello anshu")){
    speak("Hello sir, how are you?");
    waitingReply = true;
    return;
  }

  else if(msg.includes("open youtube")){
    speak("Opening youtube");
    window.open("https://youtube.com","_blank");
  }

  else if(msg.includes("time")){
    let t = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    speak("Abhi time hai " + t);
  }

  else if(msg.includes("open linkedin")){
    speak("Opening linkedin");
    window.open("https://in.linkedin.com/","_blank");
  }

  else if(msg.includes("who are you")){
    speak("I am your personal voice assistant");
  }

  else{
    speak("Searching on google");
    window.open(`https://www.google.com/search?q=${msg}`,"_blank");
  }
}
</script>
