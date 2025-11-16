import React from "react";

function MiniToolbar({ title, fields, onChange, onClose }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full mt-2 w-[95%] z-50"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <div className="bg-white/90 border border-gray-200 rounded-xl shadow-lg p-2 flex flex-wrap items-center gap-2 backdrop-blur-md">
        {/* header */}
        <div className="flex justify-between items-center w-full border-b pb-1 mb-2">
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
          <div
            key={field.name}
            className="flex items-center space-x-1 bg-gray-100/50 px-2 py-1 rounded"
          >
            <span className="text-xs text-gray-500">{field.label || field.name}:</span>

            {field.type === "text" && (
              <input
                type="text"
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="border border-gray-300 rounded px-1 py-0.5 text-xs w-24 focus:ring-1 focus:ring-pink-300 outline-none"
              />
            )}

            {field.type === "color" && (
              <input
                type="color"
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="w-5 h-5 rounded-full border cursor-pointer"
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="border border-gray-300 rounded px-1 py-0.5 text-xs w-16 focus:ring-1 focus:ring-pink-300 outline-none"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                value={field.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="border border-gray-300 rounded px-1 py-0.5 text-xs w-40 focus:ring-1 focus:ring-pink-300 outline-none"
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
