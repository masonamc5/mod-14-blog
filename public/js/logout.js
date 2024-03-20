const updateLogoutButtonDisplay = async () => {
    try {
      const response = await fetch("/api/users/login-state");
      if (response.ok) {
        const { loggedIn } = await response.json();
        const logoutBtn = document.getElementById("logoutBtn");
        if (loggedIn) {
          logoutBtn.style.display = "inline";
        } else {
          logoutBtn.style.display = "none";
        }
      }
    } catch (error) {
      console.error("Error fetching login state:", error);
    }
  };
  
  const logoutHandler = async () => {
    console.log("logoutstuff");
    try {
      const response = await fetch("users/logout", {
        method: "POST",
      });
  
      console.log("response", response);
  
      if (response.ok) {
        window.location.replace("/");
        console.log(response);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  document.getElementById("logoutBtn").addEventListener("click", logoutHandler);
  
  window.addEventListener("load", updateLogoutButtonDisplay);
  