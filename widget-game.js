document.addEventListener("DOMContentLoaded", () => {
    const gameWidget = document.querySelector(".game");
    
    if (gameWidget && typeof makeElementDraggable === "function") {
        // Третий параметр — массив элементов, которые игра не может перекрывать
        // Четвертый параметр true — разрешает расталкивать часы при столкновении
        makeElementDraggable(gameWidget, "h1", ["#clockWidget"], true);
    }
});