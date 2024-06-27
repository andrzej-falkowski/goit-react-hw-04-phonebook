import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import styles from "./Filter.module.css";

const Filter = ({ value, handleChange }) => {
  const searchId = nanoid();

  return (
    <div className={styles.filterWrapper}>
      <label htmlFor={searchId}>Find contacts by name </label>
      <input
        className={styles.inputFilter}
        type="text"
        placeholder="Filter contacts"
        id={searchId}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
