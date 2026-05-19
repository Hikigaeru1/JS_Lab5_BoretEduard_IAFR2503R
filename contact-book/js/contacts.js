// Функция добавляет новый контакт в массив.
export const addContact = (contacts, newContact) => {
    contacts.push(newContact);
};

// Функция удаляет контакт из массива по id.
export const deleteContact = (contacts, contactId) => {
    return contacts.filter(contact => contact.id !== contactId);
};

// Функция ищет контакты по имени, телефону или email.
export const searchContacts = (contacts, searchText) => {
    const text = searchText.toLowerCase();

    return contacts.filter(contact => {
        return (
            contact.name.toLowerCase().includes(text) ||
            contact.phone.toLowerCase().includes(text) ||
            contact.email.toLowerCase().includes(text)
        );
    });
};

// Функция фильтрует контакты по группе.
export const filterContactsByGroup = (contacts, group) => {
    if (group === "all") {
        return contacts;
    }

    return contacts.filter(contact => contact.group === group);
};

// Функция сортирует контакты по выбранному полю.
export const sortContacts = (contacts, sortType) => {
    const sortedContacts = [...contacts];

    sortedContacts.sort((a, b) => {
        if (a[sortType] > b[sortType]) {
            return 1;
        }

        if (a[sortType] < b[sortType]) {
            return -1;
        }

        return 0;
    });

    return sortedContacts;
};
