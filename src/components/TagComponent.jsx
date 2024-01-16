import React, { useState, useRef } from "react";

import json from "../data";
import Chip from "./Chip";

const TagComponent = () => {
  const [data, setData] = useState(json || []);
  const [tags, setTags] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const isExistingOption = data.some(
        (item) => item.name.toLowerCase() === inputValue.toLowerCase()
      );

      if (inputValue.trim() && isExistingOption && !tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
        setInputValue("");
        setFilteredItems(data.filter((item) => !tags.includes(item)));
      }
    } else if (e.key === "Backspace" && e.target.value === "") {
      if (highlightedChip !== null) {
        setTags(tags.filter((_, i) => i !== highlightedChip));
        setHighlightedChip(null);
      } else {
        const lastTagIndex = tags.length - 1;
        if (lastTagIndex >= 0) {
          setHighlightedChip(lastTagIndex);
        }
        setShowSuggestions(false);
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
    setHighlightedChip(null);
    setFilteredItems(data.filter((item) => !tags.includes(item)));
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter items based on user input, excluding those already in tags
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) &&
        !tags.includes(item.name)
    );

    setFilteredItems(filtered);
  };

  const handleItemClick = (item) => {
    setTags([...tags, item.name]);
    setInputValue("");
    setHighlightedChip(null);
    setFilteredItems(
      filteredItems.filter((filteredItem) => filteredItem !== item)
    );
  };

  return (
    <>
      <div className="border-2 p-2 rounded-md max-w-2xl mx-auto mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index}>
            <span className="text">
              <Chip
                index={index}
                text={tag}
                image={tags[index].image}
                removeTag={removeTag}
                highlighted={highlightedChip === index}
              />
            </span>
          </div>
        ))}
        <div>
          <input
            ref={inputRef}
            onFocus={() => {
              setFilteredItems(
                data.filter((item) => !tags.includes(item.name))
              );
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={inputValue}
            type="text"
            className="flex-grow p-2 border-none outline-none"
            placeholder="Type something"
          />
          {showSuggestions && (
            <ul className="relative list-none px-2 m-0 mt-2 w-96 shadow-lg max-h-36 bg-white overflow-y-auto ">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer p-2  hover:bg-gray-200"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt="U_img"
                        className="h-5 w-5 relative inline-block -translate-x-0.5 !rounded-full  object-cover object-center"
                      />
                      <p className="align font-bold">{item.name}</p>
                    </div>
                    <p className="text-right text-sm text-gray-400">
                      {item.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TagComponent;
