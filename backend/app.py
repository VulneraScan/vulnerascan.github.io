
from flask import Flask, request, jsonify
from utils import is_phishing
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/check", methods=["POST"])
def check_url():
    data = request.get_json()
    url = data.get("url")
    if not url:
        return jsonify({"error": "URL missing"}), 400
    result = is_phishing(url)
    return jsonify({"url": url, "phishing": result})

if __name__ == '__main__':
    app.run(debug=True)
