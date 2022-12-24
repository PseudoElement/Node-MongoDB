const EventEmitter = require("events");
const event = new EventEmitter(); //create event
// event.on("some_event", () => {
//   // like addEventListener
//   console.log(`click`);
// });
// event.emit("some_event"); //call event
// const util = require("util");
// function Car(model, maxSpeed) {
//   this.model = `Model is ${model}`;
//   this.maxSpeed = maxSpeed;
// }
class Car extends EventEmitter{// = util.inherits(Car, EventEmitter)
  constructor(model, maxSpeed){
    super();
    this.model = `Model is ${model}`;
    this.maxSpeed = maxSpeed;
  }
}
const BMW = new Car("BMW", 250);
const Lada = new Car("Lada", 80);
// util.inherits(Car, EventEmitter); // every object of Car-class inherits event
const carsArray = [BMW, Lada];
carsArray.forEach((car) => {
  car.on("moving", () => {//set function on event
    console.log(car.model + ", has maxSpeed " + car.maxSpeed + ' m/hrs');
  });
  car.emit('moving');// call custom event
});
