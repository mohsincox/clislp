import React, { useState } from "react";

export default function Test() {
  const toppings = [
    {
      name: "Capsicum",
      price: 1.2,
    },
    {
      name: "Paneer",
      price: 2.0,
    },
    {
      name: "Red Paprika",
      price: 2.5,
    },
    {
      name: "Onions",
      price: 3.0,
    },
    {
      name: "Extra Cheese",
      price: 3.5,
    },
    {
      name: "Baby Corns",
      price: 3.0,
    },
    {
      name: "Mushroom",
      price: 2.0,
    },
  ];

  return (
    <div className="App">
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {toppings.map(({ name, price }, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{price}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
