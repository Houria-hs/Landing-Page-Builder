import React from "react";
import AlignmentControls from "./Alignment";
import FontSelector from "./FontSelector";

const GlobalToolbar = ({
  isPreview,
  selectedBlock,
  updateBlock,
  handleImageUpload,
  duplicateBlock,
  deleteBlock,
  selectedPropertyKey,
}) => {

  if (isPreview || !selectedBlock) return null;
    const IconTrash = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    );

    const IconCopy = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    );


 // --- CONFIG ---
const ELEMENT_CONFIGS = {
    //  Base styles for the block container itself
    self: [ 
        { type: "number", name: "width", label: "Width" },
        { type: "number", name: "height", label: "Height" },
        { type: "color", name: "bgColor", label: "BG Color" },
    ],
    //  Base text styles (for simple text blocks)
    text: [ 
        { type: "number", name: "fontSize", label: "Font Size" },
        { type: "color", name: "color", label: "Color" },
    ],
    // 💡 Base button styles (for simple button blocks)
    button: [ 
        { type: "color", name: "buttonColor", label: "BG Color" },
        { type: "color", name: "buttonTextColor", label: "Text Color" },
    ],
    // 💡 Base image styles (for simple image blocks)
    image: [
        { type: "number", name: "imgWidth", label: "Width" },
        { type: "number", name: "imgHeight", label: "Height" },
    ],
};

const TOOLBAR_CONFIG = {
    'text:self': [
        ...(ELEMENT_CONFIGS.self || []), 
        ...(ELEMENT_CONFIGS.text || []),
       { type: "font" },
       { type: "align" },
    ],
    'button:self': [
        ...(ELEMENT_CONFIGS.self || []), 
        ...(ELEMENT_CONFIGS.button || []),
    ],
    'image:self': [
        ...(ELEMENT_CONFIGS.self || []), 
        ...(ELEMENT_CONFIGS.image || []),
        { type: "button", label: "Clear Image", action: "clearImage" },
    ],

    // Navbar styling 
    'navbar:self': [
        ...(ELEMENT_CONFIGS.self || []), 
        
    ],
    
    'navbar:logoText': [
        { type: "font" , name : "logoFamily" , label : "FontFamily" },
        { type: "number", name: "logoFontSize", label: "Font Size" },
        { type: "color", name: "logoColor", label: "Color" },
        { type: "toggle", name: "logoBold", label: "Bold" },
    ],
    'navbar:Links': [
        { type: "font" , name : "LinksFamily" , label : "FontFamily" },
        { type: "number", name: "linksFontSize", label: "Font Size" },
        { type: "color", name: "linkColor", label: "Color" },
        { type: "toggle", name: "linksBold", label: "Bold" },
    ],
    'navbar:CTA': [
        { type: "font" , name : "CTAFamily" , label : "FontFamily" },
        { type: "number", name: "ctaFontSize", label: "Font Size" },
        { type: "color", name: "ctaTextColor", label: "Text color" },
        { type: "color", name: "ctaBgColor", label: "BG color" },
        { type: "toggle", name: "ctaBold", label: "Bold" },
    ],
    

    // --- Complex Block: HERO (Styling only) ---
    'hero:self': [
        ...(ELEMENT_CONFIGS.self || []), 
        { type: "align" }, 
        
    ],

    'hero:title': [
        { type: "font" , name : "TitlefontFamily" , label : "FontFamily" },
        { type: "number", name: "titleSize", label: "Font Size" },
        { type: "color", name: "titleColor", label: "Color" },
        { type: "toggle", name: "titleBold", label: "Bold" },
    ],

    'hero:subtitle': [
        { type: "font" , name : "SubfontFamily" , label : "FontFamily" },
        { type: "number", name: "subtitleSize", label: "Font Size" },
        { type: "color", name: "subtitleColor", label: "Color" },
        { type: "toggle", name: "subtitleBold", label: "Bold" },
    ],

    'hero:buttonStyle': [
        { type: "font" , name : "BtnfontFamily" , label : "FontFamily" },
        { type: "color", name: "buttonColor", label: "BG Color", big: true },
        { type: "color", name: "buttonTextColor", label: "Text Color", big: true },
        { type: "number", name: "buttonTextSize", label: "Font Size" },
        { type: "toggle", name: "buttonBold", label: "Bold" },
    ],
    
    // Image Styling
    'hero:image': [
        ...(ELEMENT_CONFIGS.image || []),
        { type: "button", label: "Clear Image", action: "clearImage" },
    ],

        // --- Complex Block: ABOUT (Styling only) ---
        'aboutSection:self': [
            ...(ELEMENT_CONFIGS.self || []),
            { type: "align" }, 
        ],

    'aboutSection:title': [
        { type: "font" , name : "TitlefontFamily" , label : "FontFamily" },
        { type: "number", name: "titleSize", label: "Font Size" },
        { type: "color", name: "titleColor", label: "Color" },
        { type: "toggle", name: "titleBold", label: "Bold" },
    ],

    'aboutSection:Description': [
        { type: "font" , name : "SubfontFamily" , label : "FontFamily" },
        { type: "number", name: "descriptionSize", label: "Font Size" },
        { type: "color", name: "descriptionColor", label: "Color" },
        { type: "toggle", name: "descriptionBold", label: "Bold" },
    ],

    'aboutSection:buttonStyle': [
        // Label field removed for in-line editing (if you want text styles for the button, use 'buttonText' key)
        { type: "font" , name : "BtnfontFamily" , label : "FontFamily" },
        { type: "color", name: "buttonColor", label: "BG Color", big: true },
        { type: "color", name: "buttonTextColor", label: "Text Color", big: true },
        { type: "number", name: "buttonTextSize", label: "Font Size" },
        { type: "toggle", name: "buttonBold", label: "Bold" },
    ],
        'aboutSection:image': [
            ...(ELEMENT_CONFIGS.image || []),
            { type: "button", label: "Clear Image", action: "clearImage" },
        ],


        // --- Complex Block: portfolio (Styling only) ---
        'portfolio:self': [
            ...(ELEMENT_CONFIGS.self || []),
            { type: "align" }, 
        ],

        'portfolio:title': [
        { type: "font" , name : "titeFontFamily" , label : "FontFamily" },
        { type: "number", name: "titleSize", label: "Font Size" },
        { type: "color", name: "titleColor", label: "Color" },
        { type: "toggle", name: "titleBold", label: "Bold" },
    ],

    'portfolio:subtitle': [
        { type: "font" , name : "SubtiteFontFamily" , label : "FontFamily" },
        { type: "number", name: "subtitleSize", label: "Font Size" },
        { type: "color", name: "subtitleColor", label: "Color" },
        { type: "toggle", name: "subtitleBold", label: "Bold" },
    ],

    'portfolio:buttonStyle': [
    { type: "font" , name : "cardBtnFontFamily" , label : "FontFamily" },
    { type: "color", name: "cardButtonColor", label: "BG Color", big: true },
    { type: "color", name: "cardButtonTextColor", label: "Text Color", big: true },
    { type: "number", name: "cardBtnSize", label: "Font Size" },
    { type: "toggle", name: "cardBtnBold", label: "Bold" },

    ],
    'portfolio:cardTitle': [
        { type: "font" , name : "cardTitleFontFamily" , label : "FontFamily" },
        { type: "number", name: "cardTitleSize", label: "Font Size" },
        { type: "color", name: "cardTitleColor", label: "Color" },
        { type: "toggle", name: "cardTitleBold", label: "Bold" },
    ],
    'portfolio:cardDescription': [
        { type: "font" , name : "cardSubFontFamily" , label : "FontFamily" },
        { type: "number", name: "cardSubtitleSize", label: "Font Size" },
        { type: "color", name: "cardSubtitleColor", label: "Color" },
        { type: "toggle", name: "cardSubtitleBold", label: "Bold" },
    ],


     // --- Complex Block: portfolio (Styling only) ---
    'form:self': [
        ...(ELEMENT_CONFIGS.self || []),
    ],
    'form:FieldsLabel': [
      { type: "font" , name : "labelFont" , label : "FontFamily" },
      { type: "number", name: "labelSize", label: "Font Size" },
      { type: "color", name: "labelolor", label: "Color" },
      { type: "toggle", name: "labelBold", label: "Bold" },
    ],
    'form:buttonStyle': [
      { type: "font" , name : "btnFont" , label : "FontFamily" },
      { type: "number", name: "btnFontSize", label: "Font Size" },
      { type: "color", name: "buttonColor", label: "BG Color" },
      { type: "color", name: "btnTextColor", label: "Text Color" },
      { type: "toggle", name: "Bold", label: "Bold" },
    ],

    // Footer styling 
    'footer:self': [
        ...(ELEMENT_CONFIGS.self || []), 
    ],
    'footer:ContentStyle': [
      { type: "font" , name : "footerFont" , label : "FontFamily" },
      { type: "number", name: "textFontSize", label: "Font Size" },
      { type: "color", name: "bgColor", label: "BG Color" },
      { type: "color", name: "textColor", label: "Text Color" },
      { type: "toggle", name: "textBold", label: "Bold" },
    ],
};
    // --- END CONFIG ---


    const blockType = selectedBlock.type;
    const propertyKey = selectedPropertyKey || 'self'; 
    const configKey = `${blockType}:${propertyKey}`; 

    const config = TOOLBAR_CONFIG[configKey] || [];

    const isParentBlock = propertyKey === 'self';




  return (
<div
  className="fixed top-21 right-70 bg-white/90 backdrop-blur-md 
             shadow-[0_4px_20px_rgba(0,0,0,0.1)] 
             px-4 py-2 rounded-2xl z-50 
             flex items-center gap-3 
             overflow-x-auto whitespace-nowrap
             border border-gray-200"
  onPointerDown={(e) => e.stopPropagation()}
  onMouseDown={(e) => e.stopPropagation()}
>
  {config.map((item, index) => (
    <ToolbarField
      key={index}
      item={item}
      selectedBlock={selectedBlock}
      updateBlock={updateBlock}
      handleImageUpload={handleImageUpload}
    />
  ))}

  {/* Divider */}
  <div className="h-6 w-px bg-gray-300 mx-2 opacity-60"></div>

  {/* if the selected block is a parent block show the duplicate and delete buttons */}
{isParentBlock && (
  <div className="flex items-center gap-2">
  {/* Duplicate */}
  <button
  
    onClick={() => duplicateBlock(selectedBlock.id )}
    className="p-2 rounded-xl border  active:scale-95 
               border-pink-200 
               hover:bg-pink-50 active:scale-95 
               transition-all shadow-sm"
    title="Duplicate Block"
  >
    <IconCopy className="w-5 h-5 text-gray-700" />
  </button>
  {/* Delete */}
  <button
    onClick={() => deleteBlock(selectedBlock.id )}
    className="p-2 rounded-xl border border-red-200 
               hover:bg-red-50 active:scale-95 
               transition-all shadow-sm"
    title="Delete Block"
  >
    <IconTrash className="w-5 h-5 text-red-500" />
  </button>
  </div>
  )}
</div>

  );
};


// =========================
// FIELD RENDERER (FIXED)
// =========================
const ToolbarField = ({ item, selectedBlock, updateBlock }) => {
    //  Prioritize item.type for custom components (like font/align/toggle/button), 
    //    and fall back to item.input for standard HTML inputs (number/color/text/textarea).
    const type = item.type || item.input;
    const field = item.name || item.field; // Use 'name' from new config, fallback to 'field'
    const { label, action } = item;
    
    const stop = (e) => e.stopPropagation();

    switch (type) {

      case "number":
        return (
        <div className="flex flex-col items-center">
          <input
            onPointerDown={stop}
            type="number"
            value={selectedBlock[field] || ""}
            onChange={(e) => updateBlock(selectedBlock.id, field, Number(e.target.value))}
            className="border rounded p-1 w-16"
          />
          <label className="text-sm">{label}</label>
        </div>
      );

    case "color":
      return (
        <div className="flex flex-col items-center">
          <input
            onPointerDown={stop}
            type="color"
            value={selectedBlock[field] || "#000000"} // Added fallback for color
            onChange={(e) => updateBlock(selectedBlock.id, field, e.target.value)}
            className={item.big ? "w-16 h-10" : ""}
          />
          <label className="text-sm">{label}</label>
        </div>
      );

    case "toggle":
      return (
        <button
          onPointerDown={stop}
          // 👇 Use 'field' variable here
          onClick={() =>
            updateBlock(selectedBlock.id, field, !selectedBlock[field])
          }
          className={`px-2 py-1 border rounded ${
            selectedBlock[field] ? "bg-pink-500 text-white" : "border-pink-200 hover:bg-pink-50"
          }`}
        >
          {label}
        </button>
      );

    case "font":
      return (
              <FontSelector
              selectedFont={selectedBlock?.fontFamily || "Inter"}
              onChange={(font) => updateBlock(selectedBlock.id, "fontFamily", font)}
            />
      );

    case "align":
      return (
        <AlignmentControls
          selectedBlock={selectedBlock} 
          updateBlock={updateBlock}
        />
      );

    case "button":
      return (
        <button
          onPointerDown={stop}
          onClick={() => {
            if (action === "clearImage")
              // 💡 Use 'imageUrl' as the field for hero block image clearing
              return updateBlock(selectedBlock.id, "imageUrl", null); 

            if (action === "addFormField")
              return updateBlock(selectedBlock.id, "fields", [
                ...selectedBlock.fields,
                { id: Date.now(), label: "New Field", type: "text", value: "" },
              ]);
          }}
          className="px-2 py-1 bg-pink-100 text-pink-700 rounded border border-pink-200 hover:bg-pink-200"
        >
          {label}
        </button>
      );

    case "textarea":
      return (
        <textarea
          onPointerDown={stop}
          value={selectedBlock[field] || ""}
          onChange={(e) => updateBlock(selectedBlock.id, field, e.target.value)}
          className="border rounded p-1"
        />
      );

    case "text":
      return (
        <input
          onPointerDown={stop}
          type="text"
          value={selectedBlock[field] || ""}
          onChange={(e) => updateBlock(selectedBlock.id, field, e.target.value)}
          className="border rounded p-1"
        />
      );

    default:
      return null;
  }
};

export default GlobalToolbar