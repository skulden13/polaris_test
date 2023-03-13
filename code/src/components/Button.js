import PropTypes from 'prop-types';


const Button = ({
  color, classNameModifier, text, onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${classNameModifier}`}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  )
};

Button.defaultProps = {
  classNameModifier: '',
  color: 'steelBlue',
};

Button.propTypes = {
  classNameModifier: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
