import PropTypes from 'prop-types';
import { React } from 'react';

import Button from './Button';

const Header = ({ onAdd, showAdd, onRent }) => (
  <header className="header flex">
    <Button
      classNameModifier="btn-lg"
      text="Rent a random bike"
      onClick={onRent}
    />
    <Button
      color={showAdd ? 'red' : 'green'}
      text={showAdd ? 'Close' : 'Add New'}
      onClick={onAdd}
    />
  </header>
);

Header.propTypes = {
  onAdd: PropTypes.func.isRequired,
  showAdd: PropTypes.bool,
  onRent: PropTypes.func.isRequired,
};

Header.defaultProps = {
  showAdd: false,
};

export default Header;
