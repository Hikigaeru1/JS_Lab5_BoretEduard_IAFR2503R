import { generateId, formatDate } from './utils.js';
import {
  saveTransaction,
  removeTransaction,
  findTransactionById,
  calculateTotal,
} from './transactions.js';
import {
  renderTransaction,
  removeTransactionRow,
  updateTotal,
  showTransactionDetails,
  showError,
  clearError,
} from './ui.js';

const form = document.querySelector('#transaction-form');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');
const descriptionInput = document.querySelector('#description');
const table = document.querySelector('#transactions-table');
const tableBody = document.querySelector('#transactions-body');
const totalAmountElement = document.querySelector('#total-amount');
const detailsElement = document.querySelector('#transaction-details');
const errorElement = document.querySelector('#form-error');

/**
 * Проверяет корректность данных формы.
 *
 * @param {number} amount - Сумма транзакции.
 * @param {string} category - Категория транзакции.
 * @param {string} description - Описание транзакции.
 * @returns {string} Текст ошибки. Если ошибок нет, возвращается пустая строка.
 */
function validateForm(amount, category, description) {
  if (Number.isNaN(amount)) {
    return 'Введите корректную сумму транзакции.';
  }

  if (amount === 0) {
    return 'Сумма транзакции не должна быть равна 0.';
  }

  if (!category) {
    return 'Выберите категорию транзакции.';
  }

  if (description.length < 3) {
    return 'Описание должно содержать минимум 3 символа.';
  }

  return '';
}

/**
 * Создает транзакцию из данных формы, сохраняет ее в массиве
 * и добавляет новую строку в таблицу.
 *
 * @param {SubmitEvent} event - Событие отправки формы.
 * @returns {void}
 */
function addTransaction(event) {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const category = categorySelect.value;
  const description = descriptionInput.value.trim();
  const validationError = validateForm(amount, category, description);

  if (validationError) {
    showError(errorElement, validationError);
    return;
  }

  clearError(errorElement);

  const transaction = {
    id: generateId(),
    date: formatDate(new Date()),
    amount,
    category,
    description,
  };

  saveTransaction(transaction);
  renderTransaction(tableBody, transaction);
  updateTotal(totalAmountElement, calculateTotal());

  form.reset();
}

/**
 * Обрабатывает клики внутри таблицы транзакций.
 * Удаление транзакции и показ полного описания реализованы через делегирование событий.
 *
 * @param {MouseEvent} event - Событие клика по таблице.
 * @returns {void}
 */
function handleTableClick(event) {
  const deleteButton = event.target.closest('.delete-button');

  if (deleteButton) {
    const id = deleteButton.dataset.id;

    removeTransaction(id);
    removeTransactionRow(table, id);
    updateTotal(totalAmountElement, calculateTotal());

    detailsElement.textContent = 'Нажмите на строку таблицы, чтобы увидеть полное описание транзакции.';
    return;
  }

  const row = event.target.closest('tr[data-id]');

  if (row) {
    const transaction = findTransactionById(row.dataset.id);

    if (transaction) {
      showTransactionDetails(detailsElement, transaction);
    }
  }
}

form.addEventListener('submit', addTransaction);
table.addEventListener('click', handleTableClick);
