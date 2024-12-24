// Import required modules and CSS for styling
import { useState } from "react";
import PropTypes from "prop-types"; // For prop type validation
import "../../css/Dropdown.css";

function Dropdown({ onChange, options, defaultValue, placeholder }) {
  // State to manage dropdown open/close status
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the selected option
  const [selectedType, setSelectedType] = useState(defaultValue || "all");

  // Dropdown options (can be dynamic if passed via props)
  const dropdownOptions = [
    { value: "all", label: "All Vendors" },
    { value: "Ice Cream", label: "Ice Cream" },
    { value: "Alcohol Beverages", label: "Alcohol Beverages" },
    { value: "Chinese Cuisines", label: "Chinese Cuisines" },
    { value: "African Food", label: "African Food" },
    { value: "Bakery Delight", label: "Bakery Delight" },
  ];

  // Toggle the dropdown open/close state
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle option selection
  const handleSelect = (value) => {
    setSelectedType(value); // Update selected value
    setIsOpen(false); // Close dropdown
    if (onChange) onChange(value); // Call onChange callback if provided
  };

  return (
    <div className="filterContainer">
      {/* Dropdown trigger */}
      <div className="selectTrigger" onClick={toggleDropdown}>
        <span>
          {dropdownOptions.find((opt) => opt.value === selectedType)?.label || placeholder}
        </span>
        <span className="dropdownArrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="selectContent">
          {dropdownOptions.map((option) => (
            <div
              key={option.value} // Unique key for each option
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

// Define prop types for better error handling and type checking
Dropdown.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  options: [], // Default empty array for options
  placeholder: "Select an option", // Default placeholder
};

export default Dropdown;
