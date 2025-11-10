// FormBlock.jsx
import React from "react";

const FormBlock = ({
  id,
  fields,
  buttonText,
  style,
  selected,
  onChange,
  isPreview ,
}) => {
    const handleLabelChange = (index, newLabel) => {
    const updated = [...fields];
    updated[index].label = newLabel;
    onChange(id, "fields", updated);
  };

  const handleButtonTextChange = (newText) => {
    onChange(id, "buttonText", newText);
  };
return (
  <div className="relative w-full max-w-md">
    {/* FORM ITSELF */}
    <div
      className="border rounded-2xl shadow-sm p-6 space-y-4 transition-all duration-300 bg-white"
      style={style}
    >
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            placeholder={field.label}
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
      ))}
      {/* BUTTON */}
      <div className="pt-4">
        <button
          className="w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 hover:opacity-90"
          style={{
            background: style?.buttonColor || "#2563eb",
            color: style?.btnTextColor || "#fff",
            fontSize: style?.btnFontSize || 14,
            fontWeight : style?.Bold ? "bold" : "normal",
          }}
        >
          {buttonText || "Submit"}
        </button>
      </div>
    </div>

    {/* MINI TOOLBAR (only when selected) */}
{selected && !isPreview && (
  <div
    className="absolute left-1/2 -translate-x-1/2 translate-y-4 w-[95%] z-[50]"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="bg-[#f9fafb] border border-gray-200 rounded-xl shadow-md p-4 space-y-3 backdrop-blur-sm">
      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide border-b pb-1">
        ✏️ Form Content Editor
      </h4>

      {/* labels editor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex items-center space-x-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-gray-500 capitalize w-14">
              {field.type}:
            </span>
            <input
              type="text"
              value={field.label}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleLabelChange(index, e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-xs w-full focus:border-blue-400 focus:ring-1 focus:ring-blue-300 outline-none"
            />
          </div>
        ))}
      </div>

      {/* button text editor */}
      <div
        className="flex items-center space-x-2"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs text-gray-500 w-14">Button:</span>
        <input
          type="text"
          value={buttonText}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleButtonTextChange(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs w-full focus:border-blue-400 focus:ring-1 focus:ring-blue-300 outline-none"
        />
      </div>
    </div>
  </div>
)}

  </div>
);

};

export default FormBlock;
