// Event Listeners
function listenToEvent() {
    // Click next button
    [nextBtn1, nextBtn2].forEach(el => el.on("pointerdown", moveToNextScene));

    // Choose game type
    choice1.on("pointerdown", () => {
        canStart = true;
        gameType = 1;
        choiceEffect(gameType);
    });

    choice2.on("pointerdown", () => {
        canStart = true;
        gameType = 2;
        choiceEffect(gameType);
    });

    choice3.on("pointerdown", () => {
        canStart = true;
        gameType = 3;
        choiceEffect(gameType);
    });

    // Click startGameText
    startGameText.on("pointerdown", () => {
        if (canStart) {
            startGame();
        }
    });

    // Listen to reset button
    resetText.on("pointerdown", resetNewGame);
}

// Choice effects
function choiceEffect(type) {
    switch (type) {
        case 1:
            arrow.x = choice1.x;
            break;
        case 2:
            arrow.x = choice2.x;
            break;
        case 3:
            arrow.x = choice3.x;
            break;
    }
}
