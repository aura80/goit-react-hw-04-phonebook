import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({onAddContact}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('name');

    console.log(
      'DidMount *** Contact form - Content from local storage: ',
      savedName
    );

    if (savedName) {
      setName(JSON.parse(savedName));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name)); // to string JSON
    console.log(
      'DidUpdate *** Contact form - Content from local storage: ',
      localStorage.contacts
    );
  }, [name]);

  useEffect(() => {
    return () => {
      console.log('WillUnmount - Contact form - Saving name to local storage');
      localStorage.setItem('name', JSON.stringify(name));
    };
  }, [name]);

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formclass}>
      <label className={styles.labelclass}>
        Name
        <input
          className={styles.inputclass}
          type="text"
          name="name"
          pattern="^[a-zA-Z]+((['\-\s][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={styles.labelclass}>
        Number
        <input
          className={styles.inputclass}
          type="tel"
          name="number"
          pattern="^\d{3}-\d{2}-\d{2}$|^\d{10,14}$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={styles.buttonclass}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
