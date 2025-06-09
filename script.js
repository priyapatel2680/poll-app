document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // For now, no real auth – just go ahead
  if (email && password) {
    localStorage.setItem("adminEmail", email);
    window.location.href = "poll.html";
  } else {
    alert("Please enter valid details.");
  }
});
