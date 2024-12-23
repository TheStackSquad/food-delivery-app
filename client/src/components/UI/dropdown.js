//client/src/components/UI/dropdown.js
import { useState } from "react";


function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("all");

  const options = [
    { value: "all", label: "All Vendors" },
    { value: "Ice Cream", label: "Ice Cream" },
    { value: "Alcohol Beverages", label: "Alcohol Beverages" },
    { value: "Chinese Cuisines", label: "Chinese Cuisines" },
    { value: "African Food", label: "African Food" },
    { value: "Bakery Delight", label: "Bakery Delight" },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value) => {
    setSelectedType(value);
    setIsOpen(false);
  };

  return (
    <div className="filterContainer">
      <div className="selectTrigger" onClick={toggleDropdown}>
        <span>{options.find((opt) => opt.value === selectedType)?.label || "Select vendor type"}</span>
        <span className="dropdownArrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="selectContent">
          {options.map((option) => (
            <div
              key={option.value}
              className="selectItem"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
