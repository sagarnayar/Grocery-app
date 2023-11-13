import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [groceryItem, setGroceryItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  useEffect(() => {
    // Fetch grocery item data from the server
    axios.get('/api/grocery/1') // Assuming you want details for item with ID 1
      .then(response => setGroceryItem(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addNewItem = () => {
    const newItem = { name: newItemName, price: parseFloat(newItemPrice) };

    // Send a POST request to add a new grocery item
    axios.post('/api/grocery', newItem)
      .then(response => {
        setGroceryItem(response.data);
        setNewItemName('');
        setNewItemPrice('');
      })
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div className="App">
      <div className="grocery-details">
        <h2>Grocery Details</h2>
        {groceryItem && (
          <div>
            <p>Name: {groceryItem.name}</p>
            <p>Price: ${groceryItem.price.toFixed(2)}</p>
            {/* Add more details here as needed */}
          </div>
        )}
      </div>
      <div className="add-item">
        <h2>Add New Item</h2>
        <label>Name: <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} /></label>
        <label>Price: <input type="text" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} /></label>
        <button onClick={addNewItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;