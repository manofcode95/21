// Animate status after 2 cards were picked
function statusAnimation(delta) {
    [miss, great, perfect].forEach(el => {
        el.vy = 5;
    });
}

// Breath animation
function breathAnimation(sprite, top, bot, delta) {
    sprite.y += sprite.vy * delta;
    if (sprite.y >= top) {
        sprite.y = top;
        sprite.vy = -Math.abs(sprite.vy);
    }
    if (sprite.y <= bot) {
        sprite.y = bot;
        sprite.vy = Math.abs(sprite.vy);
    }
}

// Fade animation
function fadeAnimation(sprite, delta) {
    sprite.alpha += fadeSpeed * delta;
    if (sprite.alpha >= 1.4) {
        sprite.alpha = 1;
        fadeSpeed *= -1;
    }
    if (sprite.alpha <= -0.4) {
        sprite.alpha = 0;
        fadeSpeed *= -1;
    }
}
