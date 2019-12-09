// Random int
function randomInt(min, max) {
    // RandomInt(1,8)-->[0,7]
    return Math.floor(Math.random() * (max - min)) + min;
}

// Shuffle list
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = randomInt(0, array.length - 1); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}

// Rotate random the image
function randomRadiant(degree, times) {
    let radiant = (degree * 3.14159) / 180;
    return radiant * randomInt(0, times);
}
