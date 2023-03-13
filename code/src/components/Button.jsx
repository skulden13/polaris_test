import PropTypes from 'prop-types';
import { React } from 'react';

const Button = ({
  color, classNameModifier, text, onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`btn ${classNameModifier}`}
    style={{ backgroundColor: color }}
  >
    {text}
  </button>
);

Button.propTypes = {
  classNameModifier: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  classNameModifier: '',
  text: '',
  color: 'steelBlue',
};

export default Button;
