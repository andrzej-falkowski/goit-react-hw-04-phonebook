import { useState, useEffect } from 'react';
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import styles from "./App.module.css";

const savedContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

function App() {

  const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? savedContacts;
  });

  const addContact = (newContact) => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase(),
    );

    if (isInContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);

  };

  const handleFilter = (event) => {
    const filter = event.currentTarget.value;
    console.log(filter)
    setFilter(filter);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleDelete = (contactId) => {
    setContacts(prevContacts => prevContacts.filter
      (({ id }) => id !== contactId)
    )
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.header}>Contacts</h2>
      <Filter value={filter} handleChange={handleFilter} />
      <ContactList
        filter={filter}
        contacts={contacts}
        removeContact={handleDelete}
      />
    </div>
  );
}

export default App;