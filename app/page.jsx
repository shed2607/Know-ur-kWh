"use client";
import React, { useState, useEffect } from "react";
import powerCost from "./api/powerconsumption";

export default function Home() {
  const [dailyCost, setDailyCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [dailyTime, setDailyTime] = useState(24);
  const [dailyKwh, setDailyKwh] = useState(0);
  const [monthlyKwh, setMonthlyKwh] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [items, setItems] = useState([{ description: "", watts: 0 }]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addNewItem = () => {
    setItems([...items, { description: "", watts: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let totalDailyCost = 0;
    let totalMonthlyCost = 0;
    let totalDailyKwh = 0;
    let totalMonthlyKwh = 0;

    for (const item of items) {
      const { dailyCost, monthlyCost, dailyKwh, monthlyKwh } = powerCost({
        watt: item.watts,
        time: item.time || dailyTime,
        cost: parseFloat(e.target.elements.areaCost.value),
      });

      totalDailyCost += dailyCost;
      totalMonthlyCost += monthlyCost;
      totalDailyKwh += dailyKwh;
      totalMonthlyKwh += monthlyKwh;
    }

    //set the item count
    setItemCount(items.length);
    //set the kwh
    setDailyKwh(totalDailyKwh);
    setMonthlyKwh(totalMonthlyKwh);

    setDailyCost(totalDailyCost);
    setMonthlyCost(totalMonthlyCost);
  }

  const [isLoading, setIsLoading] = useState(true); // Initialize with true

  useEffect(() => {
    // Add a delay of 3 seconds before turning off the loading screen
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 3 seconds delay

    return () => {
      clearTimeout(loadingTimeout); // Clear the loading timeout when unmounting
    };
  }, []);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="main border-4 p-10 rounded-xl border-red-400">
          <h1 className="text-4xl font-bold text-center">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-400">Power Consumption Calculator</h1>
      <h2 className="text-l font-bold mb-10 text-gray-600">
        Welcome to the Monthly kWh Calculator! Easily estimate your monthly
        energy consumption with just a few clicks. Discover your electricity
        usage and costs effortlessly.
      </h2>
      <div className="main border-4 p-10 rounded-xl border-red-400">
        <form onSubmit={handleSubmit}>
          <section className="flex mb-16 items-center">
            <span className="mr-4 text-2xl">Area Cost:</span>
            <input
              type="text"
              placeholder="N/kWh"
              className="inputs"
              name="areaCost"
            />
          </section>
          <section>
            <ItemsList
              items={items}
              onItemChange={handleItemChange}
              onAddItem={addNewItem}
              onRemoveItem={removeItem}
            />
          </section>
          <section className="flex  items-end justify-center">
            <div className="mt-4 flex">
              <div className="mx-5 flex flex-col items-center">
                <p className="text-2xl ">Total Items: </p>
                <p className="text-2xl ">{itemCount}</p>
              </div>
              <div className="mx-5 flex flex-col items-center">
                <p className="text-2xl ">Daily Kwh: </p>
                <p className="text-2xl ">{dailyKwh.toFixed(2)}kWh</p>
              </div>
              <div className="mx-5 flex flex-col items-center">
                <p className="text-2xl ">Monthy Kwh: </p>
                <p className="text-2xl ">{monthlyKwh.toFixed(2)}kWh</p>
              </div>
              <div className="mx-5 flex flex-col items-center">
                <p className="text-2xl ">Daily Cost: </p>
                <p className="text-2xl ">N{dailyCost.toFixed(2)}</p>
              </div>
              <div className="mx-5 flex flex-col items-center">
                <p className="text-2xl ">Monthly Cost: </p>
                <p className="text-2xl ">N{monthlyCost.toFixed(2)}</p>
              </div>
            </div>
          </section>
          <section>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Calculate
            </button>
          </section>
        </form>
      </div>
      <footer>
        <p className="my-10 text-black ">
          Copyright © 2023 by Oluwaseun Adeniyi. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

const ItemsList =({
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
}) => {
  return (
    <div className="flex flex-col my-5">
      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Item...."
            className="inputs mr-4"
            value={item.description}
            onChange={(e) => onItemChange(index, "description", e.target.value)}
          />
          <input
            type="number"
            placeholder="Estimated time: 24 defult"
            className="inputs mr-4"
            value={item.time}
            onChange={(e) =>
              onItemChange(index, "time", parseFloat(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Item Watts"
            className="inputs"
            value={item.watts}
            onChange={(e) =>
              onItemChange(index, "watts", parseFloat(e.target.value))
            }
          />
          W
          <span
            style={{ cursor: "pointer" }}
            onClick={() => onRemoveItem(index)}
            className="ml-4 self-end border-4 bg-red-400 px-5 py-3 rounded-full"
          >
            -
          </span>
        </div>
      ))}
      <span
        style={{ cursor: "pointer" }}
        onClick={onAddItem}
        className="self-end border-4 bg-green-400 px-5 py-3 rounded-full"
      >
        +
      </span>
      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          height: 2,
          marginTop: 20,
        }}
      />
    </div>
  );
}
