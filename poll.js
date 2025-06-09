document.getElementById("pollForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const question = document.getElementById("question").value.trim();
  const option1 = document.getElementById("option1").value.trim();
  const option2 = document.getElementById("option2").value.trim();
  const option3 = document.getElementById("option3").value.trim();
  const option4 = document.getElementById("option4").value.trim();

  const words = ["VOTE", "YES", "FAST", "COOL", "BLUE", "TOP", "GO"];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const randomNum = Math.floor(100 + Math.random() * 900);
  const sessionCode = randomWord + randomNum;

  const pollData = {
    question: question,
    options: [option1, option2],
    optional: [],
    sessionCode: sessionCode,
    createdAt: Date.now()
  };

  if (option3) pollData.optional.push(option3);
  if (option4) pollData.optional.push(option4);

  // Save poll to localStorage
  localStorage.setItem("activePoll", JSON.stringify(pollData));

  // Show code and reveal Proceed button
  const msgArea = document.getElementById("successMsg");
  msgArea.innerHTML = `
  ✅ Poll created!
    Session Code: <strong>${sessionCode}</strong><br>
    👉 Use this code to join
  `;

  const proceedBtn = document.getElementById("proceedBtn");
  proceedBtn.style.display = "inline-block";

  // Redirect on click
  proceedBtn.addEventListener("click", () => {
    window.location.href = "join_poll.html";
  });
});
