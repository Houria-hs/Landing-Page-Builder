import React from "react";

function MiniToolbar({ title, fields, onChange, onClose , isPreview}) {
return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full mt-10 w-[95%] z-50"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <div className="bg-white/80 border border-gray-200 rounded-xl shadow-lg p-4 space-y-3 backdrop-blur-md">
        {/* header */}
        <div className="flex justify-between items-center border-b pb-1">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {title || "Section Editor"}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ✕
          </button>
        </div>

        {/* dynamic fields */}
        {fields.map((field) => (
          <div key={field.name} className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-20 capitalize">
              {field.label || field.name}:
            </span>

            {field.type === "text" && (
              <input
                type="text"
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs w-full focus:ring-1 focus:ring-pink-300 outline-none"
              />
            )}

            {field.type === "color" && (
              <input
                type="color"
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="w-6 h-6 rounded-full border cursor-pointer"
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs w-20 focus:ring-1 focus:ring-pink-300 outline-none"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs w-full focus:ring-1 focus:ring-pink-300 outline-none"
                rows="2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
);

}

export default MiniToolbar;
