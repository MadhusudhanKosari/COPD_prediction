# Use official Python image
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc python3-dev

# Copy model files and requirements
COPY backend/copd_model.pkl .
COPY backend/scaler.pkl .
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/server.py .

# Expose port
EXPOSE 5000

# Run the server
CMD ["python", "server.py"]