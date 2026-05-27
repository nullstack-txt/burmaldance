function createPlus(x, y) {
    const plus = document.createElement("div");

    plus.className = "plus";
    plus.textContent = "+" + clickPower;

    plus.style.left = x + "px";
    plus.style.top = y + "px";

    document.getElementById("effects").appendChild(plus);

    setTimeout(() => {
        plus.remove();
    }, 700);
}