import React , { useRef , useEffect , useState} from "react";

const PortfolioSection = ({
id,
title :initialTitle,
subtitle : initialSubtitle,
selected,
titleColor,
subtitleColor,
subtitleSize,
cardTextColor,
onChange,
textAlign,
isEditing,
projects,
bgColor,
titleBold,
subtitleBold,
titleSize,
isPreview,
 onElementSelect, 
  selectedPropertyKey,
  titeFontFamily,
SubtiteFontFamily,
cardTitleFontFamily,
cardSubFontFamily,
cardBtnFontFamily,
  // card props 
cardTitleColor,
cardSubtitleColor,
cardButtonColor,
cardButtonTextColor,
cardTitleBold,
cardSubtitleBold,
cardBtnBold,
cardTitleSize,
cardSubtitleSize,
cardBtnSize,
}) => {

  // 💡 FIX 2: State to track which project image is currently being uploaded
    const [selectedProjectId, setSelectedProjectId] = useState(null); 
    
   //  Helper function to check if a specific element is currently selected
const isSelected = (key) => selectedPropertyKey === key && selected;




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
                case 'Description':
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
    }, [selected, selectedPropertyKey, isPreview])



 const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Use the selectedProjectId state set by handleProjectImageSelect
    if (file && selectedProjectId !== null) { 
        const reader = new FileReader();
        reader.onloadend = () => {
            const newProjects = projects.map(p => 
                p.id === selectedProjectId 
                    ? { ...p, image: reader.result } // Update the project's 'image' field
                    : p
            );
            onChange(id, "projects", newProjects); 
            setSelectedProjectId(null); // Reset
        };
        reader.readAsDataURL(file);
    }
};

const handleProjectImageSelect = (e, projectId) => {
    if (isPreview) return;
    e.stopPropagation();
    
    setSelectedProjectId(projectId); // Store the ID of the project being edited
    
    // Select a generic key for image styling controls in the toolbar
    onElementSelect(id, 'imageStyle'); 
    
    // Trigger the hidden file input click

};

// 💡 FIX 3: Corrected project text update handler
const handleProjectChange = (projectId, field, value) => {
    const updatedProjects = projects.map(p =>
    p.id === projectId ? { ...p, [field]: value } : p
    );
    onChange(id, "projects", updatedProjects); 
};
  
  //  New click handler to inform the parent component
  const handleSelect = (e, propertyKey) => {
        if (isPreview) return;
        e.stopPropagation();
        onElementSelect(id, propertyKey); // Calls selectElement(blockId, propertyKey) in Builder.jsx
  };



  return (
    <section
      className="w-full relative py-16 px-6 md:px-12 transition-all duration-300"
      style={{ backgroundColor: bgColor , border: isSelected('self') && !isPreview ? '1px solid #007bff' : 'none',}}
    >
      {/* Section Header */}
      <div className="text-center mb-12"
      style={{textAlign: textAlign || "center",}}
      >
        {/* Title */}
        <h1
            ref={titleRef}
            onClick={(e) => handleSelect(e, 'title')} 
            contentEditable={!isPreview && isSelected('title')} //  Editable only if 'title' is selected
            suppressContentEditableWarning={true}
            onBlur={(e) => onChange(id, "title", e.currentTarget.textContent)} 
            className="text-4xl font-bold outline-none cursor-text"
            style={{
                color: titleColor || "#111", 
                fontFamily : titeFontFamily || "serif",
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
            contentEditable={!isPreview && isSelected('subtitle')} 
            suppressContentEditableWarning={true}
            onBlur={(e) => onChange(id, "subtitle", e.currentTarget.textContent)} 
            className="text-gray-600 text-lg outline-none cursor-text"
            style={{
                fontFamily : SubtiteFontFamily || "serif",
                fontSize : subtitleSize || 16 ,
                color : subtitleColor ,
                fontWeight : subtitleBold ? "bold" : "normal",
                border: isSelected('subtitle') && !isPreview ? '1px solid #007bff' : 'none',
                padding: '4px',
            }}
        >
            {initialSubtitle} 
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      style={{
        color : cardTextColor ,
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white group rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300  relative"
          >
            {/* Project Image Container */}
            <div className="relative w-full h-56"
            onClick={(e) => handleProjectImageSelect(e, project.id)}
            >
              <img
    // 💡 FIX 5: Use project.image from the state object
               src={project.image} 
                alt={project.name}
                 className="w-full h-full object-cover"
                />
              <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
              />

            </div>



    {/* card content */}
    <div className="p-6 flex flex-col gap-3">
      <h3
        style={{
          color : cardTitleColor || "black" ,
          fontWeight : cardTitleBold ? "normal" : "bold",
          fontSize : cardTitleSize || 20 , 
          fontFamily : cardTitleFontFamily || "sans-serif",
        }}
        className="text-xl font-semibold cursor-pointer text-center"
        contentEditable={!isPreview} 
        suppressContentEditableWarning={true}
        onClick={(e) => handleSelect(e, 'cardTitle', project.id)}
        onBlur={(e) => handleProjectChange(project.id, "name", e.currentTarget.textContent)}
      >
        {project.name}
      </h3>

      <p
        style={{
          color : cardSubtitleColor || "black" ,
          fontWeight : cardSubtitleBold ? "bold" : "normal",
          fontSize : cardSubtitleSize || 16 , 
          fontFamily : cardSubFontFamily || "sans-serif",

        }}
        className="text-sm opacity-80 cursor-pointer text-center"
        contentEditable={!isPreview} 
        suppressContentEditableWarning={true}
        onClick={(e) => handleSelect(e, 'cardDescription', project.id)}
        onBlur={(e) =>
          handleProjectChange(project.id, "description", e.currentTarget.textContent)
        }
      >
        {project.description}
      </p>

{isEditing ?  (
  <div
    className="mt-auto inline-block px-5 py-2 rounded-lg text-center text-sm font-medium  hover:opacity-80 transition cursor-pointer"
        style={{
          background : cardButtonColor || "black",
          fontWeight : cardBtnBold ? "bold" : "normal",
          fontSize : cardBtnSize || 20 , 
          fontFamily : cardBtnFontFamily || "sans-serif",

        }}
        onClick={(e) => handleSelect(e, 'buttonStyle')}
  >
    <span
      contentEditable={!isPreview} 
      suppressContentEditableWarning={true}
      onClick={(e) => handleSelect(e, 'cardButtonText', project.id)}
      onBlur={(e) =>
        handleProjectChange(project.id, "buttonText", e.currentTarget.textContent)
      }
      className="outline-none"
      style={{
        color : cardButtonTextColor || "white" ,
      }}
    >
      {project.buttonText || "View Project"}
    </span>
  </div>
) : (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-auto inline-block px-5 py-2 rounded-lg text-center text-sm font-medium bg-black text-white hover:opacity-80 transition"
  >
    {project.buttonText || "View Project"}
  </a>
)}
    </div>
  </div>
))}

      </div>

    </section>
  );
};

export default PortfolioSection;