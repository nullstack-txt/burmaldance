document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
    }
});

document.addEventListener("mousedown", (e) => {
    if (e.button === 2) e.preventDefault();
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

setInterval(() => {
    document.getElementById("cps").textContent = cps + " CPS";
    cps = 0;
}, 1000);