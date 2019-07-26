// Play again
function resetNewGame() {
    gameScene.visible = true;
    resultBoard.visible = false;

    // Reset data
    canStart = true;
    answerIsCorrect = false;
    numOfWinRounds = 0;
    currentRound = 1;
    totalScore = 0;
    numberCorrectPairs = 0;
    newGame();
}

// Set up sprites
function showAndHideSprites() {
    // Hide result board, show background
    [background, cards, person, introduceScene, nextBtn1].forEach(el => {
        el.visible = true;
    });

    [
        introduceText,
        titleText,
        tutorialScene1,
        tutorialScene2,
        nextBtn2,
        choice1,
        choice2,
        choice3,
        choice1Text,
        choice2Text,
        choice3Text,
        startGameText,
        titleTypeText,
        gameScene,
        resultBoard,
        miss,
        great,
        perfect,
        breakText
    ].forEach(el => {
        el.visible = false;
    });
}

// Move to reset screen
function returnResult() {
    // Track current scene
    currentScene++;

    // Hide game scene, show result board
    gameScene.visible = false;
    resultBoard.visible = true;

    // Show right answers/ total answers
    calculateRightAnswers();

    // Score
    calculateTotalScore();

    // Age
    calculateAge();
}

// Move to next Scene
function moveToNextScene() {
    if (currentScene === 1) {
        moveToTutorial1();
    } else if (currentScene === 2) {
        moveToTutorial2();
    }
    currentScene++;
}

// Reset 2 choices
function resetChoices() {
    firstCard = undefined;
    firstSprite = undefined;
    firstIcon = undefined;
    secondCard = undefined;
    secondSprite = undefined;
    secondIcon = undefined;
}

// Flip random cards
function flipRandomCards() {
    let randomNums = [];

    // Random some numbers, list's length === number of hint cards
    while (randomNums.length < numOfHintCards) {
        let randomNum = randomInt(0, totalCards);
        if (randomNums.indexOf(randomNum) == -1) {
            randomNums.push(randomNum);
        }
    }

    // From random numbers, use as card's indexes, flip cards
    randomNums.forEach(index => {
        flipCard(
            listOfCardSprites[index].sprite,
            listOfCardSprites[index].card,
            true
        );
    });
}

// Collect names of icons
function collectIconNames() {
    for (let i = 1; i <= 10; i++) {
        let iconName = `icon${i}.png`;
        allIconNames.push(iconName);
    }
}

// Set up for the next turn
function prepareNextTurn() {
    if (!answerIsCorrect) {
        // Cover the cards
        coverCards();
    }

    // Hide Status
    hideStatus();

    // If > wrong answer limited
    if (numOfWrongAnswers > wrongAnswerLimited) {
        // Track current round index
        currentRound++;

        // Next Game or return result
        if (currentRound <= TOTAL_ROUNDS) {
            newGame();
        } else if (currentRound > TOTAL_ROUNDS) {
            returnResult();
        }
    } else if (numOfWrongAnswers <= wrongAnswerLimited) {
        // If < limit wrong answers
        // If all card were opened
        if (numOfOpenedCards === totalCards) {
            numOfWinRounds++;
            currentRound++;
            if (currentRound <= TOTAL_ROUNDS) {
                newGame();
            } else if (currentRound > TOTAL_ROUNDS) {
                returnResult();
            }
        }
    }

    // Reset 2 choices
    resetChoices();
}

// Random card icons from icon's name list
function randomCardIcons(total) {
    gameIcons = [];
    while (gameIcons.length < total) {
        let randomIcon = allIconNames[randomInt(0, allIconNames.length)];
        if (gameIcons.indexOf(randomIcon) == -1) {
            gameIcons.push(randomIcon, randomIcon);
        }
    }
}

// Create and render cards
function createCardList(total) {
    // Delete old list
    listOfCardSprites = [];

    // Icon's row, column && index
    let numberOfColumns = 5;
    let numberOfRows = Math.ceil(total / 5);
    let iconIndex = 0;

    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            if (i * numberOfColumns + j < total) {
                // Create card sprite
                let cardSprite = new Sprite();
                cardSprite.width = 35;
                cardSprite.height = 51.5;
                cardSprite.buttonMode = true;
                cardSprite.interactive = true;
                cardsContainer.addChild(cardSprite);

                // Create Card's instance
                let card = new Card(gameIcons[iconIndex]);

                // Show frontface of card
                cardSprite.texture = card.frontface();

                // Card's coordinates
                cardSprite.x = j * 45;
                cardSprite.y = i * 65;

                // Add to list
                listOfCardSprites.push({ sprite: cardSprite, card: card });

                // Track current icon index
                iconIndex++;

                // Card's event listener
                cardSprite.on("pointerdown", e => {
                    if (canPick) {
                        // After 2 cards were picked, turn off event
                        if (!firstCard || !secondCard) {
                            // This card has to be not selected yet
                            if (!card.isSelected()) {
                                // Flip card
                                flipCard(cardSprite, card);
                            }
                        }
                    }
                });
            }
        }
    }
}

// Flip card
function flipCard(sprite, card, isHintCard = false) {
    // Show the backface
    sprite.texture = card.backface();

    // Add icon to card
    let icon = card.iconSprite();
    icon.width = 23;
    icon.height = 23;
    cardsContainer.addChild(icon);
    icon.x = sprite.x + sprite.width / 2 - icon.width / 2;
    icon.y = sprite.y + sprite.height / 2 - icon.height / 2;

    // Push opened card to list (openedIcons) to delete later
    openedIcons.push(icon);

    // If this is not a hint-card show.
    if (!isHintCard) {
        // Track selected
        card.selected = true;

        // If this is the first choice
        if (!firstCard && !firstSprite && !firstIcon) {
            firstCard = card;
            firstSprite = sprite;
            firstIcon = icon;
        } else {
            // If this is the second choice
            secondCard = card;
            secondSprite = sprite;
            secondIcon = icon;
            timeEnd = new Date().getTime();
        }

        // Check Answer
        if (firstCard && secondCard) {
            checkAnswer();
        }
    } else {
        // Flip to frontface
        setTimeout(() => {
            sprite.texture = card.frontface();
            canPick = true;
            icon.destroy();

            // Track start time of the next choice
            timeStart = new Date().getTime();
        }, HINT_CARD_DELAY);
    }
}

// Check answer
function checkAnswer() {
    // If correct
    if (firstCard.value() === secondCard.value()) {
        // Track
        numOfOpenedCards += 2;
        numberCorrectPairs++;
        answerIsCorrect = true;
        // Show status
        showStatus("correct");
        calculateScoreEachPair();
    } else if (firstCard.value() !== secondCard.value()) {
        // If Wrong
        // Track
        numOfWrongAnswers++;
        answerIsCorrect = false;
        // Show status
        showStatus("wrong");
    }

    // Animate status, slide the status down
    setTimeout(() => {
        statusAnimation();
    }, STATUS_ANIMATION_TIME);

    // Clear data for the next turn
    setTimeout(() => {
        prepareNextTurn();
        // Time start of the new choice
        timeStart = new Date().getTime();
    }, NEXT_TURN_DELAY);
}

// Calculate score after 2 cards were picked
function calculateScoreEachPair() {
    let time = Math.floor((timeEnd - timeStart) / 1000);
    let baseScore = 1000,
        score;
    switch (gameType) {
        case 1:
            limitTime = LIMIT_TIME1;
            awardScore = EASY_AWARD_SCORE;
            correct10PairsScore = EASY_10_PAIRS_SCORE;
            break;
        case 2:
            limitTime = LIMIT_TIME1;
            awardScore = MED_AWARD_SCORE;
            correct10PairsScore = MED_10_PAIRS_SCORE;
            break;
        case 3:
            correct10PairsScore = HARD_10_PAIRS_SCORE;
            limitTime = LIMIT_TIME2;
            awardScore = HARD_AWARD_SCORE;
    }
    if (time <= limitTime) {
        score = baseScore + (awardScore * (limitTime - time)) / limitTime;
    } else {
        score = baseScore;
    }

    totalScore += score;

    if (numberCorrectPairs == 10) {
        totalScore = correct10PairsScore;
    } else if (numberCorrectPairs == 20) {
        awardScore += BONUS_SCORE;
        totalScore = 2 * correct10PairsScore + 20 * BONUS_SCORE;
    }
}

// Calculate total score
function calculateTotalScore() {
    scoreResult.text = totalScore;
}

// Calculate age
function calculateAge() {
    // Max pairs: easy: 17, med: 24, hard: 29
    // Max score:
    // Easy: 20k+7*2k =34k
    // Med: 50k + 10k + 4*3k = 72k
    // Hard: 60k + 10k + 9*3.5k = 101.5k
    let basicAge = 80,
        age;
    switch (gameType) {
        case 1:
            age = Math.round(basicAge - (totalScore * 60) / 34000);
            break;
        case 2:
            age = Math.round(basicAge - (totalScore * 60) / 72000);
            break;
        case 3:
            age = Math.round(basicAge - (totalScore * 60) / 101500);
    }
    ageResult.text = age;
}

// Calculate the number of right answers
function calculateRightAnswers() {
    numberRightResult.text = `${numOfWinRounds}/${TOTAL_ROUNDS}`;
}

// Start game after choosing game types
function startGame() {
    // Track current scene index
    currentScene++;

    // Hide backgrounds
    background.visible = false;
    gameScene.visible = true;

    // Create a new game
    newGame();
}

// Setup new game
function newGame() {
    // Set up game based on game type
    switch (gameType) {
        case 1:
            if (numOfWinRounds < 3) {
                numOfHintCards = 2;
                totalCards = 6;
                wrongAnswerLimited = 1;
            } else {
                numOfHintCards = 4;
                totalCards = 8;
                wrongAnswerLimited = 2;
            }
            break;
        case 2:
            if (numOfWinRounds < 1) {
                totalCards = 8;
                numOfHintCards = 4;
                wrongAnswerLimited = 2;
            } else {
                totalCards = 10;
                numOfHintCards = 4;
                wrongAnswerLimited = 2;
            }
            break;
        case 3:
            if (numOfWinRounds < 1) {
                totalCards = 10;
                numOfHintCards = 4;
                wrongAnswerLimited = 2;
            } else {
                totalCards = 12;
                numOfHintCards = 6;
                wrongAnswerLimited = 2;
            }
    }

    // Show break scene
    if (wrongAnswerLimited === 1) {
        breakText.texture = id["break-text-1.png"];
    } else if (wrongAnswerLimited === 2) {
        breakText.texture = id["break-text-2.png"];
    }
    breakText.visible = true;

    // Delete old icons
    if (openedIcons) {
        openedIcons.forEach(el => el.destroy());
    }

    // Random Icons for current game --> return gameIcons
    gameIcons = [];
    randomCardIcons(totalCards);
    shuffleArray(gameIcons);

    // Delete old cards
    if (listOfCardSprites) {
        listOfCardSprites.forEach(el => {
            el.sprite.destroy();
        });
    }

    setTimeout(() => {
        // Hide break scene
        breakText.visible = false;

        // Create new list of cards for the current game
        createCardList(totalCards);

        // Not allowed to pick cards
        canPick = false;

        // Flip random cards
        flipRandomCards();
    }, BREAK_SCREEN_DELAY);

    // Reset for new turn
    numOfWrongAnswers = 0;
    numOfOpenedCards = 0;
}
