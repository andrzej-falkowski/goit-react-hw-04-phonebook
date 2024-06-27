import { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.props.onSubmit(newContact);

    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const nameId = nanoid();
    const numId = nanoid();
    return (
      <div >
        <form onSubmit={this.handleSubmit} className={styles.wrapper}>
          <label htmlFor={nameId}>Name</label>
          <input className={styles.inputContact}
            id={nameId}
            type="text"
            name="name"
            placeholder="Enter name"
            pattern="^([a-zA-Zа-яА-Я]+[ ]?[a-zA-Zа-яА-Я]+)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <label htmlFor={numId}>Phone number</label>
          <input className={styles.inputContact}
            id={numId}
            type="tel"
            name="number"
            placeholder="Enter phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            onChange={this.handleChange}
            required
          />
          <button type="submit" className={styles.addBtn}>Add contact</button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
