const SIZES = {
    small: {
        price: 50,
        calories: 20
    },
    large: {
        price: 100,
        calories: 40
    }
};

const STUFFING = {
    cheese: {
        price: 10,
        calories: 20
    },
    salad: {
        price: 20,
        calories: 5
    },
    potato: {
        price: 15,
        calories: 10
    }
};

const TOPPING = {
    mayo: {
        price: 20,
        calories: 5
    },
    spice: {
        price: 15,
        calories: 0
    }
};

function logingHamburgerException(exception) {
    if (exception.name === "HamburgerException") {
        console.log(exception.message);
    }
}

function calculateSomething(obj, prop) {
    let sizeNStuffingAmount = SIZES[obj.size][prop] + STUFFING[obj.stuffing][prop];

    if (obj.topping.length > 1) {
        let toppingAmount = 0;
        for (let elem of obj.topping) {
            toppingAmount += TOPPING[elem][prop];
        }

        return sizeNStuffingAmount + toppingAmount;
    } else if (obj.topping[0]) {
        return sizeNStuffingAmount + TOPPING[obj.topping[0]][prop];
    } else {
        return sizeNStuffingAmount;
    }
}

class Hamburger {
    static SIZE_SMALL = "small";
    static SIZE_LARGE = "large";
    static STUFFING_CHEESE = "cheese";
    static STUFFING_SALAD = "salad";
    static STUFFING_POTATO = "potato";
    static TOPPING_MAYO = "mayo";
    static TOPPING_SPICE = "spice";

    constructor(size, stuffing) {
        try {
            if (!size) {
                throw new HamburgerException("no size given");
            } else if (size !== Hamburger.SIZE_SMALL && size !== Hamburger.SIZE_LARGE) {
                throw new HamburgerException(`invalid size ${size}`);
            }

            this.size = size;

            if (!stuffing) {
                throw new HamburgerException("no stuffing given");
            } else if (stuffing !== Hamburger.STUFFING_CHEESE && stuffing !== Hamburger.STUFFING_SALAD && stuffing !== Hamburger.STUFFING_POTATO) {
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

            if (topping !== Hamburger.TOPPING_MAYO && topping !== Hamburger.TOPPING_SPICE) {
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

    get size () {
        return this._size;
    }

    set size (val) {
        this._size = val;
    }

    get stuffing () {
        return this._stuffing;
    }

    set stuffing (val) {
        this._stuffing = val;
    }
}

function HamburgerException (message) {
    this.name = "HamburgerException";
    this.message = (`${this.name}: ${message}` || "");
}
HamburgerException.prototype = Error.prototype;

// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
console.log(`маленький гамбургер с начинкой из сыра => size - ${hamburger.size}, stuffing - ${hamburger.stuffing}`);

// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
console.log(`маленький гамбургер с начинкой из сыра и майонезом => size - ${hamburger.size}, stuffing - ${hamburger.stuffing}, topping - ${hamburger.topping}`);

// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());

// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log(`маленький гамбургер с начинкой из сыра, майонезом и специями => size - ${hamburger.size}, stuffing - ${hamburger.stuffing}, topping - ${hamburger.topping[0]}, ${hamburger.topping[1]}`);

// А сколько теперь стоит?
console.log("Price with spice: %f = size:%f + stuffing:%f + topping:%f + topping:%f", hamburger.calculatePrice(), SIZES[hamburger.size].price, STUFFING[hamburger.stuffing].price, TOPPING[hamburger.topping[0]].price, TOPPING[hamburger.topping[1]].price);

// Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.size === Hamburger.SIZE_LARGE); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log(`you removed ${Hamburger.TOPPING_SPICE}`);
console.log("Hamburger have %d toppings", hamburger.topping.length); // 1

hamburger.removeTopping(Hamburger.TOPPING_SPICE);

// не передали обязательные параметры
let h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
let h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'
