function logingHamburgerException(exception) {
    if (exception.name === "HamburgerException") {
        console.log(exception.message);
    }
}

/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
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

/* Размеры, виды начинок и добавок */
Hamburger.SIZES = [
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
Hamburger.STUFFING = [
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
Hamburger.TOPPING = [
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

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
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
};

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
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
};

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    return this.topping;
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return this.size;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    let toppingPriceAmount = 0;

    this.topping.forEach(function (elem) {
        toppingPriceAmount += Hamburger.TOPPING.find((el) => el.value === elem).price;
    });

    return Hamburger.SIZES.find((elem) => elem.value === this.size).price + Hamburger.STUFFING.find((elem) => elem.value === this.stuffing).price + toppingPriceAmount;
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    let toppingCaloriesAmount = 0;

    this.topping.forEach(function (elem) {
        toppingCaloriesAmount += Hamburger.TOPPING.find((el) => el.value === elem).calories;
    });

    return Hamburger.SIZES.find((elem) => elem.value === this.size).calories + Hamburger.STUFFING.find((elem) => elem.value === this.stuffing).calories + toppingCaloriesAmount;
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
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
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log(`you removed ${Hamburger.TOPPING_SPICE}`);
console.log("Hamburger have %d toppings", hamburger.getToppings().length); // 1

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
