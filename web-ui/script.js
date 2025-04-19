
async function checkURL() {
  const url = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.textContent = "Please enter a URL!";
    return;
  }

  resultDiv.textContent = "Checking...";

  try {
    const response = await fetch("http://localhost:5000/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.phishing) {
      resultDiv.textContent = "⚠️ This URL is likely a phishing site!";
      resultDiv.style.color = "red";
    } else {
      resultDiv.textContent = "✅ This URL seems safe.";
      resultDiv.style.color = "green";
    }
  } catch (error) {
    resultDiv.textContent = "Error checking URL. Make sure backend is running.";
    resultDiv.style.color = "gray";
  }
}
