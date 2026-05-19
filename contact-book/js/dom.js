// Функция открывает модальное окно.
export const openModal = (modal) => {
    modal.classList.remove("hidden");
};

// Функция закрывает модальное окно.
export const closeModal = (modal) => {
    modal.classList.add("hidden");
};

// Функция очищает поля формы после добавления контакта.
export const clearForm = (nameInput, phoneInput, emailInput, groupInput, errorElement) => {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    groupInput.value = "";
    errorElement.textContent = "";
};

// Функция создает HTML-карточку одного контакта.
export const createContactCard = (contact) => {
    const card = document.createElement("div");
    card.className = "contact-card";

    const info = document.createElement("div");
    info.className = "contact-info";

    const name = document.createElement("h3");
    name.textContent = contact.name;

    const phone = document.createElement("p");
    phone.textContent = "Телефон: " + contact.phone;

    const email = document.createElement("p");
    email.textContent = "Email: " + contact.email;

    const group = document.createElement("span");
    group.className = "group";
    group.textContent = contact.group;

    info.appendChild(name);
    info.appendChild(phone);
    info.appendChild(email);
    info.appendChild(group);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Удалить";

    deleteButton.dataset.id = contact.id;

    card.appendChild(info);
    card.appendChild(deleteButton);

    return card;
};

// Функция отрисовывает список контактов на странице.
export const renderContacts = (contacts, contactsList) => {
    contactsList.innerHTML = "";

    if (contacts.length === 0) {
        const emptyText = document.createElement("p");
        emptyText.className = "empty-text";
        emptyText.textContent = "Контакты не найдены.";
        contactsList.appendChild(emptyText);
        return;
    }

    contacts.forEach(contact => {
        const card = createContactCard(contact);
        contactsList.appendChild(card);
    });
};
