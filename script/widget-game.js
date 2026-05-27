document.addEventListener("DOMContentLoaded", () => {
    const gameWidget = document.querySelector(".game");
    
    if (gameWidget && typeof makeElementDraggable === "function") {
        makeElementDraggable(gameWidget, "h1", ["#clockWidget"]);
    }
});