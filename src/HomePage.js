import React, { useState, useEffect } from 'react';
import useFetchDB from "./FetchDB"; // Import the custom hook
import { Link } from 'react-router-dom';
import { getDatabase, ref, push, update, remove } from 'firebase/database'; // Import Firebase utilities
import { signOut } from 'firebase/auth';
import configuration from './configuration';
import { useHistory } from 'react-router-dom';


const {cong, auth} = configuration;


const HomePage = () => {
  const currentUser = useFetchDB(); // Use the custom hook
  const [inventory, setInventory] = useState({});
  const [newItem, setNewItem] = useState({ name: '', price: 0, quantity: 0 });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      setInventory(currentUser.inventory);
    }
  }, [currentUser]);

  useEffect(() => {
    // Calculate the total value of inventory
    const total = Object.values(inventory).reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
    setTotalValue(total);

    const totalItems = Object.values(inventory).reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
    setTotalItems(totalItems);
  }, [inventory]);

  if (!currentUser) {
    return <p>Loading...</p>; // Show a loading state while fetching
  }

  const database = getDatabase(); // Initialize the database instance

  const updateQuantity = (id, quantity) => {
    const userInventoryRef = ref(database, `users/${currentUser.uid}/inventory/${id}`);
    update(userInventoryRef, { quantity })
      .then(() => {
        setInventory((prevInventory) => {
          const updatedInventory = { ...prevInventory };
          updatedInventory[id].quantity = quantity;
          return updatedInventory;
        });
      })
      .catch((error) => {
        console.error("Failed to update the inventory:", error);
      });
  };

  const handleIncrease = (id) => {
    const newQuantity = inventory[id].quantity + 1;
    updateQuantity(id, newQuantity);
  };

  const handleDecrease = (id) => {
    if (inventory[id].quantity > 0) {
      const newQuantity = inventory[id].quantity - 1;
      updateQuantity(id, newQuantity);
    }
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    const userInventoryRef = ref(database, `users/${currentUser.uid}/inventory`);
    const newItemRef = push(userInventoryRef); // Create a new reference for the new item
    const itemId = newItemRef.key;

    const itemData = {
      id: itemId,
      name: newItem.name,
      price: parseFloat(newItem.price) || 0,
      quantity: parseInt(newItem.quantity, 10) || 0,
    };

    update(newItemRef, itemData)
      .then(() => {
        setInventory((prevInventory) => ({
          ...prevInventory,
          [itemId]: itemData,
        }));
        setNewItem({ name: '', price: 0, quantity: 0 }); // Reset the form
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error("Failed to add new item:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleDeleteItem = (id) => {
    const itemRef = ref(database, `users/${currentUser.uid}/inventory/${id}`);
    remove(itemRef)
      .then(() => {
        setInventory((prevInventory) => {
          const updatedInventory = { ...prevInventory };
          delete updatedInventory[id];
          return updatedInventory;
        });
      })
      .catch((error) => {
        console.error("Failed to delete the item:", error);
      });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/')
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };


  return (
    <div>
      <nav className="navbar">
        <h1>{currentUser.username}'s Inventory</h1>
        <div className="links">
          <button onClick={() => { setIsFormVisible(true) }} className='qtBtns'>Add Item</button>
          <button onClick={handleLogout} className='qtBtns'>Log Out</button>
        </div>
      </nav>

      {/* Inventory Table */}
      <table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(inventory).map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{(Number(item.quantity) * Number(item.price)).toFixed(2)}</td>
              <td>
                <button className='qtBtns' onClick={() => handleIncrease(item.id)}>+</button>
                <button className='qtBtns' onClick={() => handleDecrease(item.id)}>-</button>
                <button className='qtBtns' onClick={() => handleDeleteItem(item.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormVisible &&
        <form onSubmit={handleAddNewItem} className='formAdd'>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleChange}
            required
          />
          <button type="submit" className="qtBtns">Add Item</button>
        </form>
      }


      {/* Summary Section */}
      <section className="summary">
        <div>
          <h2>You have {totalItems} items in stock.</h2>
        </div>
        <h2>Your store is worth Rs.{totalValue.toFixed(2)}.</h2>
      </section>
    </div>
  );
};

export default HomePage;
