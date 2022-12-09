let myCar = document.querySelector(".car");
let leftButton = document.querySelector(".left");
let rightButton = document.querySelector(".right");
let carLeftPosition = 280;

class Car {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.createCar(myCar);
    }
    createCar(myCar) {
        this.car = myCar;
        this.car.style.position = "relative";
        this.car.style.backgroundColor = "red";
        this.car.style.width = this.width;
        this.car.style.height = this.height;
    }
    carSetPosition() {
        this.car.style.left = carLeftPosition + "px";
        this.car.style.bottom = "180px";
    }
    steerLeft() {
        if (carLeftPosition > 170) {
            carLeftPosition -= 30;
            this.carSetPosition();
        }
    }
    steerRight() {
        if (carLeftPosition < 400) {
            carLeftPosition += 30;
            this.carSetPosition();
        }
    }
}
let car = new Car("30px", "40px");
leftButton.addEventListener("click", function() {
    car.steerLeft();
});
rightButton.addEventListener("click", function() {
    car.steerRight();
});