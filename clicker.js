const clickBtn = document.getElementById("clickBtn");


clickBtn.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    clickBtn.classList.add("clicked");

    setTimeout(() => {
        clickBtn.classList.remove("clicked");
    }, 50);

    score += clickPower;
    cps++;

    scoreText.textContent = score;
    localStorage.setItem("score", score);

    createPlus(e.clientX, e.clientY);
});