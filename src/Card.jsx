import React, { useState } from 'react';

const Card = ({ data, onButtonConnect }) => {
  const [buttons, setButtons] = useState(data.buttons || []);

  const addButton = () => {
    const newButton = `Button ${buttons.length + 1}`;
    setButtons((prev) => [...prev, newButton]);
  };

  const handleButtonClick = (button) => {
    if (onButtonConnect) {
      onButtonConnect(button, data.label);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="mb-2 font-bold">{data.label}</div>
      <div>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button)}
            className="bg-blue-500 text-white p-1 rounded mb-1 mr-2"
          >
            {button}
          </button>
        ))}
      </div>
      <button
        onClick={addButton}
        className="mt-2 bg-green-500 text-white p-1 rounded"
      >
        + Add Button
      </button>
    </div>
  );
};

export default Card;
