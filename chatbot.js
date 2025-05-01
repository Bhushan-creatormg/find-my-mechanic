<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Chatbot</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <style>
    body {
      background-color: #ffffff;
      font-family: 'Segoe UI', sans-serif;
    }
    .chatbot-box {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 300px;
      height: 400px;
      background-color: #f1f1f1;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 10px;
    }
    .chat-box {
      height: 80%;
      overflow-y: auto;
      margin-bottom: 10px;
    }
    .input-box {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
    }
    .chatbot-header {
      background-color: #d4af37;
      color: white;
      padding: 10px;
      text-align: center;
    }
  </style>
</head>
<body>

  <div id="chatbot" class="chatbot-box">
    <div class="chatbot-header">Chat with Us</div>
    <div id="chat" class="chat-box">
      <!-- Chat messages will appear here -->
    </div>
    <input type="text" id="chatInput" class="form-control input-box" placeholder="Ask a question..." />
  </div>

  <script>
    const chatBox = document.getElementById('chat');
    const chatInput = document.getElementById('chatInput');

    // Predefined responses for simplicity
    const responses = {
      "hello": "Hi! How can I assist you today?",
      "vehicle": "Please provide your vehicle type and location, and we'll connect you with a mechanic.",
      "help": "You can ask about vehicle repairs or how to use the website."
    };

    // Handle user input
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
          appendMessage("You: " + userMessage);
          const response = responses[userMessage.toLowerCase()] || "Sorry, I didn't understand that.";
          appendMessage("Bot: " + response);
        }
        chatInput.value = '';
      }
    });

    // Append messages to the chat box
    function appendMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  </script>

</body>
</html>
