/**
 * Массив для хранения всех транзакций пользователя.
 *
 * @type {Array<{id: string, date: string, amount: number, category: string, description: string}>}
 */
export const transactions = [];

/**
 * Добавляет транзакцию в массив transactions.
 *
 * @param {{id: string, date: string, amount: number, category: string, description: string}} transaction - Объект транзакции.
 * @returns {void}
 */
export function saveTransaction(transaction) {
  transactions.push(transaction);
}

/**
 * Удаляет транзакцию из массива по ее идентификатору.
 *
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {void}
 */
export function removeTransaction(id) {
  const index = transactions.findIndex((transaction) => transaction.id === id);

  if (index !== -1) {
    transactions.splice(index, 1);
  }
}

/**
 * Ищет транзакцию по идентификатору.
 *
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {{id: string, date: string, amount: number, category: string, description: string}|undefined} Найденная транзакция или undefined.
 */
export function findTransactionById(id) {
  return transactions.find((transaction) => transaction.id === id);
}

/**
 * Подсчитывает общую сумму всех транзакций.
 *
 * @returns {number} Общая сумма транзакций.
 */
export function calculateTotal() {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}
