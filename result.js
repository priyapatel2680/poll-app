const pollData = JSON.parse(localStorage.getItem("activePoll"));
const results = JSON.parse(localStorage.getItem("pollResults")) || {};
const question = document.getElementById("pollQuestion");
const ctx = document.getElementById("resultChart").getContext("2d");

if (!pollData || !results[pollData.sessionCode]) {
  question.textContent = "❌ Poll results not found.";
} else {
  question.textContent = pollData.question;

  const votes = results[pollData.sessionCode];

  const labels = Object.keys(votes);
  const data = Object.values(votes);

  new Chart(ctx, {
    type: "bar", // you can change to 'pie' also
    data: {
      labels: labels,
      datasets: [{
        label: "Votes",
        data: data,
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#e91e63",
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}
