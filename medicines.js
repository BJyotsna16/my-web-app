document.addEventListener("DOMContentLoaded", function() {
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const convertButton = document.getElementById("convert-button");
    const printButton = document.getElementById("print-button");
    const voiceIcon = document.getElementById("voice-icon");
    let speechText = "";
  
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
  
    function sendMessage() {
        const userMessage = userInput.value;
        appendMessage("You: " + userMessage);
        processUserMessage(userMessage);
        userInput.value = "";
    }
  
    function appendMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
    }
  
    function processUserMessage(message) {
        const lowercaseMessage = message.toLowerCase();
  
        switch (true) {
            case lowercaseMessage.includes("hi") || lowercaseMessage.includes("hello"):
                appendMessage("HealBot: Hello! I'm the HealBot. How can I assist you today?");
                break;
            case lowercaseMessage.includes("fever"):
                appendMessage("HealBot: I'm here to help. What's your age?");
                break;
            case /[0-9]/.test(lowercaseMessage):
                handleAgeInput(lowercaseMessage);
                break;
            case lowercaseMessage.includes("cough"):
                appendMessage("HealBot: I'm here to help. What type of cough do you have? 1. dry or 2. flu");
                break;
            case lowercaseMessage.includes("dry"):
                appendMessage("HealBot: Dry cough -> Kindly take the prescribed medicine from the chemist: TERBUTALINE SULPHATE-1.25MG/5ML + BROMHEXINE HYDROCHLORIDE-2MG/5ML + GUAIPHENESIN-50MG/5ML + MENTHOL-0.5MG/5ML");
                break;
            case lowercaseMessage.includes("flu"):
                appendMessage("HealBot: Flu cough -> Kindly take the prescribed medicine from the chemist: AMBROXOL-30MG + GUAIPHENESIN-50MG + LEVOSALBUTAMOL-1MG");
                break;
            case lowercaseMessage.includes("stomach pain"):
                appendMessage("HealBot: I'm here to help. What's your age?");
                break;
            case lowercaseMessage.includes("headache"):
                appendMessage("HealBot: I'm here to help. What's your age?");
                break;
            case lowercaseMessage.includes("cold"):
                appendMessage("HealBot: I'm here to help. What's your age?");
                break;
            case lowercaseMessage.includes("thank you"):
                appendMessage("HealBot: You're welcome! If you have any more questions or need further assistance, feel free to ask. Take care and get well soon!");
                break;
            case lowercaseMessage.includes("goodbye") || lowercaseMessage.includes("bye"):
                appendMessage("HealBot: Goodbye! Don't hesitate to return if you need more help in the future.");
                break;
            default:
                appendMessage("HealBot: I'm sorry, I may not fully understand. Could you please provide more information or ask a specific question?");
        }
    }
  
    function handleAgeInput(message) {
        const age = parseInt(message);
        if (!isNaN(age)) {
            let response = "HealBot: ";
            if (age <= 5) {
                response += "Age <= 5 -> Kindly take the prescribed medicine one in the morning after breakfast and one at night after dinner: PARACETAMOL 120MG/5ML";
            } else if (age <= 9) {
                response += "Age > 5 && Age <= 9 -> Kindly take the prescribed medicine one in the morning after breakfast and one at night after dinner: PARACETAMOL/ACETAMINOPHEN 250MG/5ML";
            } else if (age <= 15) {
                response += "Age > 9 && Age <= 15 -> Kindly take the prescribed medicine one in the morning after breakfast and one at night after dinner: PARACETAMOL 500MG";
            } else {
                response += "Age > 15 -> Kindly take the prescribed medicine one in the morning after breakfast and one at night after dinner: PARACETAMOL 600MG";
            }
            appendMessage(response);
        }
    }
  
    convertButton.addEventListener("click", function() {
        toggleTextToVoice();
    });
  
    function toggleTextToVoice() {
        if (!speechSynthesis.speaking || speechSynthesis.paused) {
            speakText();
        } else {
            pauseTextToVoice();
        }
    }
  
    function speakText() {
        speechText = chatLog.textContent;
        const speechUtterance = new SpeechSynthesisUtterance(speechText);
        const voices = speechSynthesis.getVoices();
        speechUtterance.voice = voices.find(voice => voice.lang === "en-US");
        speechSynthesis.speak(speechUtterance);
    }
  
    function pauseTextToVoice() {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        } else {
            speechSynthesis.pause();
        }
    }
  
    speechSynthesis.addEventListener("start", function() {
        convertButton.innerHTML = "Pause";
        voiceIcon.innerHTML = "🔊";
    });
  
    speechSynthesis.addEventListener("pause", function() {
        convertButton.innerHTML = "Play";
        voiceIcon.innerHTML = "🔈";
    });
  
    speechSynthesis.addEventListener("resume", function() {
        convertButton.innerHTML = "Pause";
        voiceIcon.innerHTML = "🔊";
    });
  
    speechSynthesis.addEventListener("end", function() {
        convertButton.innerHTML = "Text to Speech";
        voiceIcon.innerHTML = "🔈";
    });
  
    const clickToRecord = document.getElementById("click_to_record");
    if (clickToRecord) {
        clickToRecord.addEventListener('click', function() {
            const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
            recognition.interimResults = true;
            recognition.onresult = function(event) {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                userInput.value = transcript;
            };
            recognition.start();
        });
    } else {
        console.error("Element #click_to_record not found!");
    }
  
    printButton.addEventListener("click", function() {
        printChatLog();
    });
  
    function printChatLog() {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Chat Log</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(chatLog.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
  });
  