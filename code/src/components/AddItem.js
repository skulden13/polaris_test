import PropTypes from 'prop-types';
import { useState } from 'react';


const AddItem = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [rented, setRented] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) { 
      alert('Please give a bike name');
      return;
    }

    onAdd({ name, rented });
    setName('');
    setRented(false);
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Bike name</label>
        <input
          type='text'
          placeholder='Enter a Bike Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> 
      </div>

      <div className="flex">
        <div className='form-control form-control-check flex'>
          <label>Rented</label>
          <input
            type='checkbox'
            checked={rented}
            value={rented}
            onChange={(e) => setRented(e.currentTarget.checked)}
          />
        </div>

        <input type="submit" value="Save Bike" className="btn btn-success" />
      </div>
    </form>
  )
}

AddItem.propTypes = {
  onAdd: PropTypes.func,
};

export default AddItem;
