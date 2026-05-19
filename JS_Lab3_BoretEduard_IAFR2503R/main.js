/**
 * Массив транзакций для тестирования.
 * Каждая транзакция содержит:
 * transaction_id, transaction_date, transaction_amount,
 * transaction_type, transaction_description, merchant_name, card_type
 */
const transactions = [
  {
    transaction_id: 1,
    transaction_date: "2026-01-15",
    transaction_amount: 120.5,
    transaction_type: "debit",
    transaction_description: "Grocery shopping",
    merchant_name: "Linella",
    card_type: "debit",
  },
  {
    transaction_id: 2,
    transaction_date: "2026-01-20",
    transaction_amount: 2500,
    transaction_type: "credit",
    transaction_description: "Salary",
    merchant_name: "Company",
    card_type: "debit",
  },
  {
    transaction_id: 3,
    transaction_date: "2026-02-05",
    transaction_amount: 89.99,
    transaction_type: "debit",
    transaction_description: "Online subscription",
    merchant_name: "Netflix",
    card_type: "credit",
  },
  {
    transaction_id: 4,
    transaction_date: "2026-02-10",
    transaction_amount: 45,
    transaction_type: "debit",
    transaction_description: "Coffee and snacks",
    merchant_name: "Andy’s",
    card_type: "debit",
  },
  {
    transaction_id: 5,
    transaction_date: "2026-03-01",
    transaction_amount: 300,
    transaction_type: "credit",
    transaction_description: "Freelance payment",
    merchant_name: "Client",
    card_type: "credit",
  },
  {
    transaction_id: 6,
    transaction_date: "2026-03-12",
    transaction_amount: 150.75,
    transaction_type: "debit",
    transaction_description: "Electronics purchase",
    merchant_name: "Enter",
    card_type: "credit",
  },
  {
    transaction_id: 7,
    transaction_date: "2026-03-18",
    transaction_amount: 60,
    transaction_type: "debit",
    transaction_description: "Taxi",
    merchant_name: "Yandex Go",
    card_type: "debit",
  },
  {
    transaction_id: 8,
    transaction_date: "2026-03-25",
    transaction_amount: 500,
    transaction_type: "credit",
    transaction_description: "Refund",
    merchant_name: "Amazon",
    card_type: "debit",
  },
];

/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Array<Object>} transactions
 * @returns {Array<string>}
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map((transaction) => transaction.transaction_type))];
}

/**
 * Вычисляет сумму всех транзакций.
 * @param {Array<Object>} transactions
 * @returns {number}
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce(
    (sum, transaction) => sum + transaction.transaction_amount,
    0
  );
}

/**
 * Вычисляет общую сумму транзакций по дате.
 * Параметры year, month, day являются необязательными.
 * month ожидается в формате 1-12.
 * @param {Array<Object>} transactions
 * @param {number} [year]
 * @param {number} [month]
 * @param {number} [day]
 * @returns {number}
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter((transaction) => {
      const date = new Date(transaction.transaction_date);

      const matchesYear = year === undefined || date.getFullYear() === year;
      const matchesMonth = month === undefined || date.getMonth() + 1 === month;
      const matchesDay = day === undefined || date.getDate() === day;

      return matchesYear && matchesMonth && matchesDay;
    })
    .reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Возвращает транзакции указанного типа.
 * @param {Array<Object>} transactions
 * @param {string} type
 * @returns {Array<Object>}
 */
function getTransactionByType(transactions, type) {
  return transactions.filter((transaction) => transaction.transaction_type === type);
}

/**
 * Возвращает транзакции в указанном диапазоне дат включительно.
 * @param {Array<Object>} transactions
 * @param {string|Date} startDate
 * @param {string|Date} endDate
 * @returns {Array<Object>}
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return transactions.filter((transaction) => {
    const date = new Date(transaction.transaction_date);
    return date >= start && date <= end;
  });
}

/**
 * Возвращает транзакции по названию магазина/сервиса.
 * @param {Array<Object>} transactions
 * @param {string} merchantName
 * @returns {Array<Object>}
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(
    (transaction) =>
      transaction.merchant_name.toLowerCase() === merchantName.toLowerCase()
  );
}

/**
 * Возвращает среднее значение транзакций.
 * @param {Array<Object>} transactions
 * @returns {number}
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) {
    return 0;
  }

  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * Возвращает транзакции с суммой в заданном диапазоне включительно.
 * @param {Array<Object>} transactions
 * @param {number} minAmount
 * @param {number} maxAmount
 * @returns {Array<Object>}
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    (transaction) =>
      transaction.transaction_amount >= minAmount &&
      transaction.transaction_amount <= maxAmount
  );
}

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Array<Object>} transactions
 * @returns {number}
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter((transaction) => transaction.transaction_type === "debit")
    .reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Возвращает месяц (1-12), в котором было больше всего транзакций.
 * Если массив пустой, возвращает null.
 * @param {Array<Object>} transactions
 * @returns {number|null}
 */
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) {
    return null;
  }

  const monthCounts = {};

  transactions.forEach((transaction) => {
    const month = new Date(transaction.transaction_date).getMonth() + 1;
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });

  let maxMonth = null;
  let maxCount = 0;

  for (const month in monthCounts) {
    if (monthCounts[month] > maxCount) {
      maxCount = monthCounts[month];
      maxMonth = Number(month);
    }
  }

  return maxMonth;
}

/**
 * Возвращает месяц (1-12), в котором было больше всего дебетовых транзакций.
 * Если массив пустой или дебетовых транзакций нет, возвращает null.
 * @param {Array<Object>} transactions
 * @returns {number|null}
 */
function findMostDebitTransactionMonth(transactions) {
  const debitTransactions = transactions.filter(
    (transaction) => transaction.transaction_type === "debit"
  );

  if (debitTransactions.length === 0) {
    return null;
  }

  const monthCounts = {};

  debitTransactions.forEach((transaction) => {
    const month = new Date(transaction.transaction_date).getMonth() + 1;
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });

  let maxMonth = null;
  let maxCount = 0;

  for (const month in monthCounts) {
    if (monthCounts[month] > maxCount) {
      maxCount = monthCounts[month];
      maxMonth = Number(month);
    }
  }

  return maxMonth;
}

/**
 * Возвращает тип транзакций, которых больше всего:
 * "debit", "credit" или "equal".
 * @param {Array<Object>} transactions
 * @returns {string}
 */
function mostTransactionTypes(transactions) {
  let debitCount = 0;
  let creditCount = 0;

  transactions.forEach((transaction) => {
    if (transaction.transaction_type === "debit") {
      debitCount++;
    } else if (transaction.transaction_type === "credit") {
      creditCount++;
    }
  });

  if (debitCount > creditCount) {
    return "debit";
  }

  if (creditCount > debitCount) {
    return "credit";
  }

  return "equal";
}

/**
 * Возвращает массив транзакций, совершенных до указанной даты.
 * @param {Array<Object>} transactions
 * @param {string|Date} date
 * @returns {Array<Object>}
 */
function getTransactionsBeforeDate(transactions, date) {
  const targetDate = new Date(date);

  return transactions.filter(
    (transaction) => new Date(transaction.transaction_date) < targetDate
  );
}

/**
 * Возвращает транзакцию по ее идентификатору.
 * Если не найдена, возвращает undefined.
 * @param {Array<Object>} transactions
 * @param {number} id
 * @returns {Object|undefined}
 */
function findTransactionById(transactions, id) {
  return transactions.find((transaction) => transaction.transaction_id === id);
}

/**
 * Возвращает новый массив, содержащий только описания транзакций.
 * @param {Array<Object>} transactions
 * @returns {Array<string>}
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map((transaction) => transaction.transaction_description);
}

/* =========================
   ТЕСТИРОВАНИЕ ФУНКЦИЙ
   ========================= */

console.log("1. Unique transaction types:");
console.log(getUniqueTransactionTypes(transactions));

console.log("2. Total amount:");
console.log(calculateTotalAmount(transactions));

console.log("3. Total amount by year 2026:");
console.log(calculateTotalAmountByDate(transactions, 2026));

console.log("3.1 Total amount by March 2026:");
console.log(calculateTotalAmountByDate(transactions, 2026, 3));

console.log("3.2 Total amount by 2026-03-12:");
console.log(calculateTotalAmountByDate(transactions, 2026, 3, 12));

console.log("4. Transactions by type = debit:");
console.log(getTransactionByType(transactions, "debit"));

console.log("5. Transactions in date range 2026-02-01 to 2026-03-15:");
console.log(getTransactionsInDateRange(transactions, "2026-02-01", "2026-03-15"));

console.log("6. Transactions by merchant = Netflix:");
console.log(getTransactionsByMerchant(transactions, "Netflix"));

console.log("7. Average transaction amount:");
console.log(calculateAverageTransactionAmount(transactions));

console.log("8. Transactions by amount range 50 to 500:");
console.log(getTransactionsByAmountRange(transactions, 50, 500));

console.log("9. Total debit amount:");
console.log(calculateTotalDebitAmount(transactions));

console.log("10. Month with most transactions:");
console.log(findMostTransactionsMonth(transactions));

console.log("11. Month with most debit transactions:");
console.log(findMostDebitTransactionMonth(transactions));

console.log("12. Most transaction types:");
console.log(mostTransactionTypes(transactions));

console.log("13. Transactions before 2026-03-01:");
console.log(getTransactionsBeforeDate(transactions, "2026-03-01"));

console.log("14. Find transaction by id = 4:");
console.log(findTransactionById(transactions, 4));

console.log("15. Transaction descriptions:");
console.log(mapTransactionDescriptions(transactions));

/* =========================
   ДОПОЛНИТЕЛЬНЫЕ ПРОВЕРКИ
   ========================= */

const emptyTransactions = [];

const singleTransaction = [
  {
    transaction_id: 100,
    transaction_date: "2026-04-01",
    transaction_amount: 999,
    transaction_type: "debit",
    transaction_description: "Single test transaction",
    merchant_name: "Test Store",
    card_type: "debit",
  },
];

console.log("Empty array test - total amount:");
console.log(calculateTotalAmount(emptyTransactions));

console.log("Empty array test - average amount:");
console.log(calculateAverageTransactionAmount(emptyTransactions));

console.log("Empty array test - most transactions month:");
console.log(findMostTransactionsMonth(emptyTransactions));

console.log("Single transaction test - unique types:");
console.log(getUniqueTransactionTypes(singleTransaction));

console.log("Single transaction test - total amount:");
console.log(calculateTotalAmount(singleTransaction));

console.log("Single transaction test - descriptions:");
console.log(mapTransactionDescriptions(singleTransaction));
