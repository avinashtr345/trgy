document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");
    const loginPage = document.getElementById("loginPage");
    const homePage = document.getElementById("homePage");
  
    // Check if the user is already logged in
    const userData = localStorage.getItem("userData");
    if (userData) {
      window.location.href = "home.html"; // Redirect to home page if already logged in
    }
  
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Validate username - it should only accept "emilys"
      if (username !== "emilys") {
        errorMessage.textContent = "Username must be 'emilys'.";
        return;
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
      }
  
      // Validate password length
      if (password.length < 8) {
        errorMessage.textContent = "Password must be at least 8 characters long.";
        return;
      }
  
      // Clear any previous error message
      errorMessage.textContent = "";
  
      // Prepare login data
      const loginData = {
        username,
        password,
        email,
        expiresInMins: 30,
      };
  
      try {
        // Send credentials to the API
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
  
        const data = await response.json();
  
        console.log("API Response:", data); // Log the full response from the API
  
        if (response.ok && data.token) {
          // Store token and user data in localStorage
          localStorage.setItem("userData", JSON.stringify(data));
          alert("Login successful!");
          loginPage.style.display = "none";
          homePage.style.display = "block"; // Show main page on success
        } else {
          // Show error message from the API response
          errorMessage.textContent = data.message || "Login failed. Please try again.";
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error occurred: ", error); // Log the error
        errorMessage.textContent = "An error occurred. Please try again later.";
      }
    });
  });
  