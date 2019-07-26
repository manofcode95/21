// Game setup
const LIMIT_TIME1 = 20,
    LIMIT_TIME2 = 10,
    EASY_AWARD_SCORE = 1000,
    MED_AWARD_SCORE = 1500,
    HARD_AWARD_SCORE = 2000,
    EASY_10_PAIRS_SCORE = 20000,
    MED_10_PAIRS_SCORE = 25000,
    HARD_10_PAIRS_SCORE = 30000,
    BONUS_SCORE = 500,
    LOGICAL_WIDTH = 240,
    LOGICAL_HEIGHT = 240,
    RESOLUTION = 3,
    BREAK_SCREEN_DELAY = 2500,
    HINT_CARD_DELAY = 2000,
    STATUS_ANIMATION_TIME = 500,
    NEXT_TURN_DELAY = 1500,
    TOTAL_ROUNDS = 5;

let canStart = false,
    gameType = undefined,
    currentScene = 1,
    numOfOpenedCards = 0,
    numOfWrongAnswers = 0,
    answerIsCorrect = false,
    numOfWinRounds = 0,
    currentRound = 1,
    numberCorrectPairs = 0,
    totalScore = 0,
    listOfCardSprites = [],
    totalCards,
    numOfHintCards,
    wrongAnswerLimited,
    openedIcons = [],
    allIconNames = [],
    timeStart,
    canPick,
    timeEnd,
    state,
    fadeSpeed = 0.04;
