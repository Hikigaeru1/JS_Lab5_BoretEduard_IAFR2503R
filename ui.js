import { getShortDescription } from './utils.js';

/**
 * Создает строку таблицы на основе объекта транзакции.
 *
 * @param {{id: string, date: string, amount: number, category: string, description: string}} transaction - Объект транзакции.
 * @returns {HTMLTableRowElement} Строка таблицы с данными транзакции.
 */
export function createTransactionRow(transaction) {
  const row = document.createElement('tr');
  row.dataset.id = transaction.id;
  row.classList.add(transaction.amount >= 0 ? 'transaction-income' : 'transaction-expense');

  const dateCell = document.createElement('td');
  dateCell.textContent = transaction.date;

  const categoryCell = document.createElement('td');
  categoryCell.textContent = transaction.category;

  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = getShortDescription(transaction.description);

  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Удалить';
  deleteButton.classList.add('delete-button');
  deleteButton.dataset.id = transaction.id;

  actionCell.append(deleteButton);
  row.append(dateCell, categoryCell, descriptionCell, actionCell);

  return row;
}

/**
 * Добавляет строку транзакции в тело таблицы.
 *
 * @param {HTMLTableSectionElement} tableBody - Элемент tbody таблицы.
 * @param {{id: string, date: string, amount: number, category: string, description: string}} transaction - Объект транзакции.
 * @returns {void}
 */
export function renderTransaction(tableBody, transaction) {
  const row = createTransactionRow(transaction);
  tableBody.append(row);
}

/**
 * Удаляет строку таблицы по идентификатору транзакции.
 *
 * @param {HTMLTableElement} table - HTML-таблица с транзакциями.
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {void}
 */
export function removeTransactionRow(table, id) {
  const row = table.querySelector(`tr[data-id="${id}"]`);

  if (row) {
    row.remove();
  }
}

/**
 * Отображает общую сумму транзакций на странице.
 *
 * @param {HTMLElement} totalElement - Элемент для вывода общей суммы.
 * @param {number} total - Общая сумма транзакций.
 * @returns {void}
 */
export function updateTotal(totalElement, total) {
  totalElement.textContent = total.toFixed(2);
}

/**
 * Отображает подробную информацию о выбранной транзакции.
 *
 * @param {HTMLElement} detailsElement - Элемент для вывода подробностей.
 * @param {{id: string, date: string, amount: number, category: string, description: string}} transaction - Объект транзакции.
 * @returns {void}
 */
export function showTransactionDetails(detailsElement, transaction) {
  detailsElement.innerHTML = `
    <p><strong>Дата:</strong> ${transaction.date}</p>
    <p><strong>Категория:</strong> ${transaction.category}</p>
    <p><strong>Сумма:</strong> ${transaction.amount.toFixed(2)}</p>
    <p><strong>Полное описание:</strong> ${transaction.description}</p>
  `;
}

/**
 * Отображает сообщение об ошибке формы.
 *
 * @param {HTMLElement} errorElement - Элемент для вывода ошибки.
 * @param {string} message - Текст ошибки.
 * @returns {void}
 */
export function showError(errorElement, message) {
  errorElement.textContent = message;
}

/**
 * Очищает сообщение об ошибке формы.
 *
 * @param {HTMLElement} errorElement - Элемент для вывода ошибки.
 * @returns {void}
 */
export function clearError(errorElement) {
  errorElement.textContent = '';
}
