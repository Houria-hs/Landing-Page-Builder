import React, { useState } from "react";




const Builder = () => {
  const [blocks, setBlocks] = useState([]);
  const [bgColor, setBgColor] = useState("#ffffff"); 


  // function to add a new block
 const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === "text" ? "Edit me..." : null,
      color: type === "text" ? "#000000" : null,
      label: type === "button" ? "Click Me" : null,
      buttonColor: type === "button" ? "#3b82f6" : null, // default blue
      src: type === "image" ? null : null, // will set via upload
      isEditing: type === "text" || type === "button", // start editable
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id, key, value) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, [key]: value } : block
      )
    );
  };
const handleImageUpload = (id, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateBlock(id, "src", reader.result); // store base64 image
    };
    if (file) reader.readAsDataURL(file);
  };
  
  const deleteBlock = (id) => {
  setBlocks(blocks.filter((block) => block.id !== id));
};
const handleDragEnd = (result) => {
  if (!result.destination) return; // dropped outside the list

  const items = Array.from(blocks);
  const [moved] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, moved);

  setBlocks(items);
};
  return (

    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-pink-100 to-blue-100 p-6 shadow-md overflow-y-auto h-screen">
        <h2 className="text-lg font-bold mb-6 text-blue-700">Blocks</h2>
        <button
          className="w-full bg-blue-200 p-3 rounded-xl mb-3"
          onClick={() => addBlock("text")}
        >
          ➕ Add Text
        </button>
        <button
          className="w-full bg-pink-200 p-3 rounded-xl mb-3"
          onClick={() => addBlock("image")}
        >
          🖼️ Add Image
        </button>
        <button
          className="w-full bg-purple-200 p-3 rounded-xl"
          onClick={() => addBlock("button")}
        >
          🔘 Add Button
        </button>
    
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Background Color</h3>
          <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full h-10 border rounded cursor-pointer bg-red"
          />
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-white p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Landing Page
        </h1>
        <div  style={{ backgroundColor: bgColor }} className="border-2 border-dashed border-blue-300 rounded-xl p-6 bg-pink-50 min-h-[400px]">
          {blocks.map((block) => (
            <div key={block.id} className="mb-6">
              {/* Text Block */}
              {block.type === "text" && (
                 
               block.isEditing ? (
               <div className="flex gap-2 items-center">
                {/* Delete button */}
                  <button
                  onClick={() => deleteBlock(block.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                  >
                     ✖
                  </button>
                  {/* Text input */}
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                    className="border rounded p-2"
                    autoFocus
                  />
                  {/* Color picker */}
                  <input
                    type="color"
                    value={block.color}
                    onChange={(e) => updateBlock(block.id, "color", e.target.value)}
                    className="w-10 h-10 border rounded cursor-pointer"
                  />
            
                  <button
                    onClick={() => updateBlock(block.id, "isEditing", false)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <p
                  style={{ color: block.color  || "#000000"   }}
                  className="cursor-pointer"
                  onClick={() => updateBlock(block.id, "isEditing", true)}
                >
                  {block.content}
                </p>
              )
            )}

              {/* Image Block */}
              {block.type === "image" && (
                <div>
                  {block.src ? (
                    <img
                      src={block.src}
                      alt="uploaded"
                      className="max-w-xs rounded-lg shadow cursor-pointer"
                      onClick={() => updateBlock(block.id, "src", null)}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(block.id, e.target.files[0])
                      }
                    />
                  )}
                </div>
              )}

              {/* Button Block */}
              {block.type === "button" && (
              <div>
                {block.isEditing ? (
                  <div className="flex gap-2 items-center">
                    {/* Edit label */}
                    <input
                      type="text"
                      value={block.label}
                      onChange={(e) =>
                        updateBlock(block.id, "label", e.target.value)
                    }
                      className="border rounded p-2"
                    />

                    {/* Color picker */}
                    <input
                      type="color"
                      value={block.color}
                      onChange={(e) =>
                        updateBlock(block.id, "color", e.target.value)
                      }
                      className="w-10 h-10 border rounded cursor-pointer"
                    />

                  <button
                    onClick={() => updateBlock(block.id, "isEditing", false)}
                    className="ml-2 px-3 py-1 bg-gray-200 rounded"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <button
                  style={{ backgroundColor: block.color }}
                  className="px-4 py-2 text-white rounded-lg cursor-pointer"
                  onClick={() => updateBlock(block.id, "isEditing", true)}
                >
                  {block.label}
                </button>
                    )}
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </div>
        </div>
  );
};

export default Builder