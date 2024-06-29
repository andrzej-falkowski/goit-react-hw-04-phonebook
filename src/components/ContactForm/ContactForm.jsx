import { useState } from 'react';
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";

const ContactForm = ({ onSubmit }) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onSubmit(newContact);

    setName('');
    setNumber('');
  };


  const nameId = nanoid();
  const numId = nanoid();
  return (
    <div >
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <label htmlFor={nameId}>Name</label>
        <input className={styles.inputContact}
          id={nameId}
          type="text"
          name="name"
          placeholder="Enter name"
          pattern="^([a-zA-Zа-яА-Я]+[ ]?[a-zA-Zа-яА-Я]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
        />
        <label htmlFor={numId}>Phone number</label>
        <input className={styles.inputContact}
          id={numId}
          type="tel"
          name="number"
          placeholder="Enter phone number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.addBtn}>Add contact</button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;