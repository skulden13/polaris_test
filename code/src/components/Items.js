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

export default Items;
