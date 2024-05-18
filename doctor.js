document.addEventListener("DOMContentLoaded", function(){
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
  
    sendButton.addEventListener("click", sendMessage);
  
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
  
        if (lowercaseMessage.includes("hi") || lowercaseMessage.includes("hello")) {
            appendMessage("HealBot: Hello! I'm the HealBot. How can I assist you today?");
        }
        else if(lowercaseMessage.includes("doctor")){
            appendMessage("HealBot: doctor for which reason?");
            appendMessage("HealBot: 1. Eyes 2.Ear 3.Nose 4.Heart ");
        }
        else if(lowercaseMessage.includes("1")){
            appendMessage("HealBot: ophthalmologist");
        }
        else if(lowercaseMessage.includes("2")||lowercaseMessage.includes("3")){
            appendMessage("HealBot: Otorhinolaryngologist (ENT)");
        }
        else if(lowercaseMessage.includes("4")){
            appendMessage("HealBot: cardiologist");
        }
        else if(lowercaseMessage.includes("5")){
            appendMessage("HealBot: urinalysis");
        }
        else if (lowercaseMessage.includes("thank you")) {
            appendMessage("HealBot: You're welcome! If you have any more questions or need further assistance, feel free to ask. Take care and get well soon!");
        }
        else if (lowercaseMessage.includes("goodbye")||lowercaseMessage.includes("bye")) {
            appendMessage("HealBot: Goodbye! Don't hesitate to return if you need more help in the future.");
        }
        else {
            appendMessage("HealBot: I'm sorry, I may not fully understand. Could you please provide more information or ask a specific question?");
        }      
    }
        userInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
  
  
  
});