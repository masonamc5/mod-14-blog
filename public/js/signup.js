const signupForm = document.getElementById("signup-form");

let signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (username && email && password) {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        window.location.replace("/"); 
      } else {

        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred while signing up. Please try again later.");
    }
  }
};

signupForm.addEventListener("submit", signupFormHandler);
