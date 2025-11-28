
import React , {useRef , useEffect} from "react"; 

const HeroBlock = ({
  id,
  title: initialTitle,
  subtitle: initialSubtitle,
  buttonText: initialButtonText,
  buttonTextSize,
  buttonColor,
  buttonTextColor,
  titleColor,
  bgColor,
  selected,
  onChange,
  style,
  titleBold,
subtitleColor,
  titleSize,
  subtitleBold,
  buttonBold,
  subtitleSize,
  fontFamily,
  isPreview,
  imageUrl,
imgWidth,
imgHeight,
  onElementSelect, 
  selectedPropertyKey,
textAlign,
}) => {
  
  
  //  Helper function to check if a specific element is currently selected
  const isSelected = (key) => selectedPropertyKey === key && selected;
    
  //  New click handler to inform the parent component
  const handleSelect = (e, propertyKey) => {
        if (isPreview) return;
        e.stopPropagation();
        onElementSelect(id, propertyKey); // Calls selectElement(blockId, propertyKey) in Builder.jsx
  };

// Create a ref for the hidden file input
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonTextRef = useRef(null);
    const fileInputRef = useRef(null);
    // 2. Effect Hook to handle programmatic focus on selection change
    useEffect(() => {
        let elementToFocus = null;

        // Check which element is newly selected and needs focus
        if (!isPreview && selected) {
            switch (selectedPropertyKey) {
                case 'title':
                    elementToFocus = titleRef.current;
                    break;
                case 'subtitle':
                    elementToFocus = subtitleRef.current;
                    break;
                case 'buttonText':
                    elementToFocus = buttonTextRef.current;
                    break;
                default:
                    break;
            }
        }

        if (elementToFocus) {
            // Only focus if the element is not already the active element
            if (document.activeElement !== elementToFocus) {
                elementToFocus.focus();
                
                // Optional: Move cursor to end of text for better editing experience
                if (window.getSelection && document.createRange) {
                    const range = document.createRange();
                    range.selectNodeContents(elementToFocus);
                    range.collapse(false); // Collapse to the end
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }, [selected, selectedPropertyKey, isPreview]); // Re-run whenever selection state changes

// 1. Create a function to handle the file selection and lifting state
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Use onChange to update the parent block state (Builder.jsx)
            onChange(id, "imageUrl", reader.result);
        };
        reader.readAsDataURL(file);
    }
};

// 2. Modify the image click handler
const handleImageSelect = (e) => {
    if (isPreview) return;
    e.stopPropagation();
    
    // Select the image element for style controls in the toolbar
    onElementSelect(id, 'image'); 
    
    // Trigger the hidden file input click
    fileInputRef.current.click();
};

  return (
    <div
      // 💡 Click the container to select 'self' and show general block controls
      onClick={(e) => handleSelect(e, 'self')} 
      className="relative w-full p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300"
      style={{ 
        background: bgColor || "#ffffff", 
        height : style?.height ,
        width : style?.width,
        // Add a border when the container itself is selected
        border: isSelected('self') && !isPreview ? '2px dashed #007bff' : 'none'
      }}
    >
      {/* Hero Text Section */}
      <div className="flex-1 text-center md:text-left space-y-4" 
style={{
    textAlign : textAlign || "left",
}}>
        
        {/* Title */}
        <h1
            ref={titleRef} 
            onClick={(e) => handleSelect(e, 'title')} 
            contentEditable={!isPreview && isSelected('title')} 
            suppressContentEditableWarning={true}
            onBlur={(e) => onChange(id, "title", e.currentTarget.textContent)} 
            className="text-4xl font-bold outline-none cursor-text"
            style={{
                color: titleColor || "#111", 
                fontFamily : fontFamily || "serif",
                fontSize : titleSize || 30 ,
                fontWeight : titleBold ? "bold" : "normal",
                border: isSelected('title') && !isPreview ? '1px solid #007bff' : 'none',
                padding: '4px',
            }}
        >
            {initialTitle} 
        </h1>



        {/* Subtitle */}
        <p
            ref={subtitleRef} 
            onClick={(e) => handleSelect(e, 'subtitle')} 
            contentEditable={!isPreview && isSelected('subtitle')} // 🔒 Editable only if 'subtitle' is selected
            suppressContentEditableWarning={true}
            // 💾 Update 'subtitle' property on blur
            onBlur={(e) => onChange(id, "subtitle", e.currentTarget.textContent)} 
            className="text-gray-600 text-lg outline-none cursor-text"
            style={{
                fontFamily : fontFamily || "serif",
                color : subtitleColor ,
                fontSize : subtitleSize || 30 ,
                fontWeight : subtitleBold ? "bold" : "normal",
                border: isSelected('subtitle') && !isPreview ? '1px solid #007bff' : 'none',
                padding: '4px',
            }}
        >
            {initialSubtitle} 
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start mt-4">
            {/* Button Container (Styles) */}
            <button 
                onClick={(e) => handleSelect(e, 'buttonStyle')} // 🎯 Select 'buttonStyle'
                className="px-6 py-2 rounded-full font-semibold transition hover:opacity-90"
                style={{
                    background: buttonColor || "#1c398e",
                    fontSize: buttonTextSize,
                    fontWeight: buttonBold ? "bold" : "normal",
                    border: isSelected('buttonStyle') && !isPreview ? '2px dashed #00ff99' : 'none'
                }}
            >
                {/* Button Text (Content) */}
                <span
                    ref={buttonTextRef} // 🎯 Assign Ref
                    onClick={(e) => handleSelect(e, 'buttonText')} // 🎯 Select 'buttonText'
                    contentEditable={!isPreview && isSelected('buttonText')}
                    suppressContentEditableWarning={true}
                    // 💾 Update 'buttonText' property on blur
                    onBlur={(e) => onChange(id, "buttonText", e.currentTarget.textContent)} 
                    className="outline-none cursor-text"
                    style={{
                        color: buttonTextColor || "#fff",
                        border: isSelected('buttonText') && !isPreview ? '1px solid #fff' : 'none',
                        padding: '2px 4px',
                        display: 'inline-block' // Ensure padding works
                    }}
                >
                    {initialButtonText} 
                </span>
            </button>
        </div>
      </div>


        {/* Right side image */}
     <div className="flex flex-col items-center ml-8">
        <div 
            onClick={handleImageSelect} //  Click triggers file upload dialog and selects 'image' key
            className="relative flex flex-col items-center cursor-pointer" // Add cursor-pointer
            style={{
                border: isSelected('image') && !isPreview ? '2px solid #007bff' : 'none',
            }}
        >
            <img
                src={imageUrl || "/logo.png"} 
                alt="Hero"
                style={{
                    width: imgWidth ||`350px` , 
                    height: imgHeight || `350px`, 
                    objectFit: "cover",
                    borderRadius: "10px",
                }}
            />
            {/* 💡 Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </div>
    </div>
    </div>
  );
};

export default HeroBlock;