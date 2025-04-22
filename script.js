import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMjOmacTz4dWHun_SyEl2wBDkOvsYd2Og",
  authDomain: "password-strength-d1a55.firebaseapp.com",
  projectId: "password-strength-d1a55",
  storageBucket: "password-strength-d1a55",
  messagingSenderId: "956613461297",
  appId: "1:956613461297:web:941c7b5168296fae7bdc10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const counterRef = doc(db, "meta", "userCount");

// Update and listen for user count
onSnapshot(counterRef, (docSnap) => {
  if (docSnap.exists()) {
    document.getElementById("userCount").textContent = docSnap.data().count;
  }
});

window.addEventListener("load", async () => {
  try {
    await updateDoc(counterRef, { count: increment(1) });
  } catch (err) {
    console.error("Error updating user count:", err);
  }
});

// DOM elements
const passwordInput = document.getElementById("passwordInput");
const strengthBar = document.getElementById("strengthBar");
const crackTime = document.getElementById("crackTime");
const reviewText = document.getElementById("reviewText");
const lower = document.getElementById("lower");
const upper = document.getElementById("upper");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const toggleBtn = document.getElementById("darkToggle");

// Password analysis logic
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const length = password.length;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  lower.className = hasLower ? "valid" : "invalid";
  upper.className = hasUpper ? "valid" : "invalid";
  number.className = hasNumber ? "valid" : "invalid";
  symbol.className = hasSymbol ? "valid" : "invalid";

  const charsetSize =
    (hasLower ? 26 : 0) +
    (hasUpper ? 26 : 0) +
    (hasNumber ? 10 : 0) +
    (hasSymbol ? 32 : 0);

  const combinations = Math.pow(charsetSize, length);
  const attemptsPerSecond = 1e9;
  const timeToCrack = combinations / attemptsPerSecond;

  const displayTime =
    timeToCrack < 1
      ? `${timeToCrack.toFixed(2)} seconds`
      : timeToCrack < 60
      ? `${Math.ceil(timeToCrack)} seconds`
      : timeToCrack < 3600
      ? `${Math.ceil(timeToCrack / 60)} minutes`
      : timeToCrack < 86400
      ? `${Math.ceil(timeToCrack / 3600)} hours`
      : timeToCrack < 31536000
      ? `${Math.ceil(timeToCrack / 86400)} days`
      : `${Math.ceil(timeToCrack / 31536000)} years`;

  crackTime.textContent = displayTime;

  let strength = 0;
  if (length >= 8) strength++;
  if (hasLower) strength++;
  if (hasUpper) strength++;
  if (hasNumber) strength++;
  if (hasSymbol) strength++;

  if (length < 3) {
    strengthBar.textContent = "Very Weak";
    strengthBar.className = "strength-bar very-weak";
    reviewText.textContent =
      "Review: Oh dear, using that password is like leaving your front door wide open.";
  } else if (strength <= 2) {
    strengthBar.textContent = "Weak";
    strengthBar.className = "strength-bar weak";
    reviewText.textContent =
      "Review: That password won't last long. Consider adding more variety.";
  } else if (strength === 3 || strength === 4) {
    strengthBar.textContent = "Medium";
    strengthBar.className = "strength-bar medium";
    reviewText.textContent =
      "Review: Not bad, but you could do better. Mix it up more.";
  } else {
    strengthBar.textContent = "Strong";
    strengthBar.className = "strength-bar strong";
    reviewText.textContent = "Review: Excellent! That password is tough to crack.";
  }
});

// Dark mode toggle
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  toggleBtn.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", theme);
}

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}
