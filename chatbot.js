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
      height: 420px;
      background-color: #f8f9fa;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }
    .chatbot-header {
      background-color: #d4af37;
      color: white;
      padding: 10px;
      text-align: center;
      font-weight: bold;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .chat-box {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      font-size: 14px;
    }
    .input-box {
      border-top: 1px solid #ccc;
      padding: 10px;
    }
    .message {
      margin-bottom: 8px;
      padding: 8px 10px;
      border-radius: 8px;
      max-width: 85%;
    }
    .user-message {
      background-color: #d4af37;
      color: black;
      align-self: flex-end;
      text-align: right;
    }
    .bot-message {
      background-color: #e2e3e5;
      color: #000;
      align-self: flex-start;
    }
  </style>
</head>
<body>

<div id="chatbot" class="chatbot-box">
  <div class="chatbot-header">Chat with Us</div>
  <div id="chat" class="chat-box d-flex flex-column">
    <!-- Chat messages appear here -->
  </div>
  <div class="input-box">
    <input type="text" id="chatInput" class="form-control" placeholder="Ask a question..." />
  </div>
</div>

<script>
  const chatBox = document.getElementById('chat');
  const chatInput = document.getElementById('chatInput');

  const responses = [
    { keywords: ["hello", "hi", "hey"], reply: "Hello! How can I assist you today?" },
    { keywords: ["vehicle", "bike", "car", "truck"], reply: "Please mention your vehicle type and location. We'll find a mechanic for you." },
    { keywords: ["location", "city"], reply: "Please type your city name so we can find nearby mechanics." },
    { keywords: ["register", "join", "mechanic"], reply: "To register as a mechanic, click on 'Mechanic Register' from the home page." },
    { keywords: ["book", "appointment"], reply: "To book a mechanic, go to the listing and click 'Book Now' under any mechanic card." },
    { keywords: ["help", "how", "use"], reply: "You can ask about vehicle repairs, bookings, or using the website." }
  ];

  function getBotReply(message) {
    const msg = message.toLowerCase();
    for (const item of responses) {
      if (item.keywords.some(k => msg.includes(k))) {
        return item.reply;
      }
    }
    return "Sorry, I didn't understand that. Try asking about vehicle repair, booking, or mechanic registration.";
  }

  function appendMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', type === 'user' ? 'user-message' : 'bot-message');
    messageEl.textContent = message;
    chatBox.appendChild(messageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const userMessage = chatInput.value.trim();
      if (userMessage !== "") {
        appendMessage(userMessage, 'user');
        const botReply = getBotReply(userMessage);
        setTimeout(() => appendMessage(botReply, 'bot'), 400);
      }
      chatInput.value = '';
    }
  });
</script>

</body>
</html>
