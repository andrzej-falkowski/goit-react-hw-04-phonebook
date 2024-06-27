import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import styles from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const updatedContacts = this.state.contacts;

    if (updatedContacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  }

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  addContact = (newContact) => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase(),
    );

    if (isInContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleDelete = (event) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => contact.id !== event),
      };
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={styles.header}>Contacts</h2>
        <Filter value={filter} handleChange={this.handleFilter} />
        <ContactList
          filter={this.state.filter}
          contacts={this.state.contacts}
          removeContact={this.handleDelete}
        />
      </div>
    );
  }
}
