import React from "react";

const Chip = (props) => {
  const chipStyle = {
    border: props.highlighted ? "2px solid red" : "2px solid #ccc",
  };
  return (
    <div>
      <div
        className="relative flex items-center whitespace-nowrap rounded-full bg-gray-300 px-3 py-1.5 font-sans text-xs font-bold uppercase text-white"
        style={chipStyle}
      >
        <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
          <img
            alt="Tania Andrew"
            src={props.image}
            className="relative inline-block h-full w-full -translate-x-0.5 !rounded-full  object-cover object-center"
          />
        </div>
        <span className="ml-[18px]">
          <p className="block font-sans text-sm antialiased font-medium leading-none text-black capitalize">
            {props.text}
          </p>
        </span>
        <button onClick={() => props.removeTag(props.index)}>
          <span className="text-gray-500 rounded-full inline-flex justify-center items-center ml-2 text-lg cursor-pointer">
            &times;
          </span>
        </button>
      </div>
    </div>
  );
};

export default Chip;
