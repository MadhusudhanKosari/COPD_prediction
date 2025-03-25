const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PythonShell } = require('python-shell');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// COPD Prediction Endpoint
app.post('/api/predict-copd', (req, res) => {
    const patientData = req.body;
    
    // Prepare data for Python script
    const options = {
        mode: 'text',
        pythonOptions: ['-u'], // unbuffered output
        scriptPath: './',
        args: [
            patientData.age,
            patientData.height,
            patientData.weight,
            patientData.bmi,
            patientData.fev1,
            patientData.fvc,
            patientData.pef,
            patientData.fev1_fvc_ratio,
            patientData.pack_years,
            patientData.diabetes,
            patientData.hypertension,
            patientData.muscular_weakness,
            patientData.gender, // 1=male, 0=female
            patientData.smoking_status, // 0=never, 1=former, 2=current
            patientData.mwt1,
            patientData.mwt2,
            patientData.sgrq_score,
            patientData.exercise_tolerance
        ]
    };

    PythonShell.run('copd_model.py', options, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Prediction failed' });
        }
        
        // Parse the prediction result
        const prediction = results[0];
        const confidence = parseFloat(results[1]);
        
        res.json({
            prediction: parseInt(prediction),
            confidence: confidence,
            risk_level: getRiskLevel(prediction),
            recommendations: getRecommendations(prediction)
        });
    });
});

function getRiskLevel(prediction) {
    const levels = ['No COPD', 'Mild COPD', 'Moderate COPD', 'Severe COPD'];
    return levels[prediction] || 'Unknown';
}

function getRecommendations(prediction) {
    const recommendations = {
        0: "No specific recommendations needed. Maintain healthy lifestyle.",
        1: "Consider pulmonary function tests. Monitor symptoms.",
        2: "Consult a pulmonologist. Consider bronchodilators.",
        3: "Immediate medical attention required. May need oxygen therapy."
    };
    return recommendations[prediction] || "Consult your healthcare provider.";
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});