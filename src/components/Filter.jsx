// import PropTypes from 'prop-types';
import { ContactContext } from './ContactContext';
import { useContext } from 'react';

const Filter = () => {
  const { filter, onFilterChange } = useContext(ContactContext);

  const handleFilterChange = event => {
    onFilterChange(event.target.value);
  }

  return (
    <div>
      <label>
        Find contacts by Name
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          style={{ marginLeft: '10px' }}
        />
      </label>
    </div>
  );
};

// no need since we added context
// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
// e.target.value is the current value of the input

export default Filter;
