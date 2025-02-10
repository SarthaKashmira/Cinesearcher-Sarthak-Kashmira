import { useState } from "react";

const ViewHistory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const historyItems = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
  ];

  return (
    <div className="mx-auto  mt-1 w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
      {/* Title */}
      <h1 className="mb-4 text-center text-xl font-bold">View History</h1>
      {/* Scrollable Container */}
      <div className="h-screen space-y-3 overflow-y-auto">
        {historyItems.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-lg p-4 text-center transition-colors duration-200 ${
              selectedItem === index
                ? "bg-selectViewHistory text-white"
                : "bg-viewHistory text-black"
            }`}
            onClick={() => setSelectedItem(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHistory;
