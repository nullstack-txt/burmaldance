document.addEventListener("DOMContentLoaded", () => {

    const bgInput = document.getElementById("bgInput");
    const bgBtn = document.getElementById("bgBtn");
    const resetBgBtn = document.getElementById("resetBgBtn");
    
    const savedBg = localStorage.getItem("background");
    const defaultBg = "http://images.hdqwalls.com/download/windows-11-blue-material-3y-2560x1080.jpg";

    const currentBg = savedBg || defaultBg;
    
    document.body.style.backgroundImage = `url(${currentBg})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    
    bgBtn.addEventListener("click", () => {
        let url = normalizeImageUrl(bgInput.value);
        if (!url) return;
    
        document.body.style.backgroundImage = `url(${url})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    
        localStorage.setItem("background", url);
    });
    
    resetBgBtn.addEventListener("click", () => {
        localStorage.removeItem("background");
        
        document.body.style.backgroundImage = `url(${defaultBg})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    });
    
});