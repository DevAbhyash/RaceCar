//IMPORTING ALL THE NECESSARY HTML ELEMENT FOR MANIPULATION
let myCar = document.querySelector(".car");
let leftButton = document.querySelector(".left");
let rightButton = document.querySelector(".right");
let upButton = document.querySelector(".up");
let enemyCar = document.querySelector(".enemy");
let heading = document.querySelector("h1");
let restartButton = document.querySelector(".restart");
let carLeftPosition = 280;
let enemyBottomPositon = 1180;
let enemyLeftPositon = [170, 300, 400];
let scoreElement = document.querySelector("span");
let score = 0;
let gameIsOn = true;

//////////creating user Car and Different Controls Methods/////////////
class Car {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.createCar(myCar);
    }
    createCar(myCar) {
        this.car = myCar;
        this.car.style.position = "relative";
        this.car.style.width = this.width;
        this.car.style.height = this.height;
    }
    carSetPosition() {
        this.car.style.left = carLeftPosition + "px";
        this.car.style.bottom = "230px";
    }
    steerLeft() {
        if (carLeftPosition > 170) {
            carLeftPosition = enemyLeftPositon[0];
            this.carSetPosition();
        }
    }
    steerUp() {
        if (carLeftPosition < 400 || carLeftPosition > 170) {
            carLeftPosition = enemyLeftPositon[1];
            this.carSetPosition();
        }
    }
    steerRight() {
        if (carLeftPosition < 400) {
            carLeftPosition = enemyLeftPositon[2];
            this.carSetPosition();
        }
    }
}
///CREATING INSTANCES OBJECT FROM THE CAR CLASS
let car = new Car("60px", "100px");
///MOVING CAR LEFT
leftButton.addEventListener("click", function() {
    car.steerLeft();
});
///MOVING THE CAR RIGHT
rightButton.addEventListener("click", function() {
    car.steerRight();
});
///MOVING THE CAR ON THE MIDDLE LANE
upButton.addEventListener("click", function() {
    car.steerUp();
});

////////////////////Creating Enemy Car and  Generating the Enemy Car//////////////////////////////
class Enemy {
    constructor() {}
    generateEnemy(enemy) {
        this.enemy = enemy;
        this.enemy.style.position = "relative";

        this.enemy.style.left =
            enemyLeftPositon[Math.floor(Math.random() * enemyLeftPositon.length)] +
            "px";
        this.enemy.style.bottom = enemyBottomPositon;
    }
    regenerateEnemy() {
        if (enemyBottomPositon < 200) {
            score += 1;
            scoreElement.innerHTML = score;

            enemyBottomPositon = 1180;
            let lefts =
                enemyLeftPositon[Math.floor(Math.random() * enemyLeftPositon.length)];
            this.enemy.style.left = lefts + "px";
        }
        enemyBottomPositon -= 10;
        this.enemy.style.bottom = enemyBottomPositon + "px";
        ///////Checking collison between two car//////
        let enemyCarLeftValue = window
            .getComputedStyle(enemyCar)
            .getPropertyValue("left");
        let myCarLeftValue = window
            .getComputedStyle(myCar)
            .getPropertyValue("left");
        console.log(myCarLeftValue, enemyCarLeftValue);

        /////////////////////////////////////////////////////////
        if (score > 10 && score < 19) {
            enemyBottomPositon -= 15;
        }
        if (score > 20 && score < 39) {
            enemyBottomPositon -= 18;
        }
        if (score > 40 && score < 60) {
            gameIsOn = false;
        }
        if (enemyCarLeftValue === myCarLeftValue && enemyBottomPositon === 230) {
            gameIsOn = false;
            heading.innerHTML = "GAME OVER!!!";

            heading.style.color = "white";
        }
    }
}
///CREATING ENEMY OBJECT INSTANCES FROM THE ENEMY CLASS
let enemy = new Enemy();

enemy.generateEnemy(enemyCar);
////////Generating Enemy Cars accordingly to the game level(GAME LOOP FUNCTION)
function gameLoop() {
    let timeStatus = setInterval(() => {
        enemy.regenerateEnemy();
        if (!gameIsOn) {
            clearInterval(timeStatus);
        }
    }, 30);
}
gameLoop();

////RESTARTING THE GAME LOOP IF RESTART BUTTON IS PRESSED
restartButton.addEventListener("click", function() {
    if (!gameIsOn) {
        gameIsOn = true;
        score = 0;
        gameLoop();
        heading.innerHTML = "GO GO GO!!!";
    }
});