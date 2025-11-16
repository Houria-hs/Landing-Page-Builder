// components/HeroBlock.jsx
import React , { useState , useEffect } from "react";
import MiniToolbar from "../components/miniToolbar";

const HeroBlock = ({
  id,
 title: initialTitle,
  subtitle :initialSubtitle,
  buttonText: initialButtonText,
  buttonTextSize,
  buttonColor,
  buttonTextColor,
  titleColor,
  subtitleColor,
  bgColor,
  textColor,
  selected,
  onChange,
  style,
  titleBold,
  titleSize,
  subtitleBold,
  buttonBold,
  subtitleSize,
  fontFamily,
  isPreview,
  imageUrl,
}) => {
  const handleChange = (field, value) => {
    onChange(id, field, value);
  };
//    const [localImage, setLocalImage] = useState(imageUrl || null);
  const [selectedImage, setSelectedImage] = useState(false);
  const [image, setImage] =  useState(() => localStorage.getItem("heroImage") || null);
  const [imgWidth, setImgWidth] = useState(350);
  const [imgHeight, setImgHeight] = useState(350);
  const [title, setTitle] = useState(() => localStorage.getItem(`${id}-title`) || initialTitle || "hero section title");  const [editingTitle, setEditingTitle] = useState(false);
  const [subtitle, setSubtitle] = useState(() => localStorage.getItem(`${id}-subtitle`) || initialSubtitle || "hero section subtitle");
  const [editingsubTitle, setEditingsubTitle] = useState(false);

  const [buttonText, setButtonText] = useState(() => localStorage.getItem(`${id}-buttonText`) || initialButtonText || "Contact Us");


  // Save to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`${id}-title`, title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem(`${id}-subtitle`, subtitle);
  }, [subtitle]);

  useEffect(() => {
    localStorage.setItem(`${id}-buttonText`, buttonText);
  }, [buttonText]);
  


 //  Persist image on change
  useEffect(() => {
    if (image) localStorage.setItem("heroImage", image);
  }, [image]);


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

  return (
    <div
      className="relative w-full  p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300"
      style={{ 
        background: bgColor || "#ffffff", 
        height : style?.height ,
        width : style?.width,
      }}
    >
      {/* Hero Text Section */}
      <div className="flex-1 text-center md:text-left space-y-4">
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
        <h1
          contentEditable
          suppressContentEditableWarning
        //   onInput={(e) => handleChange("title", e.currentTarget.textContent)}
          className="text-4xl font-bold outline-none"
          style={{ 
            color: textColor || "#111", 
            fontFamily : fontFamily || "serif",
            fontSize : titleSize || 30 ,
            fontWeight : titleBold ? "bold" : "normal",
           }}
          onClick={() => setEditingTitle(true)}
        >
          {title}
        </h1>
      )}

        {editingsubTitle ? (
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          onBlur={() => setEditingsubTitle(false)}
          autoFocus
          className="text-3xl font-bold border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleChange("subtitle", e.currentTarget.textContent)}
          onClick={() => setEditingsubTitle(true)}
          className="text-gray-600 text-lg outline-none"
          style={{
            fontFamily : fontFamily || "serif",
            fontSize : subtitleSize || 30 ,
            fontWeight : subtitleBold ? "bold" : "normal",
          }}
        >
          {subtitle}
        </p>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start mt-4">
         
          <button className="px-6 py-2 rounded-full font-semibold transition hover:opacity-90"
          style={{
              background: buttonColor || "#1c398e",
              fontSize:   buttonTextSize,
              fontWeight : buttonBold ? "bold" : "normal",
            }}
          >
          <span
            style={{
            color: buttonTextColor || "#fff",
            }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setButtonText(e.currentTarget.textContent)}
            className="outline-none"
          >
            {buttonText}
          </span>
        </button>
        </div>
      </div>


{/* Right side image */}
<div className="flex flex-col items-center ml-8">
  <div className="relative flex flex-col items-center">
    <img
      src={image || imageUrl || "/default.png"}
      alt="Hero"
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

    {/* Show controls ONLY if the image is selected */}
    {selectedImage && (
      <div className="flex flex-col gap-2 mt-3 bg-white p-3 rounded-lg shadow-md border">
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
  </div>
</div>


      

{/* ✏️ MINI TOOLBAR */}
{selected && !isPreview && (
  <MiniToolbar
    title="Color Editor"
    onClick={(e) => e.stopPropagation()}
    onClose={() => onChange(id, "selected", false)}
    isPreview={isPreview}
    onChange={handleChange}
    fields={[
      { name: "buttonColor", label: "Button Color", type: "color", value: buttonColor },
      { name: "bgColor", label: "Background", type: "color", value: bgColor },
      { name: "buttonTextColor", label: "button text Color", type: "color", value: buttonTextColor },
      { name: "titleColor", label: "title color", type: "color", value: titleColor },
      { name: "subtitleColor", label: "subtitle Color", type: "color", value: subtitleColor },
    ]}
  />
)}
    </div>
  );
};

export default HeroBlock;
