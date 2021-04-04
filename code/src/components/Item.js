import { FaBiking } from 'react-icons/fa';
import Button from './Button';


const Item = ({ item, onClick }) => {
  return (
    <div
      className={`item ${item.rented ? 'is-rented' : ''}`}
    >
      <div className='item-inner'>
        <h4>
          <FaBiking
            className="margin-right"
            style={{ color: item.rented ? 'red' : 'green' }}
          />
          {item.name}
        </h4>
        {item.rented && 
          <Button
            classNameModifier='btn-sm'
            onClick={(id) => onClick(item.id)}
            text='Return'
          />
        }
      </div>
    </div>
  );
};

export default Item;
