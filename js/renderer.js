// Move to tutorical screen 1
function moveToTutorial1() {
    introduceScene.visible = false;
    nextBtn1.visible = false;
    cards.visible = false;
    person.visible = false;
    introduceText1.visible = true;
    introduceText2.visible = true;
    introduceText3.visible = true;
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
    bigBoard2.width = 240;
    bigBoard2.height = 240;
    resultBoard.addChild(bigBoard2);
    bigBoard2.anchor.set(0.5);
    bigBoard2.x = resultBoard.width / 2;
    bigBoard2.y = resultBoard.height / 2;

    // Result text
    resultText = new Sprite(Texture.fromImage("resulttitle.png"));
    resultText.scale.set(0.35);
    resultText.anchor.set(0.5);
    resultText.x = bigBoard2.x;
    resultText.y = 30;
    resultBoard.addChild(resultText);

    // NumberRightLabel
    numberRightLabel = new Text("正解数", resultStyle);
    numberRightLabel.x = 25;
    numberRightLabel.y = resultText.y + 25;
    resultBoard.addChild(numberRightLabel);

    // NumberRightResult
    numberRightResult = new Text(``, resultStyle);
    resultBoard.addChild(numberRightResult);
    numberRightResult.anchor.set(1);
    numberRightResult.x = 215;
    numberRightResult.y = numberRightLabel.y + numberRightLabel.height;

    // ScoreLabel,
    scoreLabel = new Text("スコア", {
        ...subStyle,
        strokeThickness: 1,
        stroke: "0xffffff"
    });
    scoreLabel.x = 25;
    scoreLabel.y = numberRightLabel.y + 30;
    resultBoard.addChild(scoreLabel);

    // ScoreResult
    scoreResult = new Text(`50000`, resultStyle);
    scoreResult.anchor.set(1);
    scoreResult.x = 215;
    scoreResult.y = scoreLabel.y + scoreLabel.height;
    resultBoard.addChild(scoreResult);

    // Age Label
    ageLabel = new Text("脳トレ年齢", resultStyle);
    ageLabel.anchor.set(0.5, 0.5);
    ageLabel.x = bigBoard2.x;
    ageLabel.y = scoreLabel.y + scoreLabel.width / 2 + 15;
    resultBoard.addChild(ageLabel);

    // Age Result
    ageResult = new Text("", { ...resultStyle, fontSize: 40 });
    ageResult.anchor.set(0.5);
    ageResult.x = ageLabel.x + 5;
    ageResult.y = ageLabel.y + 30;
    resultBoard.addChild(ageResult);

    ageResultText = new Text("歳級", { ...resultStyle, fontSize: 26 });
    ageResultText.anchor.set(0, 0.5);
    ageResultText.x = ageResult.x + ageResult.width / 2 + 20;
    ageResultText.y = ageResult.y + 3;
    resultBoard.addChild(ageResultText);

    // Play again text
    resetText = new Text("もう一度あそぶ", { ...resultStyle, fontSize: 20 });
    resultBoard.addChild(resetText);
    resetText.anchor.set(0.5);
    resetText.x = bigBoard2.x;
    resetText.y = bigBoard2.y + 90;
    resetText.interactive = true;
    resetText.buttonMode = true;
    c.pulse(resetText, 40);
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
    breakText1 = new Text("お手つきは", breakStyle);
    gameScene.addChild(breakText1);
    breakText1.x = gameScene.width / 2 - breakText1.width / 2;
    breakText1.y = gameScene.height / 2 - 70;

    breakText2 = new Text("", {
        ...breakStyle,
        fill: "#FF6600",
        stroke: "#FF6600"
    });
    gameScene.addChild(breakText2);
    breakText2.x = 76;
    breakText2.y = breakText1.y + 45;

    breakText3 = new Text("まで", breakStyle);
    gameScene.addChild(breakText3);
    breakText3.x = 140;
    breakText3.y = breakText1.y + 45;

    // Get all card icons
    collectIconNames();
}

// Render Tutorial Scene 2
function renderTutorialScene2() {
    tutorialScene2 = new Sprite(id["bg-7.png"]);
    background.addChild(tutorialScene2);
    tutorialScene2.width = 240;
    tutorialScene2.height = 240;

    // Choices
    choice1 = new Sprite(id["selection7.png"]);
    choice2 = new Sprite(id["selection8.png"]);
    choice3 = new Sprite(id["selection9.png"]);

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
    choice2.x = tutorialScene2.width / 2;

    // Choice 1
    choice1.x = choice2.x - choice1.width - 20;

    // Choice 3
    choice3.x = choice2.x + choice3.width + 20;

    // Choice 2 Text
    choice2Text = new Text("ふつう", {
        ...choiceStyle,
        fill: "#af00d4",
        stroke: "#af00d4"
    });

    background.addChild(choice2Text);
    choice2Text.anchor.set(0.5);
    choice2Text.x = choice2.x;
    choice2Text.y = choice2.y - 35;

    // Choice 1 Text
    choice1Text = new Text("やさしい", {
        ...choiceStyle,
        fill: "#006cff",
        stroke: "#006cff"
    });

    background.addChild(choice1Text);
    choice1Text.anchor.set(0.5);
    choice1Text.x = choice1.x;
    choice1Text.y = choice2Text.y;

    // Choice 3 Text
    choice3Text = new Text("むずかしい", {
        ...choiceStyle,
        fill: "#d40000",
        stroke: "#d40000"
    });

    background.addChild(choice3Text);
    choice3Text.anchor.set(0.5);
    choice3Text.x = choice3.x;
    choice3Text.y = choice2Text.y;

    // Title Type Text
    titleTypeText = new Sprite(Texture.fromImage("titletypetext.png"));
    titleTypeText.scale.set(0.3);
    titleTypeText.anchor.set(0.5);
    titleTypeText.x = tutorialScene2.width / 2;
    titleTypeText.y = 40;
    background.addChild(titleTypeText);

    // StartGameText
    startGameText = new Sprite(Texture.fromImage("startgametext.png"));
    startGameText.scale.set(0.35);
    startGameText.anchor.set(0.5);
    background.addChild(startGameText);
    startGameText.position.set(app.screen.width / 2, app.screen.height - 20);
    c.pulse(startGameText, 30);
    startGameText.buttonMode = true;
    startGameText.interactive = true;
}

// Render Intro Scene
function renderIntroduceScene() {
    // IntroduceScene
    introduceScene = new Sprite(id["bg-3.png"]);
    introduceScene.width = 240;
    introduceScene.height = 240;
    background.addChild(introduceScene);

    // Cards
    cards = new Sprite(id["cards.png"]);
    cards.width = 214.2;
    cards.height = 120;
    cards.x = background.width / 2;
    cards.y = background.height / 2 - 30;
    cards.anchor.set(0.5);
    background.addChild(cards);

    // Person
    person = new Sprite(id["person.png"]);
    person.width = 150;
    person.height = 107;
    background.addChild(person);
    person.x = 170;
    person.y = background.height - person.height * 0.5;
    person.anchor.set(0.5);

    // Introduce text
    nextBtn1 = new Text("次へ", nextStyle);
    nextBtn1.anchor.set(0.5);
    background.addChild(nextBtn1);
    nextBtn1.position.set(50, app.screen.height - 85);
    c.pulse(nextBtn1, 30);
    nextBtn1.buttonMode = true;
    nextBtn1.interactive = true;
}

// Render tutorial scene 1
function renderTutorialScene1() {
    // Background
    tutorialScene1 = new Sprite(id["bg-5.png"]);
    background.addChild(tutorialScene1);
    tutorialScene1.width = 240;
    tutorialScene1.height = 240;

    // Title & Introduce Text
    titleText = new Text("あそびかた", titleStyle);
    titleText.anchor.set(0.5);
    titleText.x = tutorialScene1.width / 2;
    titleText.y = 20;
    background.addChild(titleText);

    // Introduce Text
    introduceText1 = new Text("同じ絵柄", {
        ...introduceStyle,
        fill: "#FF6600",
        stroke: "#FF6600"
    });

    introduceText1.anchor.set(0, 0.5);
    introduceText1.x = 28;
    introduceText1.y = 117 - 11;
    background.addChild(introduceText1);

    introduceText2 = new Text("のカードを", introduceStyle);
    introduceText2.anchor.set(0, 0.5);
    introduceText2.x = 29 + introduceText1.width;
    introduceText2.y = 117 - 11;
    background.addChild(introduceText2);

    introduceText3 = new Text("揃えてください", introduceStyle);
    introduceText3.anchor.set(0.5);
    introduceText3.x = background.width / 2;
    introduceText3.y = 117 + 11;
    background.addChild(introduceText3);

    // Next btn
    nextBtn2 = new Text("次へ", nextStyle);
    nextBtn2.anchor.set(0.5);
    background.addChild(nextBtn2);
    nextBtn2.position.set(app.screen.width / 2, app.screen.height - 23);
    c.pulse(nextBtn2, 30);
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
