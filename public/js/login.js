const loginForm = document.getElementById("login-form");
console.log("login form is seen");

let loginFormHandler = async (event) => {
  event.preventDefault();

  console.log("login form is seen");

  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (email && password) {
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      console.log("RESPONSE", response);

      if (response.ok) {
        window.location.replace("/");
      } else {
        alert("Log in Failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  }
};

loginForm.addEventListener("submit", loginFormHandler);
