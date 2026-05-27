document.addEventListener("DOMContentLoaded", () => {
    const resetAllBtn = document.getElementById("resetAllBtn");
    const resetBgBtn = document.getElementById("resetBgBtn");
    const resetBtnBgBtn = document.getElementById("resetBtnBgBtn");
    
    const clickBtn = document.getElementById("clickBtn");
    const defaultBg = "http://images.hdqwalls.com/download/windows-11-blue-material-3y-2560x1080.jpg";

    if (resetBgBtn) {
        resetBgBtn.addEventListener("click", () => {
            localStorage.removeItem("background");
            document.body.style.backgroundImage = `url(${defaultBg})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
        });
    }

    if (resetBtnBgBtn) {
        resetBtnBgBtn.addEventListener("click", () => {
            localStorage.removeItem("buttonBackground");
            if (clickBtn) {
                clickBtn.style.backgroundImage = ""; 
            }
        });
    }

    if (resetAllBtn) {
        resetAllBtn.addEventListener("click", () => {
            localStorage.removeItem("background");
            localStorage.removeItem("buttonBackground");
            localStorage.removeItem("buttonText");

            document.body.style.backgroundImage = `url(${defaultBg})`;
            
            if (clickBtn) {
                clickBtn.style.backgroundImage = "";
                clickBtn.textContent = "CLICK";
            }
        });
    }
});