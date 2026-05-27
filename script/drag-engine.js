function makeElementDraggable(widget, handleSelector, siblingSelectors = [], canPushSiblings = true) {
    const handle = handleSelector ? widget.querySelector(handleSelector) : widget;
    if (!handle) return null; 

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    handle.style.cursor = "move";

    function initAbsolutePosition(el) {
        if (el.style.position === "absolute") return;

        const rect = el.getBoundingClientRect();
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        let offsetParent = el.offsetParent || document.body;
        const parentRect = offsetParent.getBoundingClientRect();

        el.style.position = "absolute";
        el.style.margin = "0";
        el.style.transform = "none";
        
        if (offsetParent === document.body) {
            el.style.left = (rect.left + scrollX) + "px";
            el.style.top = (rect.top + scrollY) + "px";
        } else {
            el.style.left = (rect.left - parentRect.left) + "px";
            el.style.top = (rect.top - parentRect.top) + "px";
        }
    }

    function getIntersection(r1, r2) {
        const overlapX = Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left);
        const overlapY = Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top);
        return (overlapX > 0 && overlapY > 0) ? { x: overlapX, y: overlapY } : null;
    }

    function clampToWindow(x, y, width, height) {
        return {
            x: Math.max(0, Math.min(x, window.innerWidth - width)),
            y: Math.max(0, Math.min(y, window.innerHeight - height))
        };
    }

    function resolveCollisions(targetWidget, newX, newY, selectors) {
        const gap = 15; 
        const tWidth = targetWidget.offsetWidth;
        const tHeight = targetWidget.offsetHeight;

        if (tWidth === 0 || tHeight === 0) return { x: newX, y: newY };

        let clamped = clampToWindow(newX, newY, tWidth, tHeight);
        newX = clamped.x;
        newY = clamped.y;

        let targetRect = {
            left: newX - gap,
            top: newY - gap,
            right: newX + tWidth + gap,
            bottom: newY + tHeight + gap
        };

        selectors.forEach(selector => {
            const sibling = document.querySelector(selector);
            if (!sibling || sibling === targetWidget || sibling.offsetWidth === 0) return;

            const sRect = sibling.getBoundingClientRect();
            const parentRect = sibling.offsetParent ? sibling.offsetParent.getBoundingClientRect() : { left: 0, top: 0 };
            
            const sX = sibling.style.position === "absolute" ? sibling.offsetLeft : (sRect.left - parentRect.left);
            const sY = sibling.style.position === "absolute" ? sibling.offsetTop : (sRect.top - parentRect.top);
            const sW = sibling.offsetWidth;
            const sH = sibling.offsetHeight;

            const siblingRect = {
                left: sX,
                top: sY,
                right: sX + sW,
                bottom: sY + sH
            };

            const intersection = getIntersection(targetRect, siblingRect);
            if (!intersection) return;

            if (intersection.x < intersection.y) {
                const pushRight = (targetRect.left + (targetRect.right - targetRect.left) / 2) < (siblingRect.left + sW / 2);
                
                if (canPushSiblings) {
                    let newSibX = pushRight ? siblingRect.left + intersection.x : siblingRect.left - intersection.x;
                    let clampedSib = clampToWindow(newSibX, sY, sW, sH);
                    
                    if (clampedSib.x !== newSibX) {
                        newX = pushRight ? clampedSib.x - tWidth - gap : clampedSib.x + sW + gap;
                    } else {
                        initAbsolutePosition(sibling);
                        sibling.style.left = clampedSib.x + "px";
                    }
                } else {
                    newX = pushRight ? siblingRect.left - tWidth - gap : siblingRect.right + gap;
                }
            } else {
                const pushDown = (targetRect.top + (targetRect.bottom - targetRect.top) / 2) < (siblingRect.top + sH / 2);
                
                if (canPushSiblings) {
                    let newSibY = pushDown ? siblingRect.top + intersection.y : siblingRect.top - intersection.y;
                    let clampedSib = clampToWindow(sX, newSibY, sW, sH);
                    
                    if (clampedSib.y !== newSibY) {
                        newY = pushDown ? clampedSib.y - tHeight - gap : clampedSib.y + sH + gap;
                    } else {
                        initAbsolutePosition(sibling);
                        sibling.style.top = clampedSib.y + "px";
                    }
                } else {
                    newY = pushDown ? siblingRect.top - tHeight - gap : siblingRect.bottom + gap;
                }
            }

            targetRect = {
                left: newX - gap,
                top: newY - gap,
                right: newX + tWidth + gap,
                bottom: newY + tHeight + gap
            };
        });

        return { x: newX, y: newY };
    }

    function forceCheck() {
        const parentRect = widget.offsetParent ? widget.offsetParent.getBoundingClientRect() : { left: 0, top: 0 };
        const wRect = widget.getBoundingClientRect();
        
        const currentX = widget.style.position === "absolute" ? widget.offsetLeft : (wRect.left - parentRect.left);
        const currentY = widget.style.position === "absolute" ? widget.offsetTop : (wRect.top - parentRect.top);

        const corrected = resolveCollisions(widget, currentX, currentY, siblingSelectors);

        if (corrected.x !== currentX || corrected.y !== currentY) {
            initAbsolutePosition(widget);
            widget.style.left = corrected.x + "px";
            widget.style.top = corrected.y + "px";
        }
    }

    handle.addEventListener("mousedown", (e) => {
        if (e.button !== 0 || e.target.closest('button, input, a, select')) return;
        initAbsolutePosition(widget);
        const rect = widget.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        isDragging = true;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let rawX = e.clientX - offsetX;
        let rawY = e.clientY - offsetY;

        if (widget.offsetParent && widget.offsetParent !== document.body) {
            const pRect = widget.offsetParent.getBoundingClientRect();
            rawX -= pRect.left;
            rawY -= pRect.top;
        }

        const corrected = resolveCollisions(widget, rawX, rawY, siblingSelectors);
        widget.style.left = corrected.x + "px";
        widget.style.top = corrected.y + "px";
    });

    window.addEventListener("mouseup", () => isDragging = false);

    const widgetResizeObserver = new ResizeObserver(() => {
        if (widget.style.position !== "absolute") return;
        resolveCollisions(widget, widget.offsetLeft, widget.offsetTop, siblingSelectors);
    });
    widgetResizeObserver.observe(widget);

    window.addEventListener("load", forceCheck);
    setTimeout(forceCheck, 100);

    return {
        checkNow: forceCheck
    };
}