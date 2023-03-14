import {
 React, useState, useEffect, useCallback,
} from 'react';

import AddItem from './components/AddItem';
import Header from './components/Header';
import Items from './components/Items';
import { API_URL } from './const';

function App() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [itemsAvailable, setItemsAvailable] = useState([]);
  const [itemsRented, setItemsRented] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      // Fetch Items
      const fetchItems = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();

        return data;
      };

      const itemsFromServer = await fetchItems();

      setItemsAvailable(
        itemsFromServer.filter((item) => !item.rented),
      );
      setItemsRented(
        itemsFromServer.filter((item) => item.rented),
      );
    };

    getItems();
  }, []);

  // Add Item
  const addItem = useCallback(async (item) => {
    const res = await fetch(
      `${API_URL}new/`, {
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
        window.console.log(data);
        return;
      }

      const newItem = data[0];
      if (!newItem.rented) {
        setItemsAvailable([...itemsAvailable, newItem]);
      } else {
        setItemsRented([...itemsRented, newItem]);
      }
    }
  }, [itemsAvailable, setItemsAvailable, itemsRented, setItemsRented]);

  // Rent Item (Get Random Item)
  const rentItem = useCallback(async () => {
    const res = await fetch(`${API_URL}get/`);
    const data = await res.json();

    if ('Error' in data[0]) {
      window.console.log(data);
      return;
    }

    setItemsAvailable(
      itemsAvailable.filter((item) => item.id !== data[0].id),
    );
    setItemsRented([...itemsRented, data[0]]);
  }, [itemsAvailable, setItemsAvailable, itemsRented, setItemsRented]);

  // Return Rented (Free)
  const returnRented = useCallback(async (id) => {
    const res = await fetch(
      `${API_URL}free/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: { rented: false },
      },
    );
    const data = await res.json();

    if ('Error' in data[0]) {
      window.console.log(data);
    } else if ('Success' in data[0]) {
      const itemToFree = itemsRented.filter((i) => i && i.id === id)[0];
      itemToFree.rented = false;
      setItemsRented(itemsRented.filter((i) => i && i.id !== id));
      setItemsAvailable([...itemsAvailable, itemToFree]);
    }
  }, [itemsAvailable, setItemsAvailable, itemsRented, setItemsRented]);

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

      <h3>Bikes rented: {itemsRented.length}</h3>

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
