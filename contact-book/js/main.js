import { contacts } from "./data.js";

import {
    addContact,
    deleteContact,
    searchContacts,
    filterContactsByGroup,
    sortContacts
} from "./contacts.js";

import {
    openModal,
    closeModal,
    clearForm,
    renderContacts
} from "./dom.js";

import { validateContact } from "./validation.js";

let contactsArray = contacts;

// Получаем элементы страницы.
const contactsList = document.querySelector("#contactsList");

const openModalBtn = document.querySelector("#openModalBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const modal = document.querySelector("#modal");

const contactForm = document.querySelector("#contactForm");

const nameInput = document.querySelector("#nameInput");
const phoneInput = document.querySelector("#phoneInput");
const emailInput = document.querySelector("#emailInput");
const groupInput = document.querySelector("#groupInput");

const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const filterSelect = document.querySelector("#filterSelect");

const formError = document.querySelector("#formError");

// Функция применяет поиск, фильтрацию и сортировку.
const updateContactsView = () => {
    const searchText = searchInput.value;
    const sortType = sortSelect.value;
    const group = filterSelect.value;

    let result = searchContacts(contactsArray, searchText);
    result = filterContactsByGroup(result, group);
    result = sortContacts(result, sortType);

    renderContacts(result, contactsList);
};

// Обработчик открытия модального окна.
openModalBtn.addEventListener("click", () => {
    openModal(modal);
});

// Обработчик закрытия модального окна.
closeModalBtn.addEventListener("click", () => {
    closeModal(modal);
});

// Закрытие модального окна при клике по темному фону.
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal(modal);
    }
});

// Обработчик отправки формы.
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const group = groupInput.value;

    const errorText = validateContact(name, phone, email, group);

    if (errorText !== "") {
        formError.textContent = errorText;
        return;
    }

    const newContact = {
        id: Date.now(),
                             name: name.trim(),
                             phone: phone.trim(),
                             email: email.trim(),
                             group: group
    };

    addContact(contactsArray, newContact);

    clearForm(nameInput, phoneInput, emailInput, groupInput, formError);
    closeModal(modal);
    updateContactsView();
});

// Обработчик удаления контакта.
contactsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-danger")) {
        const contactId = Number(event.target.dataset.id);

        contactsArray = deleteContact(contactsArray, contactId);

        updateContactsView();
    }
});

// Обработчик поиска при вводе текста.
searchInput.addEventListener("input", () => {
    updateContactsView();
});

// Обработчик сортировки.
sortSelect.addEventListener("change", () => {
    updateContactsView();
});

// Обработчик фильтрации.
filterSelect.addEventListener("change", () => {
    updateContactsView();
});

// Первая отрисовка контактов при загрузке страницы.
updateContactsView();
