// Move to tutorical screen 1
function moveToTutorial1() {
    introduceScene.visible = false;
    nextBtn1.visible = false;
    cards.visible = false;
    person.visible = false;
    introduceText.visible = true;
    titleText.visible = true;
    tutorialScene1.visible = true;
    nextBtn2.visible = true;
}

// Move to tutorical screen 2
function moveToTutorial2() {
    nextBtn2.visible = false;
    tutorialScene1.visible = false;
    tutorialScene2.visible = true;
    choice1.visible = true;
    choice2.visible = true;
    choice3.visible = true;
    startGameText.visible = true;
    titleTypeText.visible = true;
    choice1Text.visible = true;
    choice2Text.visible = true;
    choice3Text.visible = true;
}

// Render Result Screen
function renderResultScene() {
    // Big board for resultBoard
    bigBoard2 = new Sprite(id["big-board.png"]);
    bigBoard2.width = LOGICAL_WIDTH;
    bigBoard2.height = LOGICAL_HEIGHT;
    resultBoard.addChild(bigBoard2);
    bigBoard2.anchor.set(0.5);
    bigBoard2.x = LOGICAL_WIDTH / 2;
    bigBoard2.y = LOGICAL_HEIGHT / 2;

    // Result text
    resultStyle = new TextStyle({
        fontFamily: "Arial",
        fontSize: 100.4,
        fontWeight: "bold",
        fill: "#ffffff"
    });

    resultText = new Sprite(Texture.fromImage("result-title.png"));
    resultText.scale.set(0.3);
    resultText.anchor.set(0.5);
    resultText.x = bigBoard2.x;
    resultText.y = 30;
    resultBoard.addChild(resultText);

    // NumberRightLabel
    numberRightLabel = new Sprite(id["right-answers-text.png"]);
    numberRightLabel.scale.set(0.25);
    numberRightLabel.x = 25;
    numberRightLabel.y = resultText.y + 25;
    resultBoard.addChild(numberRightLabel);

    // NumberRightResult
    numberRightResultText = new Sprite(id["age.png"]);
    numberRightResultText.scale.set(0.28);
    resultBoard.addChild(numberRightResultText);
    numberRightResultText.anchor.set(1, 0);
    numberRightResultText.x = 215;
    numberRightResultText.y = numberRightLabel.y;

    numberRightResult = new Text(``, resultStyle);
    numberRightResult.scale.set(0.25);
    resultBoard.addChild(numberRightResult);
    numberRightResult.anchor.set(1, 0.5);
    numberRightResult.x = 186;
    numberRightResult.y = numberRightLabel.y + numberRightLabel.height / 2;

    // ScoreLabel,
    scoreLabel = new Sprite(id["score-text.png"]);
    scoreLabel.scale.set(0.25);
    scoreLabel.x = 25;
    scoreLabel.y = numberRightLabel.y + 30;
    resultBoard.addChild(scoreLabel);

    // ScoreResult
    scoreResult = new Text(``, resultStyle);
    scoreResult.scale.set(0.25);
    scoreResult.anchor.set(1, 0.5);
    scoreResult.x = 215;
    scoreResult.y = scoreLabel.y + scoreLabel.height / 2;
    resultBoard.addChild(scoreResult);

    // Age Label
    ageLabel = new Sprite(id["age-text.png"]);
    ageLabel.scale.set(0.25);
    ageLabel.x = 57;
    ageLabel.y = 125;
    resultBoard.addChild(ageLabel);

    // Age Result
    ageResult = new Text("", { ...resultStyle, fontSize: 37 * 4 });
    ageResult.scale.set(0.25);
    ageResult.anchor.set(0.5);
    ageResult.x = 110;
    ageResult.y = ageLabel.y + 40;
    resultBoard.addChild(ageResult);

    // Play again text
    resetText = new Sprite(id["reset-text.png"]);
    resetText.scale.set(0.25);
    resultBoard.addChild(resetText);
    resetText.anchor.set(0.5);
    resetText.x = bigBoard2.x;
    resetText.y = bigBoard2.y + 90;
    resetText.interactive = true;
    resetText.buttonMode = true;
}

// Render Game Scene
function renderGameScene() {
    // Big board for gameScene
    bigBoard = new Sprite(id["big-board.png"]);
    gameScene.addChild(bigBoard);
    bigBoard.width = 240;
    bigBoard.height = 240;
    bigBoard.anchor.set(0.5);
    bigBoard.x = gameScene.width / 2;
    bigBoard.y = gameScene.height / 2;

    // Add cards container
    gameScene.addChild(cardsContainer);
    cardsContainer.x = 12.5;
    cardsContainer.y = 30;

    // Miss, Great, Perfect
    miss = new Sprite(id["miss.png"]);
    miss.width = 179;
    miss.height = 107;
    great = new Sprite(id["great.png"]);
    great.width = 192;
    great.height = 117;
    perfect = new Sprite(id["perfect.png"]);
    perfect.width = 219;
    perfect.height = 139;

    [miss, great, perfect].forEach(el => {
        el.vy = 0;
        el.anchor.set(0.5);
        el.x = gameScene.width / 2;
        el.y = 100;
    });
    gameScene.addChild(miss, great, perfect);

    // Break scene
    breakText = new Sprite();
    gameScene.addChild(breakText);
    breakText.scale.set(0.28);
    breakText.anchor.set(0.5, 0);
    breakText.x = LOGICAL_WIDTH / 2;
    breakText.y = gameScene.height / 2 - 70;
    // Get all card icons
    collectIconNames();
}

// Render Tutorial Scene 2
function renderTutorialScene2() {
    tutorialScene2 = new Sprite(id["bg-7.png"]);
    background.addChild(tutorialScene2);
    tutorialScene2.width = LOGICAL_WIDTH;
    tutorialScene2.height = LOGICAL_HEIGHT;

    // Choices
    choice1 = new Sprite(Texture.fromImage("./images/selection7.png"));
    choice2 = new Sprite(Texture.fromImage("./images/selection8.png"));
    choice3 = new Sprite(Texture.fromImage("./images/selection9.png"));

    background.addChild(choice1, choice2, choice3);

    [choice1, choice2, choice3].forEach(choice => {
        choice.anchor.set(0.5);
        choice.width = 42;
        choice.height = 42;
        choice.y = tutorialScene2.height / 2 + 10;
        choice.buttonMode = true;
        choice.interactive = true;
    });

    // Choice 2
    choice2.x = LOGICAL_WIDTH / 2;

    // Choice 1
    choice1.x = choice2.x - choice1.width - 20;

    // Choice 3
    choice3.x = choice2.x + choice3.width + 20;

    // Choice 2 Text
    choice2Text = new Sprite(id["choice2.png"]);
    choice2Text.x = choice2.x;

    // Choice 1 Text
    choice1Text = new Sprite(id["choice1.png"]);
    choice1Text.x = choice1.x;

    // Choice 3 Text
    choice3Text = new Sprite(id["choice3.png"]);
    choice3Text.x = choice3.x;

    [choice1Text, choice2Text, choice3Text].forEach(choice => {
        choice.scale.set(0.15);
        choice.anchor.set(0.5);
        choice.y = choice2.y - 35;
        background.addChild(choice);
    });
    // Title Type Text
    titleTypeText = new Sprite(Texture.fromImage("titletypetext.png"));
    titleTypeText.scale.set(0.23);
    titleTypeText.anchor.set(0.5);
    titleTypeText.x = LOGICAL_WIDTH / 2;
    titleTypeText.y = 40;
    background.addChild(titleTypeText);

    // StartGameText
    startGameText = new Sprite(Texture.fromImage("startgametext.png"));
    startGameText.scale.set(0.2);
    startGameText.anchor.set(0.5);
    background.addChild(startGameText);
    startGameText.position.set(LOGICAL_WIDTH / 2, app.screen.height - 20);
    startGameText.buttonMode = true;
    startGameText.interactive = true;
}

// Render Intro Scene
function renderIntroduceScene() {
    // IntroduceScene
    introduceScene = new Sprite(id["bg-3.png"]);
    introduceScene.width = LOGICAL_WIDTH;
    introduceScene.height = LOGICAL_HEIGHT;
    background.addChild(introduceScene);

    // Cards
    cards = new Sprite(id["cards.png"]);
    cards.width = 214.2;
    cards.height = 120;
    cards.x = LOGICAL_WIDTH / 2;
    cards.y = LOGICAL_HEIGHT / 2 - 30;
    cards.anchor.set(0.5);
    background.addChild(cards);

    // Person
    person = new Sprite(id["person.png"]);
    person.width = 150;
    person.height = 107;
    background.addChild(person);
    person.x = 170;
    person.y = LOGICAL_HEIGHT - person.height * 0.5;
    person.anchor.set(0.5);

    // Introduce text
    nextBtn1 = new Sprite(id["next-text.png"]);
    nextBtn1.scale.set(0.25);
    nextBtn1.anchor.set(0.5);
    background.addChild(nextBtn1);
    nextBtn1.vy = 0.07;
    nextBtn1.position.set(50, 165);
    nextBtn1.buttonMode = true;
    nextBtn1.interactive = true;
}

// Render tutorial scene 1
function renderTutorialScene1() {
    // Background
    tutorialScene1 = new Sprite(id["bg-5.png"]);
    background.addChild(tutorialScene1);
    tutorialScene1.width = LOGICAL_WIDTH;
    tutorialScene1.height = LOGICAL_HEIGHT;

    // Title & Introduce Text
    titleText = new Sprite(id["title-text.png"]);
    titleText.scale.set(0.29);
    titleText.anchor.set(0.5);
    titleText.x = LOGICAL_WIDTH / 2;
    titleText.y = 20;
    background.addChild(titleText);

    // Introduce Text
    introduceText = new Sprite(id["introduce-text.png"]);
    introduceText.scale.set(0.23);
    introduceText.anchor.set(0.5);
    background.addChild(introduceText);
    introduceText.y = 117;
    introduceText.x = LOGICAL_WIDTH / 2;

    // Next btn
    nextBtn2 = new Sprite(id["next-text.png"]);
    nextBtn2.scale.set(0.25);
    nextBtn2.anchor.set(0.5);
    background.addChild(nextBtn2);
    nextBtn2.position.set(LOGICAL_WIDTH / 2, LOGICAL_HEIGHT - 23);
    nextBtn2.buttonMode = true;
    nextBtn2.interactive = true;
}

// Cover cards
function coverCards() {
    firstSprite.texture = firstCard.frontface();
    secondSprite.texture = secondCard.frontface();
    firstIcon.destroy();
    secondIcon.destroy();
    firstCard.selected = false;
    secondCard.selected = false;
}

// Hide status
function hideStatus() {
    [miss, great, perfect].forEach(el => {
        el.visible = false;
        el.y = 100;
        el.vy = 0;
    });
}

// Show status after 2 cards were picked
function showStatus(type) {
    if (type === "correct") {
        if (numOfOpenedCards < totalCards) {
            great.visible = true;
        } else if (numOfOpenedCards == totalCards) {
            perfect.visible = true;
        }
    } else if (type === "wrong") {
        miss.visible = true;
    }
}

// Resize handler
function resizeHandler() {
    const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
    const h = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight
    );

    const scaleFactor = Math.min(w / LOGICAL_WIDTH, h / LOGICAL_HEIGHT);

    const newWidth = Math.ceil(LOGICAL_WIDTH * scaleFactor);
    const newHeight = Math.ceil(LOGICAL_HEIGHT * scaleFactor);

    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);
}
