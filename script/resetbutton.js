const resetBtnBgBtn = document.getElementById("resetBtnBgBtn");

resetBtnBgBtn.addEventListener("click", () => {
    const clickBtn = document.getElementById("clickBtn");

    clickBtn.style.backgroundImage = "";
    localStorage.removeItem("buttonBackground");
});