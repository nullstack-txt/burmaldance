document.addEventListener("DOMContentLoaded", () => {
    const timeElement = document.getElementById("clockTime");
    const dateElement = document.getElementById("clockDate");

    function updateClock() {
        const now = new Date();

        let hours = String(now.getHours()).padStart(2, "0");
        let minutes = String(now.getMinutes()).padStart(2, "0");
        let seconds = String(now.getSeconds()).padStart(2, "0");

        timeElement.textContent = `${hours}:${minutes}:${seconds}`;

        const dateOptions = { day: 'numeric', month: 'long' };
        const weekdayOptions = { weekday: 'long' };

        let dateString = now.toLocaleDateString('ru-RU', dateOptions);
        let weekdayString = now.toLocaleDateString('ru-RU', weekdayOptions);

        dateElement.textContent = `${dateString}, ${weekdayString}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
});