document.getElementById("joinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const code = document.getElementById("sessionCode").value.trim().toUpperCase();
  const pollData = JSON.parse(localStorage.getItem("activePoll"));
  const errorMsg = document.getElementById("errorMsg");

  if (!pollData) {
    errorMsg.textContent = "❌ No active poll found!";
    return;
  }

  const now = Date.now();
  const timeDiff = (now - pollData.createdAt) / 1000; // in seconds

  if (pollData.sessionCode !== code) {
    errorMsg.textContent = "❌ Invalid session code!";
  } else if (timeDiff > 30) {
    errorMsg.textContent = "⏱️ Session code expired! (Only valid for 30 seconds)";
  } else {
    // Valid session code and not expired
    localStorage.setItem("userSessionCode", code);
    window.location.href = "vote.html";
  }
});
