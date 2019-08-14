function logingHamburgerException(exception) {
    if (exception.name === "HamburgerException") {
        console.log(exception.message);
    }
}

function calculateSomething(obj, prop) {
    let toppingAmount = 0;

    obj.topping.forEach(function (elem) {
        toppingAmount += Hamburger.TOPPING.find((el) => el.value === elem)[prop];
    });

    return Hamburger.SIZES.find((elem) => elem.value === obj.size)[prop] + Hamburger.STUFFING.find((elem) => elem.value === obj.stuffing)[prop] + toppingAmount;
}

class Hamburger {
    static SIZES = [
        {
            value: "small",
            price: 50,
            calories: 20
        },
        {
            value: "large",
            price: 100,
            calories: 40
        }
    ];
    static STUFFING = [
        {
            value: "cheese",
            price: 10,
            calories: 20
        },
        {
            value: "salad",
            price: 20,
            calories: 5
        },
        {
            value: "potato",
            price: 15,
            calories: 10
        }
    ];
    static TOPPING = [
        {
            value: "mayo",
            price: 20,
            calories: 5
        },
        {
            value: "spice",
            price: 15,
            calories: 0
        }
    ];

    constructor(size, stuffing) {
        try {
            if (!size) {
                throw new HamburgerException("no size given");
            } else if (!Hamburger.SIZES.find((elem) => elem.value === size)) {
                throw new HamburgerException(`invalid size ${size}`);
            }

            this.size = size;

            if (!stuffing) {
                throw new HamburgerException("no stuffing given");
            } else if (!Hamburger.STUFFING.find((elem) => elem.value === stuffing)) {
                throw new HamburgerException(`invalid stuffing ${stuffing}`);
            }

            this.stuffing = stuffing;

            this.topping = [];

        } catch (e) {
            logingHamburgerException(e);
        }
    }

    addTopping(topping) {
        try {
            if (this.topping.includes(topping)) {
                throw new HamburgerException(`duplicate topping ${topping}`)
            }

            if (!topping) {
                throw new HamburgerException("no topping given")
            }

            if (!Hamburger.TOPPING.find((elem) => elem.value === topping)) {
                throw new HamburgerException(`invalid topping ${topping}`)
            }

            this.topping.push(topping);


        } catch (e) {
            logingHamburgerException(e);
        }
    }

    removeTopping(topping) {
        try {
            if (!this.topping.includes(topping)) {
                throw new HamburgerException(`you don't have such topping (${topping}) in your hamburger`)
            }

            this.topping = this.topping.filter(function (elem) {
                return elem !== topping;
            })

        } catch (e) {
            logingHamburgerException(e);
        }
    }

    calculatePrice() {
        return calculateSomething(this, "price");
    }

    calculateCalories() {
        return calculateSomething(this, "calories");
    }
}

function HamburgerException (message) {
    this.name = "HamburgerException";
    this.message = (`${this.name}: ${message}` || "");
}
HamburgerException.prototype = Error.prototype;

// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZES[0].value, Hamburger.STUFFING[0].value);
console.log(`маленький гамбургер с начинкой из сыра => size - ${hamburger.size}, stuffing - ${hamburger.stuffing}`);

// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING[0].value);
console.log(`маленький гамбургер с начинкой из сыра и майонезом => size - ${hamburger.size}, stuffing - ${hamburger.stuffing}, topping - ${hamburger.topping}`);

// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());

// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING[1].value);
console.log(`маленький гамбургер с начинкой из сыра, майонезом и специями => size - ${hamburger.size}, stuffing - ${hamburger.stuffing}, topping - ${hamburger.topping[0]}, ${hamburger.topping[1]}`);

// А сколько теперь стоит?
console.log("Price with spice: %f", hamburger.calculatePrice());

// Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.size === Hamburger.SIZES[1].value); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING[1].value);
console.log(`you removed ${Hamburger.TOPPING[1].value}`);
console.log("Hamburger have %d toppings", hamburger.topping.length); // 1

hamburger.removeTopping(Hamburger.TOPPING[1].value);

// не передали обязательные параметры
let h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
let h3 = new Hamburger(Hamburger.TOPPING[1].value, Hamburger.TOPPING[1].value);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
let h4 = new Hamburger(Hamburger.SIZES[0].value, Hamburger.STUFFING[0].value);
hamburger.addTopping(Hamburger.TOPPING[0].value);
// HamburgerException: duplicate topping 'TOPPING_MAYO'
