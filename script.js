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
