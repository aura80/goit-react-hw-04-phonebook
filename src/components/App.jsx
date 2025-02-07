import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './ContactForm.module.css';
import Filter from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => { 
    const localSavedContacts = localStorage.getItem('contacts');

    return localSavedContacts ? JSON.parse(localSavedContacts)
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const localSavedContacts = localStorage.getItem('contacts');

    if (localSavedContacts) {
      setContacts(JSON.parse(localSavedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('DidUpdate - App - Contacts saved to local storage', contacts);
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const lowerContactName = name.toLowerCase();

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === lowerContactName
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(previousContacts => [...previousContacts, newContact]);
    }
  };
  
  const handleDeleteContact = id => {
    setContacts(previousContacts =>
      previousContacts.filter(contact => contact.id !== id)
    );
  }

  const handleFilterChange = filter => {
    setFilter(filter);
  }

  const getFilteredContacts = () => {
    const filterLower = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(filterLower));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}
