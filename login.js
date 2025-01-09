const API_URL = "https://login-form-backend-ivimvqt4o-yasirmarwat09s-projects.vercel.app/api"; // Corrected URL

// Toggle between Sign Up and Sign In forms
function toggleForm() {
  const signupForm = document.getElementById("signup-form");
  const signinForm = document.getElementById("signin-form");
  const switchFormBtn = document.getElementById("switch-form-btn");

  if (signupForm.style.display === "none") {
    signupForm.style.display = "block";
    signinForm.style.display = "none";
    switchFormBtn.textContent = "Already have an account? Sign In";
  } else {
    signupForm.style.display = "none";
    signinForm.style.display = "block";
    switchFormBtn.textContent = "Don't have an account? Sign Up";
  }
}

// Sign Up Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message || data.error);
  } catch (error) {
    alert("Error in sign up. Please try again.");
    console.error(error);
  }
});

// Sign In Form Submission
document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Sign-in successful!");

      // Display the welcome page
      displayWelcomePage(data.username);

      // Hide the Sign-In Form and show the Protected Page button
      document.getElementById("signin-form").style.display = "none";
      document.getElementById("switch-form-btn").style.display = "none";
      document.getElementById("get-protected").style.display = "inline";
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("Error in sign in. Please try again.");
    console.error(error);
  }
});

// Display the Welcome Page
async function displayWelcomePage(username) {
  document.getElementById("welcome-page").style.display = "block";
  document.getElementById("username-display").textContent = username;
}

// Access the Protected Page (After Sign-In)
document.getElementById("get-protected").addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    document.getElementById("response").textContent = data.message || data.error;
  } catch (error) {
    alert("Error accessing protected page. Please try again.");
    console.error(error);
  }
});
