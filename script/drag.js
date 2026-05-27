document.addEventListener("DOMContentLoaded", () => {

    function makeElementDraggable(widget, handleSelector) {
        const handle = handleSelector ? widget.querySelector(handleSelector) : widget;
        if (!handle) return;

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        handle.style.cursor = "move";

        handle.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return; 

            const targetTag = e.target.tagName.toLowerCase();
            const isInteractive = targetTag === 'button' || 
                            targetTag === 'input' || 
                            targetTag === 'a' || 
                            targetTag === 'select' || 
                            e.target.closest('button');
            
            if (isInteractive) return;

            const rect = widget.getBoundingClientRect();

            widget.style.position = "absolute";
            widget.style.left = rect.left + "px";
            widget.style.top = rect.top + "px";
            widget.style.transform = "none";
            widget.style.margin = "0";

            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            isDragging = true;
        });

        function moveAt(clientX, clientY) {
            let newX = clientX - offsetX;
            let newY = clientY - offsetY;

            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;

            if (newX + widget.offsetWidth > window.innerWidth) {
                newX = window.innerWidth - widget.offsetWidth;
            }
            if (newY + widget.offsetHeight > window.innerHeight) {
                newY = window.innerHeight - widget.offsetHeight;
            }

            widget.style.left = newX + "px";
            widget.style.top = newY + "px";
        }

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            moveAt(e.clientX, e.clientY);
        });

        window.addEventListener("mouseup", () => {
            isDragging = false;
        });

        const widgetResizeObserver = new ResizeObserver(() => {
            if (widget.style.position !== "absolute") return;

            let rect = widget.getBoundingClientRect();

            if (rect.right > window.innerWidth) {
                let correctedLeft = window.innerWidth - rect.width;
                widget.style.left = (correctedLeft < 0 ? 0 : correctedLeft) + "px";
            }
            if (rect.bottom > window.innerHeight) {
                let correctedTop = window.innerHeight - rect.height;
                widget.style.top = (correctedTop < 0 ? 0 : correctedTop) + "px";
            }
        });

        widgetResizeObserver.observe(widget);
    }

    const gameWidget = document.querySelector(".game");
    if (gameWidget) {
        makeElementDraggable(gameWidget, "h1");
    }

    const clockWidget = document.getElementById("clockWidget");
    if (clockWidget) {
        makeElementDraggable(clockWidget, null);
    }

});