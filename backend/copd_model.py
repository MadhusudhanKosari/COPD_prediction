import sys
import numpy as np
import pandas as pd
import joblib  # For loading your saved model

# Load your pre-trained model and scaler
model = joblib.load('copd_model.pkl')
scaler = joblib.load('scaler.pkl')

# Get input data from command line arguments
input_data = [
    float(sys.argv[1]),   # age
    float(sys.argv[2]),   # height
    float(sys.argv[3]),   # weight
    float(sys.argv[4]),   # bmi
    float(sys.argv[5]),   # fev1
    float(sys.argv[6]),   # fvc
    float(sys.argv[7]),   # pef
    float(sys.argv[8]),   # fev1_fvc_ratio
    float(sys.argv[9]),   # pack_years
    float(sys.argv[10]),  # diabetes
    float(sys.argv[11]),  # hypertension
    float(sys.argv[12]),  # muscular_weakness
    float(sys.argv[13]),  # gender
    float(sys.argv[14]),  # smoking_status
    float(sys.argv[15]),  # mwt1
    float(sys.argv[16]),  # mwt2
    float(sys.argv[17]),  # sgrq_score
    float(sys.argv[18])   # exercise_tolerance
]

# Convert to numpy array and reshape
input_array = np.asarray(input_data).reshape(1, -1)

# Scale the input data
scaled_input = scaler.transform(input_array)

# Make prediction
prediction = model.predict(scaled_input)
probabilities = model.predict_proba(scaled_input)

# Get confidence score (probability of predicted class)
confidence = np.max(probabilities)

# Output prediction and confidence
print(prediction[0])
print(confidence)