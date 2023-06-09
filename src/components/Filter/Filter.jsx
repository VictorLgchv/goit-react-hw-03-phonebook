import { nanoid } from 'nanoid';
import { Div } from './Filter.syled';
import PropTypes from 'prop-types';

const formId = nanoid();

export const Filter = ({ value, filter }) => {
  return (
    <Div>
      <label htmlFor={formId}>Find contacts by name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={value}
        onChange={filter}
        id={formId}
      />

      <br />
    </Div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
};
