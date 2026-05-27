document.addEventListener("DOMContentLoaded", () => {

    const btnBgInput = document.getElementById("btnBgInput");
    const btnBgBtn = document.getElementById("btnBgBtn");
    const clickBtn = document.getElementById("clickBtn");
    
    const savedBtnBg = localStorage.getItem("buttonBackground");
    
    if (savedBtnBg) {
        clickBtn.style.backgroundImage = `url(${savedBtnBg})`;
        clickBtn.style.backgroundSize = "cover";
        clickBtn.style.backgroundPosition = "center";
    }
    
    btnBgBtn.addEventListener("click", () => {
        let url = normalizeImageUrl(btnBgInput.value);
        if (!url) return;
    
        clickBtn.style.backgroundImage = `url(${url})`;
        clickBtn.style.backgroundSize = "cover";
        clickBtn.style.backgroundPosition = "center";
    
        localStorage.setItem("buttonBackground", url);
    });
    
    });