const resetBgBtn = document.getElementById("resetBgBtn");

resetBgBtn.addEventListener("click", () => {
    document.body.style.backgroundImage = "";
    document.body.style.background = "linear-gradient(135deg, #111827, #1f2937)";

    localStorage.removeItem("background");
});