document.addEventListener("DOMContentLoaded", () => {
    const clockWidget = document.getElementById("clockWidget");
    
    if (clockWidget && typeof makeElementDraggable === "function") {
        // Указываем часам, что меню кликера — это бетонная стена, на которую нельзя налезать
        makeElementDraggable(clockWidget, null, [".game"], true);
    }
});