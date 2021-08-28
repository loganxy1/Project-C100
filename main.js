var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event){
    console.log(event);
    var Content = event.results[0][0].transcript;

    document.getElementById("textbox").innerHTML = Content;

    if(Content=="take my selfie"){
        speak();
        console.log("taking selfie");
    }
} 

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "taking selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    camera();

    setTimeout(function()
    {
        takeSnapshot();
        save();
    }, 5000);
}

function camera(){
    Webcam.attach(passCamera);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

passCamera = document.getElementById("camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
    });
}

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}