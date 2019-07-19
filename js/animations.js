// Animate status after 2 cards were picked
function statusAnimation() {
    [miss, great, perfect].forEach(el => {
        el.vy = 5;
    });
}
