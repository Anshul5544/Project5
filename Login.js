document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Basic client-side validation
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      // Send login data to the server
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Login successful!");
        // Redirect to the main page or dashboard
        window.location.href = "/dashboard";
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });
  const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Sample users (in a real app, you'd fetch this from a database)
const users = [
  { id: 1, email: "user@example.com", password: "$2b$10$..." }, // hashed password
];

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ success: false, message: "User not found" });

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

  // If successful
  res.json({ success: true, message: "Login successful" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});