let score = Number(localStorage.getItem("score")) || 0;
let cps = 0;
let clickPower = 1;

const scoreText = document.getElementById("score");
scoreText.textContent = score;