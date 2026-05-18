// 1. Вывод сообщений
alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");

// 2. Переменные
let name = "Eduard";
let birthYear = 1998;
let isStudent = true;

console.log("Имя:", name);
console.log("Год рождения:", birthYear);
console.log("Студент:", isStudent);

// 3. Условия
let score = prompt("Введите ваш балл:");

if (score >= 90) {
    console.log("Отлично!");
} else if (score >= 70) {
    console.log("Хорошо");
} else {
    console.log("Можно лучше!");
}

// 4. Цикл
for (let i = 1; i <= 5; i++) {
    console.log(`Итерация: ${i}`);
}