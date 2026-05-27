document.addEventListener("DOMContentLoaded", () => {
    const gameWindow = document.querySelector(".game");

    let currentWidth = gameWindow.offsetWidth || 530; 
    let currentHeight = gameWindow.offsetHeight || 730;

    const scaleStep = 25; 

    window.addEventListener("wheel", (e) => {
        if (e.ctrlKey) {
            e.preventDefault(); 

            let nextWidth = currentWidth;
            let nextHeight = currentHeight;

            if (e.deltaY < 0) {
                nextWidth += scaleStep;
                nextHeight += scaleStep * 1.4;
            } else {
                nextWidth -= scaleStep;
                nextHeight -= scaleStep * 1.4;
            }

            if (nextWidth > window.innerWidth * 0.95 || nextHeight > window.innerHeight * 0.95) return;
            if (nextWidth < 530 || nextHeight < 730) return;

            currentWidth = nextWidth;
            currentHeight = nextHeight;

            gameWindow.style.width = currentWidth + "px";
            gameWindow.style.height = currentHeight + "px";

            let rect = gameWindow.getBoundingClientRect();
            
            if (rect.right > window.innerWidth) {
                let newLeft = window.innerWidth - rect.width;
                gameWindow.style.left = (newLeft < 0 ? 0 : newLeft) + "px";
            }
            if (rect.bottom > window.innerHeight) {
                let newTop = window.innerHeight - rect.height;
                gameWindow.style.top = (newTop < 0 ? 0 : newTop) + "px";
            }
        }
    }, { passive: false });
});