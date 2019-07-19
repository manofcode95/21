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
            [choice2, choice3].forEach(el => {
                el.width = 42;
                el.height = 42;
            });
            choice1.width = 50;
            choice1.height = 50;
            break;
        case 2:
            [choice1, choice3].forEach(el => {
                el.width = 42;
                el.height = 42;
            });
            choice2.width = 50;
            choice2.height = 50;
            break;
        case 3:
            [choice1, choice2].forEach(el => {
                el.width = 42;
                el.height = 42;
            });
            choice3.width = 50;
            choice3.height = 50;
            break;
    }
}
