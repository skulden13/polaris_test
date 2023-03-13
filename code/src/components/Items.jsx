import PropTypes from 'prop-types';
import { React } from 'react';

import Item from './Item';

const Items = ({ items, onClick }) => (
  <>
    { items.map((item) => (
      <Item key={item.id} item={item} onClick={onClick} />
    ))}
  </>
);

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rented: PropTypes.bool,
  })),
  onClick: PropTypes.func,
};

Items.defaultProps = {
  items: [],
  onClick: () => {},
};

export default Items;
