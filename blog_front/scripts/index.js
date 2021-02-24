// Global variables
let token;
let logoutButton = document.querySelector(".logout");

window.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("author-auth");
  if (!token) window.location.href = "../pages/login.html";
});
// Functions
let logout = async () => {
  try {
    let response = await fetch("http://localhost:3000/blog/author/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "author-token": token,
      },
    });
    if (response.status != 200) throw await response.json();
    localStorage.removeItem("author-auth");
    window.location.href = "../pages/main.html";
  } catch (e) {
    alert(e);
  }
};

// Events

logoutButton.addEventListener("click", logout);
