import React, { useState, useEffect } from "react";
import MiniToolbar from "../components/miniToolbar";

const AboutSection = ({
  id,
  onChange,
  selected,
  title : initialTitle,
  description : initialDescription,
  buttonText : initialButtonText,
  buttonColor ,
  titleBold,
  titleColor,
  descriptionBold,
  descriptionColor,
  titleSize,
  descriptionSize,
  fontFamily,
  imageUrl,
  width,
  height,
  buttonTextSize,
  buttonTextColor,
  buttonBold,
  bgColor ,
  textColor ,
  isPreview,
}) => {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(id, field, value);
    }
  };
  const [title, setTitle] = useState(() => localStorage.getItem(`${id}-title`) || initialTitle || "About section title"); 
  const [description, setdescription] = useState(() => localStorage.getItem(`${id}-description`) || initialDescription || "about section description");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingdescription, setEditingdescription] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [image, setImage] = useState(
    () => localStorage.getItem("aboutImg") || imageUrl || null
  );
  const [imgWidth, setImgWidth] = useState(width || 350);
  const [imgHeight, setImgHeight] = useState(height || 350);


  
    const [buttonText, setButtonText] = useState(() => localStorage.getItem(`${id}-buttonText`) || initialButtonText || "Contact Us");
  
  
    // Save to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem(`${id}-title`, title);
    }, [title]);
  
    useEffect(() => {
      localStorage.setItem(`${id}-description`, description);
    }, [description]);
  
    useEffect(() => {
      localStorage.setItem(`${id}-buttonText`, buttonText);
    }, [buttonText]);


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
      className=" relative w-full py-16 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 transition-all duration-300"
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
            border: selectedImage && !isPreview ? "2px solid #007bff" : "none",
            cursor: "pointer",
          }}
          onClick={() => setSelectedImage(!selectedImage)}
        />

        {selectedImage && !isPreview && (
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
      <img src={imageUrl} alt="about us"
      className="rounded-2xl shadow-md object-cover"
       />

    )}
  </div>
</div>


      {/* Text Side */}
      <div
        className="w-full md:w-1/2 flex flex-col gap-6"
        style={{ fontFamily }}
      >
        {editingTitle ? !isPreview && (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => !isPreview ? setEditingTitle(false) : setEditingTitle(false) }
          autoFocus
          className="text-3xl font-bold border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <h2
          contentEditable={!isPreview}
          suppressContentEditableWarning={true}
          className={`font-bold`}
          onClick={() => !isPreview ? setEditingTitle(true) : setEditingTitle(false) }
          style={{ 
            color: titleColor || "#111", 
            fontFamily : fontFamily || "serif",
            fontSize : titleSize || 30 ,
            fontWeight : titleBold ? "bold" : "normal",
          }}
        >
          {title}
        </h2>
        )}

      {editingdescription ? !isPreview && (
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          onBlur={() => !isPreview ? setEditingdescription(false) : setEditingdescription(false)}
          autoFocus
          className="text-3xl font-bold border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <p
          contentEditable={!isPreview}
          suppressContentEditableWarning={true}
          className="opacity-80 leading-relaxed"
          onClick={() => !isPreview ? setEditingdescription(true) : setEditingdescription(false)}
          style={{
            fontWeight: descriptionBold ? "bold" : "normal",
            fontSize: descriptionSize || 16,
            color: descriptionColor || "#111", 
            fontFamily : fontFamily || "serif",
            fontWeight : descriptionBold ? "bold" : "normal",
          }}
        >
          {description}
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
            contentEditable={!isPreview}
            suppressContentEditableWarning={true}
            onBlur={(e) => setButtonText(e.currentTarget.textContent)}
            className="outline-none"
          >
            {buttonText}
          </span>
        </button>
        </div>
      </div>


      
      {/* ✏️ MINI TOOLBAR */}

{/*  MINI TOOLBAR */}
{selected && !isPreview && (
  <MiniToolbar
    title="About Section Editor"
    onClick={(e) => e.stopPropagation()}
    onClose={() => onChange(id, "selected", false)}
    onChange={handleChange}
    fields={[
      { name: "buttonColor", label: "Button Color", type: "color", value: buttonColor },
      { name: "bgColor", label: "Background", type: "color", value: bgColor },
      { name: "buttonTextColor", label: "button text Color", type: "color", value: buttonTextColor },
      { name: "titleColor", label: "title color", type: "color", value: titleColor },
      { name: "descriptionColor", label: "Description text Color", type: "color", value: descriptionColor },
    ]}
  />
)}
    </section>
  );
};

export default AboutSection;

