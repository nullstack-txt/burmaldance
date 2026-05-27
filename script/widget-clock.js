document.addEventListener("DOMContentLoaded", () => {
    const clockWidget = document.getElementById("clockWidget");
    
    if (clockWidget && typeof makeElementDraggable === "function") {
        makeElementDraggable(clockWidget, null, [".game"]);
    }
});