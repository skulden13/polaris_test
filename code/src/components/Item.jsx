import PropTypes from 'prop-types';
import { React } from 'react';
import { FaBiking } from 'react-icons/fa';

import Button from './Button';

const Item = ({ item, onClick }) => (
  <div
    className={`item ${item.rented ? 'is-rented' : ''}`}
  >
    <div className="item-inner">
      <h4>
        <FaBiking
          className="margin-right"
          style={{ color: item.rented ? 'red' : 'green' }}
        />
        {item.name}
      </h4>
      {item.rented
          && (
            <Button
              classNameModifier="btn-sm"
              onClick={() => onClick(item.id)}
              text="Return"
            />
          )}
    </div>
  </div>
);

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rented: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Item;
