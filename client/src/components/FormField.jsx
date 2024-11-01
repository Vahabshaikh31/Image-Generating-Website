import React from "react";

const FormField = ({
  LabelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#1f2937] py-1 px-2 rounded-[5px] text-white m-2"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg  outline-none block w-full p-3"
      />
    </div>
  );
};

export default FormField;
