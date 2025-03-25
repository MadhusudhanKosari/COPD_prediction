# backend/train_model.py
import numpy as np
import pandas as pd
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os

# 1. Create sample data (replace with your actual data loading later)
print("Creating sample dataset...")
data = {
    'age': np.random.randint(30, 80, 100),
    'height': np.random.randint(140, 200, 100),
    'weight': np.random.randint(40, 120, 100),
    # Add all 23 features from your original code here
    'COPDSEVERITY': np.random.randint(0, 4, 100)  # Target (0-3)
}
df = pd.DataFrame(data)

# 2. Prepare data
print("Preprocessing data...")
X = df.drop('COPDSEVERITY', axis=1)
y = df['COPDSEVERITY']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Create and train scaler
print("Training scaler...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# 4. Train model
print("Training model...")
models = [
    ('lr', LogisticRegression(max_iter=1000)),
    ('rf', RandomForestClassifier(n_estimators=100)),
    ('gb', GradientBoostingClassifier()),
    ('svc', SVC(probability=True))
]

voting_clf = VotingClassifier(estimators=models, voting='soft')
voting_clf.fit(X_train_scaled, y_train)

# 5. Save model files
print("Saving model files...")
joblib.dump(voting_clf, 'copd_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Verify files were created
print("\nVerification:")
print(f"copd_model.pkl exists: {os.path.exists('copd_model.pkl')}")
print(f"scaler.pkl exists: {os.path.exists('scaler.pkl')}")
print(f"Current directory: {os.getcwd()}")
print("\n✅ Model training complete!")