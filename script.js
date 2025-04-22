// DOM Elements
const copdForm = document.getElementById("copdForm");
const predictionResult = document.getElementById("predictionResult");
const riskLabel = document.getElementById("riskLabel");
const confidenceValue = document.getElementById("confidenceValue");
const severityIndicator = document.getElementById("severityIndicator");
const keyFactorsList = document.getElementById("keyFactors");
const recommendationsDiv = document.getElementById("recommendations");

// API URL (Change if hosted elsewhere)
const API_URL = "https://copd-backend.onrender.com/predict"; 

// Feature order MUST match backend's expected order
const FEATURE_MAP = [
    "age", "height", "weight", "bmi", "fev1", "fvc", "pef", "fev1_fvc_ratio",
    "pack_years", "diabetes", "hypertension", "muscular_weakness", "gender", 
    "smoking_status", "mwt1", "mwt2", "sgrq_score", "exercise_tolerance",
    "cough", "breathlessness", "wheezing", "exacerbations", "medications"
];

// Form Submission Handler
copdForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading state
    predictionResult.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Analyzing your clinical data...</p>
        </div>
    `;

    try {
        // Prepare feature array in exact backend order
        const features = FEATURE_MAP.map((feature) => {
            const element = document.getElementById(feature);
            if (!element) return 0; // Default to 0 if element not found
            return element.type === "number" ? parseFloat(element.value) || 0 : parseInt(element.value) || 0;
        });

        console.log("Sending Data:", { features });

        // Send request to backend
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features }),
        });

        if (!response.ok) throw new Error(await response.text());

        const result = await response.json();
        console.log("API Response:", result);

        // Display results
        displayResults(result.prediction);
    } catch (error) {
        console.error("Prediction error:", error);
        predictionResult.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Assessment Error</h4>
                <p>${error.message || "Failed to get prediction"}</p>
                <button class="btn outline" onclick="location.reload()">
                    <i class="fas fa-sync-alt"></i> Try Again
                </button>
            </div>
        `;
    }
});

// Display Results
function displayResults(result) {
    if (result === "High") {
        predictionResult.innerHTML = `
            <div class="high-risk-state">
                <i class="fas fa-heartbeat"></i>
                <h3>High Risk COPD Assessment</h3>
                <div class="risk-details">
                    <h4>Important Steps to Take:</h4>
                    <ul>
                        <li>Schedule an immediate appointment with your pulmonologist</li>
                        <li>Keep your rescue inhaler with you at all times</li>
                        <li>Monitor your symptoms daily</li>
                        <li>Follow your medication schedule strictly</li>
                        <li>Avoid exposure to smoke and air pollutants</li>
                    </ul>
                    <div class="tips-section">
                        <h4>Lifestyle Tips:</h4>
                        <ul>
                            <li>Practice breathing exercises regularly</li>
                            <li>Maintain good indoor air quality</li>
                            <li>Stay up to date with vaccinations</li>
                            <li>Join a COPD support group</li>
                        </ul>
                    </div>
                </div>
                <button class="btn primary" id="connectBtn">
                    <i class="fas fa-user-md"></i> Connect with Specialist
                </button>
            </div>
        `;
    } else {
        predictionResult.innerHTML = `
            <div class="low-risk-state">
                <i class="fas fa-shield-alt"></i>
                <h3>Low Risk Assessment</h3>
                <div class="wellness-tips">
                    <h4>Maintain Your Health:</h4>
                    <ul>
                        <li>Continue regular exercise and physical activity</li>
                        <li>Maintain a balanced diet rich in nutrients</li>
                        <li>Stay hydrated and get adequate rest</li>
                        <li>Schedule regular check-ups</li>
                    </ul>
                    <div class="prevention-tips">
                        <h4>Prevention Tips:</h4>
                        <ul>
                            <li>Avoid smoking and second-hand smoke</li>
                            <li>Practice good hygiene</li>
                            <li>Keep your living space well-ventilated</li>
                            <li>Stay active and maintain a healthy lifestyle</li>
                        </ul>
                    </div>
                </div>
                <div class="encouragement">
                    <p>Great job maintaining your health! Keep up these healthy habits to stay well.</p>
                </div>
            </div>
        `;
    }
}
// Identify Key Factors Contributing to Risk
function identifyKeyFactors(features, severity) {
    const factors = [];
    
    // Smoking history
    if (features[9] > 0 && features[8] >= 10) {
        factors.push({
            name: "Smoking History",
            value: `${features[8]} pack-years`,
            impact: severity >= 2 ? "Major risk factor" : "Significant contributor"
        });
    }
    
    // Lung function
    if (features[7] < 0.7) {
        factors.push({
            name: "FEV1/FVC Ratio",
            value: features[7].toFixed(2),
            impact: "Key diagnostic indicator"
        });
    }
    
    // Symptoms
    if (features[16] >= 50) {
        factors.push({
            name: "Symptom Score",
            value: features[16],
            impact: "High symptom burden"
        });
    }
    
    return factors;
}

// Get Recommendations Based on Severity
function getRecommendations(severity) {
    const recommendations = [
        "Maintain regular checkups and monitor symptoms.",
        "Consider pulmonary function tests and lifestyle modifications.",
        "Consult a pulmonologist for bronchodilator therapy.",
        "Immediate medical evaluation required. May need oxygen therapy."
    ];
    return recommendations[severity] || "Consult your healthcare provider.";
}

// Connect with Specialist Button
document.addEventListener("click", (e) => {
    if (e.target.id === "connectBtn") {
        window.location.href = "#connect";
    }
});
// DOM Elements
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const userMessageInput = document.getElementById('userMessage');
const sendMessageBtn = document.getElementById('sendMessage');

// Toggle Chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotWindow.style.display = 'flex';
  chatbotToggle.style.display = 'none';
});

closeChatbot.addEventListener('click', () => {
  chatbotWindow.style.display = 'none';
  chatbotToggle.style.display = 'flex';
});

// Send Message Function
async function sendMessage() {
  const message = userMessageInput.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, 'user');
  userMessageInput.value = '';

  // Show typing indicator
  showTypingIndicator();

  try {
    const response = await getAIResponse(message);
    addMessage(response, 'bot');
  } catch (error) {
    addMessage("Sorry, I can't respond right now. Please try again later.", 'bot');
  } finally {
    hideTypingIndicator();
  }
}

// Typing Indicator
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chatbot-typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) typingIndicator.remove();
}

// Add Message to Chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message chatbot-message-${sender}`;
  messageDiv.innerHTML = `<p>${text}</p>`;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// AI Response (Gemini API)
async function getAIResponse(userInput) {
  const lowerInput = userInput.toLowerCase();

  // Check greetings
  if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
    return "Hello! I'm here to help with COPD. Ask me about symptoms, treatments, or management.";
  }

  // Check thanks
  if (lowerInput.includes('thank')) {
    return "You're welcome! Let me know if you have other COPD questions.";
  }

  // Verify if question is COPD-related
  const isCOPDQuestion = await checkCOPDRelevance(userInput);
  if (!isCOPDQuestion) {
    return "I specialize in COPD (Chronic Obstructive Pulmonary Disease). Please ask me about symptoms, treatments, or management.";
  }

  // Get AI response
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `As a COPD specialist, provide a concise 2-3 sentence answer: ${userInput}`
        }]
      }],
      safetySettings: [{
        category: "HARM_CATEGORY_MEDICAL",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }]
    })
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function checkCOPDRelevance(question) {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Is this about COPD? Answer only 'yes' or 'no': ${question}`
        }]
      }]
    })
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.toLowerCase().includes('yes');
}

// Event Listeners
sendMessageBtn.addEventListener('click', sendMessage);
userMessageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
