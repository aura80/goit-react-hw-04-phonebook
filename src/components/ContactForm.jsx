import { useState, useEffect, useRef, useContext } from 'react';
import { ContactContext } from './ContactContext';
// import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // accessing the context
  const { onAddContact } = useContext(ContactContext);

  // creates references for inputs
  const nameInputRef = useRef(null);
  const numberInputRef = useRef(null);
  const buttonRef = useRef(null);

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
    nameInputRef.current.focus();
    console.log('Button submit is: ', buttonRef.current)
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
          ref={nameInputRef} // assigns the reference
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
          ref={numberInputRef} // assigns the reference
        />
      </label>
      <button type="submit" ref={buttonRef} className={styles.buttonclass}>
        Add contact
      </button>
    </form>
  );
};

// no need since we use context
// ContactForm.propTypes = {
//   onAddContact: PropTypes.func.isRequired,
// };

export default ContactForm;
