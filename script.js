// DOM Elements
const copdForm = document.getElementById('copdForm');
const predictionResult = document.getElementById('predictionResult');
const riskLabel = document.getElementById('riskLabel');
const confidenceValue = document.getElementById('confidenceValue');
const severityIndicator = document.getElementById('severityIndicator');
const keyFactorsList = document.getElementById('keyFactors');
const recommendationsDiv = document.getElementById('recommendations');

// Feature order MUST match backend's FEATURES_ORDER
const FEATURE_MAP = {
    'age': { el: 'age', type: 'number' },
    'height': { el: 'height', type: 'number' },
    'weight': { el: 'weight', type: 'number' },
    'bmi': { el: 'bmi', type: 'number' },
    'fev1': { el: 'fev1', type: 'number' },
    'fvc': { el: 'fvc', type: 'number' },
    'pef': { el: 'pef', type: 'number' },
    'fev1_fvc_ratio': { el: 'fev1_fvc_ratio', type: 'number' },
    'pack_years': { el: 'pack_years', type: 'number' },
    'diabetes': { el: 'diabetes', type: 'select' },
    'hypertension': { el: 'hypertension', type: 'select' },
    'muscular_weakness': { el: 'muscular_weakness', type: 'select' },
    'gender': { el: 'gender', type: 'select' },
    'smoking_status': { el: 'smoking_status', type: 'select' },
    'mwt1': { el: 'mwt1', type: 'number' },
    'mwt2': { el: 'mwt2', type: 'number' },
    'sgrq_score': { el: 'sgrq_score', type: 'number' },
    'exercise_tolerance': { el: 'exercise_tolerance', type: 'number' },
    'cough': { el: 'cough', type: 'select' },
    'breathlessness': { el: 'breathlessness', type: 'select' },
    'wheezing': { el: 'wheezing', type: 'select' },
    'exacerbations': { el: 'exacerbations', type: 'number' },
    'medications': { el: 'medications', type: 'number' }
};

// Form Submission Handler
copdForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    predictionResult.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Analyzing your clinical data...</p>
        </div>
    `;

    try {
        // Prepare data in exact backend order
        const formData = {};
        for (const [feature, config] of Object.entries(FEATURE_MAP)) {
            const element = document.getElementById(config.el);
            formData[feature] = config.type === 'number' ? 
                parseFloat(element.value) : 
                parseInt(element.value);
        }

        // Call backend API
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error(await response.text());
        
        const result = await response.json();
        displayResults(result, formData);
        
    } catch (error) {
        console.error('Prediction error:', error);
        predictionResult.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Assessment Error</h4>
                <p>${error.message || 'Failed to get prediction'}</p>
                <button class="btn outline" onclick="location.reload()">
                    <i class="fas fa-sync-alt"></i> Try Again
                </button>
            </div>
        `;
    }
});

// Display Results
function displayResults(result, formData) {
    // Update risk level
    riskLabel.textContent = result.risk_level;
    
    // Update confidence
    confidenceValue.textContent = (result.confidence * 100).toFixed(1);
    
    // Update severity meter (0-3 → 0-100%)
    severityIndicator.style.left = `${result.severity * 25}%`;
    
    // Highlight active severity level
    document.querySelectorAll('.severity-level').forEach((level, index) => {
        level.classList.toggle('active', index === result.severity);
    });
    
    // Show key contributing factors
    keyFactorsList.innerHTML = identifyKeyFactors(formData, result.severity)
        .map(factor => `<li><strong>${factor.name}:</strong> ${factor.value} (${factor.impact})</li>`)
        .join('');
    
    // Show recommendations
    recommendationsDiv.innerHTML = `
        <h4>Recommendations:</h4>
        <p>${getRecommendations(result.severity)}</p>
        <div class="recommendation-actions">
            <button class="btn small" onclick="window.location.href='#about'">
                <i class="fas fa-book-medical"></i> Learn More
            </button>
            <button class="btn small" id="connectBtn">
                <i class="fas fa-user-md"></i> Consult Specialist
            </button>
        </div>
    `;
    
    // Show result section
    predictionResult.style.display = 'block';
}

// Helper Functions
function identifyKeyFactors(formData, severity) {
    const factors = [];
    
    // Smoking history
    if (formData.smoking_status > 0 && formData.pack_years >= 10) {
        factors.push({
            name: "Smoking History",
            value: `${formData.pack_years} pack-years`,
            impact: severity >= 2 ? "Major risk factor" : "Significant contributor"
        });
    }
    
    // Lung function
    if (formData.fev1_fvc_ratio < 0.7) {
        factors.push({
            name: "FEV1/FVC Ratio",
            value: formData.fev1_fvc_ratio.toFixed(2),
            impact: "Key diagnostic indicator"
        });
    }
    
    // Symptoms
    if (formData.sgrq_score >= 50) {
        factors.push({
            name: "Symptom Score",
            value: formData.sgrq_score,
            impact: "High symptom burden"
        });
    }
    
    return factors;
}

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
document.addEventListener('click', (e) => {
    if (e.target.id === 'connectBtn') {
        window.location.href = '#connect';
    }
});