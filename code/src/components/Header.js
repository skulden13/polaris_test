import PropTypes from 'prop-types';
import Button from './Button';


const Header = ({ onAdd, showAdd, onRent }) => {
  return (
    <header className='header flex'>
      <Button
        classNameModifier='btn-lg'
        text={'Rent a random bike'}
        onClick={onRent}
      />
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add New'}
        onClick={onAdd}
      />
    </header>
  );
};

Header.propTypes = {
  onAdd: PropTypes.func,
  showAdd: PropTypes.bool,
  onRent: PropTypes.func,
};

export default Header;
