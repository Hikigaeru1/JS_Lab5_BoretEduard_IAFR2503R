// Функция проверяет данные формы перед добавлением нового контакта.
export const validateContact = (name, phone, email, group) => {
    if (name.trim() === "") {
        return "Введите имя контакта.";
    }

    if (phone.trim() === "") {
        return "Введите номер телефона.";
    }

    if (phone.length < 6) {
        return "Телефон должен содержать минимум 6 символов.";
    }

    if (email.trim() === "") {
        return "Введите email.";
    }

    if (!email.includes("@")) {
        return "Email должен содержать символ @.";
    }

    if (group === "") {
        return "Выберите группу контакта.";
    }

    return "";
};
