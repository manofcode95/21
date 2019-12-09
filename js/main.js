// Create PIXI App
const Application = PIXI.Application,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite,
    loader = PIXI.loader,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    BitmapText = PIXI.extras.BitmapText,
    Texture = PIXI.Texture,
    TextStyle = PIXI.TextStyle;

let app = new Application({
        backgroundColor: 0xffffff,
        width: LOGICAL_WIDTH,
        height: LOGICAL_HEIGHT,
        resolution: window.devicePixelRatio || 1,
        transparent: true,
        autoResize: true
    }),
    background = new Container(),
    gameScene = new Container(),
    resultBoard = new Container(),
    cardsContainer = new Container();

document.body.appendChild(app.view);
app.stage.addChild(background, gameScene, resultBoard);
// Load Images
loader
    .add([
        "./images/shinkei.json",
        "./images/icon1.png",
        "./images/icon2.png",
        "./images/icon3.png",
        "./images/icon4.png",
        "./images/icon5.png",
        "./images/icon6.png",
        "./images/icon7.png",
        "./images/icon8.png",
        "./images/icon9.png",
        "./images/icon10.png",
        "./images/start-btn-3.png",
        "./images/title.png",
        "./images/titletype.png"
    ])
    .load(setup);

// Game Setup
function setup(loader, res) {
    // Get json
    id = res["./images/shinkei.json"].textures;
    canvas = document.querySelector("canvas");
    // Create background
    // Introduce Scene
    renderIntroduceScene();

    // TutorialScene1
    renderTutorialScene1();

    // tutorialScene2
    renderTutorialScene2();

    // GameScene
    renderGameScene();

    // Result scene
    renderResultScene();

    // Show and Hide sprites
    showAndHideSprites();

    // Event Listener
    listenToEvent();

    // Set resize on device
    resizeHandler();

    // Listen to resize event
    window.addEventListener("resize", resizeHandler);

    // State
    state = gameLoop;
    app.ticker.add(delta => {
        state(delta);
    });
}

// Game Loop
function gameLoop(delta) {
    [miss, great, perfect].forEach(el => {
        el.y += el.vy * delta;
    });

    // Next btn animation
    if (nextBtn1.visible) {
        breathAnimation(nextBtn1, 168, 162, delta);
    }
    if (nextBtn2.visible) {
        fadeAnimation(nextBtn2, delta);
    }
    if (startGameText.visible && background.visible) {
        fadeAnimation(startGameText, delta);
    }

    if (resetText.visible && resultBoard.visible) {
        fadeAnimation(resetText, delta);
    }
}
