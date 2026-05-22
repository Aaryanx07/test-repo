const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {

  e.preventDefault();

  window.location.href = "dashboard.html";

});
