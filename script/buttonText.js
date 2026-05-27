document.addEventListener("DOMContentLoaded", () => {

    const btnTextInput = document.getElementById("btnTextInput");
    const btnTextBtn = document.getElementById("btnTextBtn");
    const clickBtn = document.getElementById("clickBtn");
    
    btnTextBtn.addEventListener("click", () => { 

        let text = btnTextInput.value.slice(0, 10);

        clickBtn.textContent = text;
        localStorage.setItem("buttonText", text);
    
        localStorage.setItem("buttonText", text);
    });
    
    const savedText = localStorage.getItem("buttonText");
    
    if (savedText) {
        clickBtn.textContent = savedText.slice(0, 10);
    }
    
    });