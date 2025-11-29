import React , {useRef , useEffect} from "react"; 

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
  TitlefontFamily,
SubfontFamily,
BtnfontFamily,
  imageUrl,
  buttonTextSize,
  buttonTextColor,
  buttonBold,
  bgColor ,
  textColor ,
  isPreview,
  imgWidth,
  imgHeight ,
  textAlign,
  onElementSelect, 
  selectedPropertyKey
,
}) => {

   //  Helper function to check if a specific element is currently selected
  const isSelected = (key) => selectedPropertyKey === key && selected;
      //  New click handler to inform the parent component
  const handleSelect = (e, propertyKey) => {
        if (isPreview) return;
        e.stopPropagation();
        onElementSelect(id, propertyKey); // Calls selectElement(blockId, propertyKey) in Builder.jsx
  };
                // width: `${imgWidth}px`,
            // height: `${imgHeight}px`,



// Create a ref for the hidden file input
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
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
                case 'Description':
                    elementToFocus = descriptionRef.current;
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
    }, [selected, selectedPropertyKey, isPreview])



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

const handleImageSelect = (e) => {
    if (isPreview) return;
    e.stopPropagation();
    
    // Select the image element for style controls in the toolbar
    onElementSelect(id, 'image'); 
    
    // Trigger the hidden file input click
    fileInputRef.current.click();
};

  return (
    <section
      className=" relative w-full py-16 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 transition-all duration-300"
      style={{ background: bgColor || "#ffffff",  color: textColor,  border: isSelected('self') && !isPreview ? '1px solid #007bff' : 'none', }}

    >
{/* Image Side */}
<div className="w-full md:w-1/2 flex justify-center">
        <div 
            onClick={handleImageSelect} 
            className="relative flex flex-col items-center cursor-pointer"
            style={{
                border: isSelected('image') && !isPreview ? '2px solid #007bff' : 'none',
            }}
        >
            <img
                src={imageUrl || "/logo.png"} 
                alt="about"
                style={{
                    width: imgWidth || `350px`, 
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


      {/* Text Side */}
      <div
        className="w-full md:w-1/2 flex flex-col gap-6"
        style={{ 
            textAlign : textAlign || "left",
        }}
      >
        {/* Title */}
        <h1
            ref={titleRef} //  Assign Ref
            onClick={(e) => handleSelect(e, 'title')} 
            contentEditable={!isPreview && isSelected('title')} //  Editable only if 'title' is selected
            suppressContentEditableWarning={true}
            //  Update 'title' property on blur
            onBlur={(e) => onChange(id, "title", e.currentTarget.textContent)} 
            className="text-4xl font-bold outline-none cursor-text"
            style={{
                color: titleColor || "#111", 
                fontFamily : TitlefontFamily || "serif",
                fontSize : titleSize || 30 ,
                fontWeight : titleBold ? "bold" : "normal",
                border: isSelected('title') && !isPreview ? '1px solid #007bff' : 'none',
                padding: '4px',
            }}
        >
            {initialTitle} 
        </h1>

              {/* description */}
        <p
            ref={descriptionRef} 
            onClick={(e) => handleSelect(e, 'Description')} 
            contentEditable={!isPreview && isSelected('Description')} 
            suppressContentEditableWarning={true}
            onBlur={(e) => onChange(id, "Description", e.currentTarget.textContent)} 
            className="text-gray-600 text-lg outline-none cursor-text"
            style={{
                fontFamily : SubfontFamily || "serif",
                color : descriptionColor ,
                fontSize : descriptionSize || 30 ,
                fontWeight : descriptionBold ? "bold" : "normal",
                border: isSelected('Description') && !isPreview ? '1px solid #007bff' : 'none',
                padding: '4px',
            }}
        >
            {initialDescription} 
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start mt-4"
        >
         
            {/* Button Container (Styles) */}
            <button 
                onClick={(e) => handleSelect(e, 'buttonStyle')} 
                className="px-6 py-2 rounded-full font-semibold transition hover:opacity-90"
                style={{
                    background: buttonColor || "#1c398e",
                    fontSize: buttonTextSize,
                    fontFamily : BtnfontFamily || "inter",
                    fontWeight: buttonBold ? "bold" : "normal",
                    border: isSelected('buttonStyle') && !isPreview ? '2px dashed #00ff99' : 'none'
                }}
            >
                <span
                    ref={buttonTextRef} 
                    onClick={(e) => handleSelect(e, 'buttonText')} 
                    contentEditable={!isPreview && isSelected('buttonText')}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange(id, "buttonText", e.currentTarget.textContent)} 
                    className="outline-none cursor-text"
                    style={{
                        color: buttonTextColor || "#fff",
                        border: isSelected('buttonText') && !isPreview ? '1px solid #fff' : 'none',
                        padding: '2px 4px',
                        display: 'inline-block' 
                    }}
                >
                    {initialButtonText} 
                </span>
            </button>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;

