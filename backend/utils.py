
import joblib
import re
from urllib.parse import urlparse

model = joblib.load("model/phishing_model.pkl")

def extract_features(url):
    features = []
    features.append(len(url))
    features.append(url.count('@'))
    features.append(url.count('-'))
    features.append(url.count('https'))
    features.append(url.count('http'))
    parsed = urlparse(url)
    features.append(len(parsed.netloc))
    return features

def is_phishing(url):
    features = extract_features(url)
    prediction = model.predict([features])
    return bool(prediction[0])
