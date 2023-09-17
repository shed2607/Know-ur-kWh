import React from "react";

export default function ItemsList({
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
}) {
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
