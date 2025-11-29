import React from 'react'

const Footer = ({
    id,
content,
textColor,
textFontSize,
textBold,
bgColor,
footerFont,
isPreview,
width,
height,

onElementSelect, 
  selectedPropertyKey,
    selected,
  onChange,
}) => {
      const isSelected = (key) => selectedPropertyKey === key && selected;

    //  New click handler to inform the parent component
  const handleSelect = (e, propertyKey) => {
        if (isPreview) return;
        e.stopPropagation();
        onElementSelect(id, propertyKey); // Calls selectElement(blockId, propertyKey) in Builder.jsx
  };

  return (
               <footer
                  onClick={(e) => handleSelect(e, 'self')}
                  style={{

                    bottom: 0,
                    width: width,
                    height : height ,
                    background:bgColor || "white",
                    textAlign: "center",
                    padding: "1rem",
                    border: isSelected('self') && !isPreview ? '1px solid #007bff' : 'none',
                  }}
                  className={"rounded-t-lg shadow-inner"}
                >
                  <textarea
                    onClick={(e) => handleSelect(e, 'ContentStyle')}
                    style={{
                      color : textColor || "#020202ff",
                      fontSize : textFontSize || 16,
                      fontWeight : textBold ? "bold" : "normal",
                      fontFamily : footerFont || "sans-serif",
                    }}
                    value={content || "© 2025 Your Brand — All rights reserved."}
                    onChange={(e) =>
                      onChange(id, "content", e.target.value)
                    }
                    className="w-full text-center bg-transparent outline-none resize-none font-medium text-gray-700"
                  />
                </footer>
  )
}

export default Footer