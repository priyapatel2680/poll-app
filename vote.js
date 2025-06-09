const pollData = JSON.parse(localStorage.getItem("activePoll"));
const questionElement = document.getElementById("pollQuestion");
const optionsArea = document.getElementById("optionsArea");

if (!pollData) {
  questionElement.textContent = "Poll not found!";
} else {
  questionElement.textContent = pollData.question;

  // Show all options
  pollData.options.concat(pollData.optional || []).forEach((opt, index) => {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "vote";
    radio.value = opt;
    radio.id = "opt" + index;

    const label = document.createElement("label");
    label.setAttribute("for", "opt" + index);
    label.textContent = opt;

    optionsArea.appendChild(radio);
    optionsArea.appendChild(label);
    optionsArea.appendChild(document.createElement("br"));
  });
}

// Handle vote submit
document.getElementById("voteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const selected = document.querySelector('input[name="vote"]:checked');

  if (!selected) {
    alert("Please select an option before submitting.");
    return;
  }

  const votedOption = selected.value;

  // Get previous results or create new
  let results = JSON.parse(localStorage.getItem("pollResults")) || {};

  // Initialize votes
  if (!results[pollData.sessionCode]) {
    results[pollData.sessionCode] = {};
  }

  if (!results[pollData.sessionCode][votedOption]) {
    results[pollData.sessionCode][votedOption] = 0;
  }

  // Increase vote count
  results[pollData.sessionCode][votedOption] += 1;

  // Save back
  localStorage.setItem("pollResults", JSON.stringify(results));

  // Optional: show message or redirect
  document.getElementById("message").textContent = "✅ Vote submitted!";
  setTimeout(() => {
    window.location.href = "result.html";
  }, 1500);
});
