// КЛАСС Item


/**
 * Класс предмета
 */
class Item {
    /**
     * @param {string} name
     * @param {number} weight
     * @param {string} rarity
     */
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Возвращает информацию о предмете
     * @returns {string}
     */
    getInfo() {
        return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    }

    /**
     * Изменяет вес
     * @param {number} newWeight
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

// КЛАСС Weapon (наследование)


/**
 * Класс оружия
 */
class Weapon extends Item {
    /**
     * @param {string} name
     * @param {number} weight
     * @param {string} rarity
     * @param {number} damage
     * @param {number} durability
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Использование оружия
     */
    use() {
        if (this.durability > 0) {
            this.durability -= 10;
        }
    }

    /**
     * Починка
     */
    repair() {
        this.durability = 100;
    }

    /**
     * Переопределение метода
     */
    getInfo() {
        return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
    }
}

// ТЕСТЫ


const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());

sword.setWeight(4.0);
console.log("New weight:", sword.weight);

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());

bow.use();
console.log("After use:", bow.durability);

bow.repair();
console.log("After repair:", bow.durability);

// OPTIONAL CHAINING


const player = {
    inventory: {
        weapon: bow
    }
};

console.log("Weapon name:", player?.inventory?.weapon?.name);

// ФУНКЦИЯ-КОНСТРУКТОР Item

/**
 * Конструктор Item
 */
function ItemFunc(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

ItemFunc.prototype.getInfo = function () {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemFunc.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
};

// ФУНКЦИЯ-КОНСТРУКТОР Weapon


function WeaponFunc(name, weight, rarity, damage, durability) {
    ItemFunc.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

WeaponFunc.prototype.use = function () {
    if (this.durability > 0) {
        this.durability -= 10;
    }
};

WeaponFunc.prototype.repair = function () {
    this.durability = 100;
};

// ТЕСТЫ КОНСТРУКТОРОВ


const axe = new WeaponFunc("Battle Axe", 5, "rare", 25, 100);

console.log(axe.getInfo());
axe.use();
console.log("Axe durability:", axe.durability);