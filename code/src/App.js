import { useState, useEffect } from 'react';
import Header from './components/Header';
import Items from './components/Items';
import AddItem from './components/AddItem';

const SERVER_URL = 'http://localhost:8000/app/api/';


function App() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [itemsAvailable, setItemsAvailable] = useState([]);
  const [itemsRented, setItemsRented] = useState([]);

  useEffect(() => {
    const getItems = async () => {

      const itemsFromServer = await fetchItems();
      
      setItemsAvailable(
        itemsFromServer.filter((item) => !item.rented )
      );
      setItemsRented(
        itemsFromServer.filter((item) => item.rented )
      );
    };

    getItems();
  }, []);

  // Fetch Items
  const fetchItems = async () => {
    const res = await fetch(SERVER_URL);
    const data = await res.json();
    
    return data;
  }

  // Add Item
  const addItem = async (item) => {
    const res = await fetch(
      `${SERVER_URL}new/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(item),
      },
    );
    const data = await res.json();

    if (data) {
      if ('Error' in data[0]) {
        console.log(data);
        return;
      }

      const newItem = data[0];      
      if (!newItem.rented) {
        setItemsAvailable([...itemsAvailable, newItem]);
      } else {
        setItemsRented([...itemsRented, newItem]);
      }
    }
  };

  // Rent Item (Get Random Item)
  const rentItem = async () => {
    const res = await fetch(`${SERVER_URL}get/`);
    const data = await res.json();

    if ('Error' in data[0]) {
      console.log(data);
      return;
    }
  
    setItemsAvailable(
      itemsAvailable.filter((item) => item.id !== data[0].id)
    );
    setItemsRented([...itemsRented, data[0]]);
  }

  // Return Rented (Free)
  const returnRented = async (id) => {
    const res = await fetch(
      `${SERVER_URL}free/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: { rented: false },
      },
    );
    const data = await res.json();

    if ('Error' in data[0]) {
      console.log(data);
      return;
    } else if ('Success' in data[0]) {
      const item = itemsRented.map((item) => (item.id === id) && item)[0];
      item.rented = false;
      setItemsRented(itemsRented.filter((item) => item.id !== id));
      setItemsAvailable([...itemsAvailable, item]);
    }
  }

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddItem(!showAddItem)}
        showAdd={showAddItem}
        onRent={rentItem}
      />

      {showAddItem && <AddItem onAdd={addItem} />}
      
      <h3>Bikes available: {itemsAvailable.length}</h3>
      
      {itemsAvailable.length > 0 ? (
        <Items
          items={itemsAvailable}
        />
      ) : (
        'No bikes are available for rent.'
      )}

      <h3>Bikes rented:</h3>
      
      {itemsRented.length > 0 ? (
        <Items
          items={itemsRented}
          onClick={returnRented}
        />
      ) : (
        'No bikes are rented.'
      )}
    </div>
  );
}

export default App;
