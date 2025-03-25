from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

model = joblib.load('copd_model.pkl')
scaler = joblib.load('scaler.pkl')

FEATURES_ORDER = [
    'age', 'height', 'weight', 'bmi', 'fev1', 'fvc', 
    'pef', 'fev1_fvc_ratio', 'pack_years', 'diabetes',
    'hypertension', 'muscular_weakness', 'gender', 
    'smoking_status', 'mwt1', 'mwt2', 'sgrq_score',
    'exercise_tolerance', 'cough', 'breathlessness',
    'wheezing', 'exacerbations', 'medications'
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        features = [float(data[field]) for field in FEATURES_ORDER]
        scaled = scaler.transform(np.array(features).reshape(1, -1))
        prediction = int(model.predict(scaled)[0])
        return jsonify({
            'severity': prediction,
            'risk_level': ['None', 'Mild', 'Moderate', 'Severe'][prediction]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)