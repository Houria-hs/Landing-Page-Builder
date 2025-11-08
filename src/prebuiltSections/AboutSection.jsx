import React, { useState, useEffect } from "react";
import MiniToolbar from "../components/miniToolbar";

const AboutSection = ({
  id,
  onChange,
  selected,
  title : initialTitle,
  description : initialDescription,
  buttonText,
  buttonColor = "#000000",
  buttonTextColor = "#ffffff",
  titleBold,
  descriptionBold,
  titleSize,
  descriptionSize,
  fontFamily,
  imageUrl,
  width,
  height,
  bgColor = "#ffffff",
  textColor = "#1a1a1a",
}) => {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(id, field, value);
    }
  };
  const [title, setTitle] = useState(initialTitle || "hero section title ");
  const [editingTitle, setEditingTitle] = useState(false);
  const [description, setdescription] = useState(initialDescription || "hero section subtitle");
  const [editingdescription, setEditingdescription] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [image, setImage] = useState(
    () => localStorage.getItem("aboutImg") || imageUrl || null
  );
  const [imgWidth, setImgWidth] = useState(width || 350);
  const [imgHeight, setImgHeight] = useState(height || 350);


  //  Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

   //  Persist image on change
    useEffect(() => {
      if (image) localStorage.setItem("aboutImg", image);
    }, [image]);

  return (
    <section
      className="w-full py-16 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 transition-all duration-300"
      style={{ background: bgColor || "#ffffff",  color: textColor }}

    >
{/* Image Side */}
<div className="w-full md:w-1/2 flex justify-center">
  <div className="relative flex flex-col items-center">
    {image ? (
      <>
        <img
          src={image}
          alt="About"
          className="rounded-2xl shadow-md object-cover"
          style={{
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
            objectFit: "cover",
            borderRadius: "10px",
            border: selectedImage ? "2px solid #007bff" : "none",
            cursor: "pointer",
          }}
          onClick={() => setSelectedImage(!selectedImage)}
        />

        {selectedImage && (
          <div className="absolute top-full mt-3 flex flex-col gap-2 bg-white p-3 rounded-lg shadow-md border z-10">
            <label className="cursor-pointer text-sm font-medium text-blue-600">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>

            <div className="flex gap-2 items-center">
              <label className="text-sm">W:</label>
              <input
                type="number"
                value={imgWidth}
                onChange={(e) => setImgWidth(Number(e.target.value))}
                className="w-16 border rounded p-1 text-center"
              />
              <label className="text-sm">H:</label>
              <input
                type="number"
                value={imgHeight}
                onChange={(e) => setImgHeight(Number(e.target.value))}
                className="w-16 border rounded p-1 text-center"
              />
            </div>
          </div>
        )}
      </>
    ) : (
      <div
        className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-2xl cursor-pointer"
        onClick={() => setSelectedImage(true)}
      >
        No image
      </div>
    )}
  </div>
</div>


      {/* Text Side */}
      <div
        className="w-full md:w-1/2 flex flex-col gap-6"
        style={{ fontFamily }}
      >
        {editingTitle ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setEditingTitle(false)}
          autoFocus
          className="text-3xl font-bold border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <h2
          contentEditable
          suppressContentEditableWarning
          className={`font-bold`}
          onClick={() => setEditingTitle(true)}
          style={{ 
            color: textColor || "#111", 
            fontFamily : fontFamily || "serif",
            fontSize : titleSize || 30 ,
            fontWeight : titleBold ? "bold" : "normal",
          }}
        >
          {title}
        </h2>
        )}

      {editingdescription ? (
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          onBlur={() => setEditingdescription(false)}
          autoFocus
          className="text-3xl font-bold border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <p
          contentEditable
          suppressContentEditableWarning
          className="opacity-80 leading-relaxed"
          onClick={() => setEditingdescription(true)}
          style={{
            fontWeight: descriptionBold ? "bold" : "normal",
            fontSize: descriptionSize || 16,
            color: textColor || "#111", 
            fontFamily : fontFamily || "serif",
            fontWeight : descriptionBold ? "bold" : "normal",

          }}
        >
          {description}
        </p>
        )}
        <button
          className="self-start py-3 px-6 rounded-xl hover:opacity-80 transition"
          style={{
            backgroundColor: buttonColor,
            color: buttonTextColor,
          }}
        >
          {buttonText}
        </button>
      </div>


      
      {/* ✏️ MINI TOOLBAR */}
{selected && (
  <MiniToolbar
    title="About Section Editor"
    onClick={(e) => e.stopPropagation()}
    onClose={() => onChange(id, "selected", false)}
    onChange={handleChange}   
    fields={[
      { name: "title", label: "Title", type: "text", value: title },
      { name: "description", label: "description", type: "text", value: description },
      { name: "buttonText", label: "Button Text", type: "text", value: buttonText },
      { name: "buttonColor", label: "Button Color", type: "color", value: buttonColor },
      { name: "imageUrl", label: "Image URL", type: "text", value: imageUrl },
      { name: "bgColor", label: "Background", type: "color", value: bgColor },
      { name: "textColor", label: "Text Color", type: "color", value: textColor },
    ]}
  />
)}
    </section>
  );
};

export default AboutSection;

