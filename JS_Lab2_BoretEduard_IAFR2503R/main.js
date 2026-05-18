// =========================
// printArray
// =========================
function printArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(`Element ${i}: value ${array[i]}`);
    }
}

function printArray1(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(`${i}: ${array[i]}`);
    }
}

// =========================
// forEach
// =========================
function forEach(array, callback) {
    if (!Array.isArray(array)) {
        throw new Error("Первый аргумент должен быть массивом");
    }
    if (typeof callback !== "function") {
        throw new Error("Второй аргумент должен быть функцией");
    }

    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

// =========================
// map
// =========================
function map(array, callback) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }

    return result;
}

// =========================
// filter
// =========================
function filter(array, callback) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }

    return result;
}

// =========================
// find
// =========================
function find(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i];
        }
    }
    return undefined;
}

// =========================
// some
// =========================
function some(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true;
        }
    }
    return false;
}

// =========================
// every
// =========================
function every(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return false;
        }
    }
    return true;
}

// =========================
// reduce
// =========================
function reduce(array, callback, initialValue) {
    if (array.length === 0 && initialValue === undefined) {
        return undefined;
    }

    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}

// =========================
// ТЕСТЫ
// =========================
const numbers = [1, 2, 3, 4, 5];

printArray(numbers);
printArray1(numbers);

forEach(numbers, (el, i) => {
    console.log(`forEach -> ${el}`);
});

console.log(map(numbers, (x) => x * 2));
console.log(filter(numbers, (x) => x % 2 === 0));
console.log(find(numbers, (x) => x > 3));
console.log(some(numbers, (x) => x > 4));
console.log(every(numbers, (x) => x > 0));
console.log(reduce(numbers, (acc, x) => acc + x, 0));