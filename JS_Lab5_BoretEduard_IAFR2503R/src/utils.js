/**
 * Генерирует уникальный идентификатор для транзакции.
 *
 * @returns {string} Уникальный идентификатор.
 */
export function generateId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Форматирует дату в удобный для пользователя вид.
 *
 * @param {Date} date - Объект даты.
 * @returns {string} Отформатированная дата и время.
 */
export function formatDate(date) {
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Возвращает краткое описание транзакции: первые четыре слова.
 *
 * @param {string} description - Полное описание транзакции.
 * @returns {string} Краткое описание транзакции.
 */
export function getShortDescription(description) {
  return description.trim().split(/\s+/).slice(0, 4).join(' ');
}
