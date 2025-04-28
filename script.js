// Mechanic Profile
const mechanics = [
  {
    name: 'John Doe',
    location: 'New York',
    service: 'Engine Repair, Oil Change',
    price: '$50/hour',
    contact: '123-456-7890',
    verified: true,
    avatar: 'mechanic-avatar.jpg'
  },
  {
    name: 'Jane Smith',
    location: 'California',
    service: 'Tire Replacement',
    price: '$40/hour',
    contact: '987-654-3210',
    verified: false,
    avatar: 'mechanic-avatar2.jpg'
  }
];

// Function to display mechanics
function displayMechanics() {
  const mechanicTable = document.getElementById('mechanicTable');
  mechanics.forEach(mechanic => {
    const row = mechanicTable.insertRow();
    row.innerHTML = `
      <td>${mechanic.name}</td>
      <td>${mechanic.location}</td>
      <td>${mechanic.service}</td>
      <td>${mechanic.price}</td>
      <td>${mechanic.contact}</td>
      <td>${mechanic.verified ? '✔️ Verified' : '❌ Not Verified'}</td>
    `;
  });
}

window.onload = displayMechanics;

// Chatbot logic
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

function sendChat() {
  const userMessage = chatbotInput.value.trim();
  if (!userMessage) return;

  // Display user message
  const userMessageDiv = document.createElement('div');
  userMessageDiv.classList.add('user-message');
  userMessageDiv.textContent = userMessage;
  chatbotMessages.appendChild(userMessageDiv);

  // Clear input field
  chatbotInput.value = '';

  // Get chatbot response
  setTimeout(() => {
    const botMessage = getChatbotResponse(userMessage);
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('bot-message');
    botMessageDiv.textContent = botMessage;
    chatbotMessages.appendChild(botMessageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 1000);
}

function getChatbotResponse(userMessage) {
  userMessage = userMessage.toLowerCase();

  if (userMessage.includes('mechanic') || userMessage.includes('repair')) {
    return 'You can search for nearby mechanics based on your location and service required!';
  } else if (userMessage.includes('price') || userMessage.includes('cost')) {
    return 'Prices vary based on the mechanic and service. Check the mechanic\'s profile for details.';
  } else if (userMessage.includes('hello') || userMessage.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else {
    return 'Sorry, I didn\'t understand. Could you please rephrase your query?';
  }
}

// Toggle chatbot
function toggleChatbot() {
  const chatbotBox = document.getElementById('chatbot-box');
  chatbotBox.style.display = chatbotBox.style.display === 'none' ? 'flex' : 'none';
}
