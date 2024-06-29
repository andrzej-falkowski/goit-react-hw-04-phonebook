import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ filter, contacts, removeContact }) => {
  console.log(contacts)
  return (
    <>
      <ul className={styles.contactsList}>
        {contacts
          .filter((element) =>
            element.name.toLowerCase().includes(filter.toLowerCase()),
          )
          .map((contact) => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button
                className={styles.listButton}
                type="submit"
                onClick={() => removeContact(contact.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};


ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  removeContact: PropTypes.func,
};

export default ContactList;