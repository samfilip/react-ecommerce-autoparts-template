import './Inventory.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InventoryChart from './InventoryChart';
// import PurchaseTable from "../Purchases/PurchaseTable";

const Inventory = () => {
  const testing = false;
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(chats);
  });
  if (testing === true) {
    const getInventory = () => {
      fetch(`/api/productsByUser/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => data.json())
        .then((parsedData) => setInventory(parsedData));
    };

    useEffect(() => {
      getInventory();
    }, []);
  }
  return (
    <div id="inventory">
      <div className="main__title">
        <div className="main__greeting">
          <h1>{`Hello, ${user.name}!`}</h1>
          <p>Welcome to your admin dashboard</p>
        </div>
      </div>
      <InventoryChart />
      <div>
        {inventory.map((item) => (
          <div className="inventoryItems">
            <h4 className="inventoryItems__title">{`Title: ${item.title}`}</h4>
            <p>{`Make: ${item.make}`}</p>
            <p>{`Year: ${item.year}`}</p>
            <p>{`description: ${item.description}`}</p>
            <p>{`Price: ${item.price}`}</p>
            <p>{`Condition: ${item.condition}`}</p>
            <p>{`Borough: ${item.borough}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
