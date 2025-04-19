
# PhishShield

**PhishShield** is a real-time phishing detection web tool with a backend ML API. Built for educational and security research purposes.

## Features
- Frontend to input a URL and get phishing status
- ML-based backend to detect phishing based on URL features
- Flask REST API to communicate with browser

## How to Run

### Backend
```bash
cd backend
pip install flask joblib scikit-learn
python app.py
```

### Frontend
- Open `web-ui/index.html` in your browser
- Enter a URL and press Check

## Future Improvements
- Better feature extraction
- Integrate with public phishing databases
- Add user reporting system
