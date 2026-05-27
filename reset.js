document.addEventListener("DOMContentLoaded", () => {
    const resetAllBtn = document.getElementById("resetAllBtn");
    const resetBgBtn = document.getElementById("resetBgBtn");
    const resetBtnBgBtn = document.getElementById("resetBtnBgBtn");
    const clickBtn = document.getElementById("clickBtn");

    resetAllBtn.addEventListener("click", () => {
        if (resetBgBtn) resetBgBtn.click();
        if (resetBtnBgBtn) resetBtnBgBtn.click();

        localStorage.removeItem("buttonText");
        if (clickBtn) {
            clickBtn.textContent = "CLICK";
        }
    });
});