import PropTypes from 'prop-types';
import Item from './Item';


const Items = ({ items, onClick }) => {
  return (
    <>
      { items.map((item, id) => (
          <Item key={id} item={item} onClick={onClick} />
        ))
      }
    </>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rented: PropTypes.bool,
  })),
  onClick: PropTypes.func,
};

export default Items;
