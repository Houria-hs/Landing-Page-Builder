import React , { useState , useEffect} from "react";
import MiniToolbar from "../components/miniToolbar";

const PortfolioSection = ({
id,
title :initialTitle,
subtitle : initialSubtitle,
onChange,
selected,
titleColor,
subtitleColor,
cardTextColor,
buttonColor,
buttonTextColor,
buttonTextSize,
isEditing,
projects,
bgColor,
textColor,
titleBold,
buttonBold,
subtitleBold,
subtitleSize,
titleSize,
fontFamily,
isPreview,
}) => {
  const handleChange = (field, value) => {
    onChange(id, field, value);
  };
    const [link, setLink] = useState("#");
    const [title, setTitle] = useState(() => localStorage.getItem(`${id}-title`) || initialTitle || "portfolio section title"); 
    const [editingTitle, setEditingTitle] = useState(false);
    const [subtitle, setSubtitle] = useState(() => localStorage.getItem(`${id}-subtitle`) || initialSubtitle || "hero section subtitle");
    const [editingsubTitle, setEditingsubTitle] = useState(false);
    // Load from localStorage (parse JSON)
    const [projectImages, setProjectImages] = useState(() => {
      const saved = localStorage.getItem("cardsImage");
      return saved ? JSON.parse(saved) : {}; // default to empty object
    });
    useEffect(() => {
      if (projectImages) localStorage.setItem("cardsImage", JSON.stringify(projectImages));
    }, [projectImages]);

        // Save to localStorage whenever they change
        useEffect(() => {
          localStorage.setItem(`${id}-title`, title);
        }, [title]);
      
        useEffect(() => {
          localStorage.setItem(`${id}-subtitle`, subtitle);
        }, [subtitle]);

// handle image upload for each project
const handleImageUpload = (e, projectId) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectImages((prev) => ({
        ...prev,
        [projectId]: reader.result, // store image for that specific card
      }));
    };
    reader.readAsDataURL(file);
  }
};

  
    const handleProjectChange = (projectId, field, value) => {
      const updatedProjects = projects.map(p =>
      p.id === projectId ? { ...p, [field]: value } : p
      );
      handleChange("projects", updatedProjects);
    };
  // change the button link
  // const handleLinkEdit = () => {
  //   const newLink = prompt("Enter your project link:", link);
  //   if (newLink) setLink(newLink);
  // };


  return (
    <section
      className="w-full relative py-16 px-6 md:px-12 transition-all duration-300"
      style={{ backgroundColor: bgColor, color: textColor, fontFamily }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        {editingTitle ? !isPreview && (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => !isPreview ?  setEditingTitle(false) : setEditingTitle(false) }
          autoFocus
          className="text-3xl font-bold border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <h2 className="text-3xl md:text-4xl font-bold mb-3"
          contentEditable={!isPreview} 
          suppressContentEditableWarning={true}
          onClick={() => !isPreview ?  setEditingTitle(true) : setEditingTitle(false) }
          style={{
            color : titleColor ,
            fontFamily : fontFamily || "serif",
            fontWeight : titleBold ? "bold" : "normal",
            fontSize : titleSize ,
          }}
        >
          {title}
        </h2>
        )}
        
        {editingsubTitle ? !isPreview && (
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          onBlur={() =>  !isPreview ?  setEditingsubTitle(false) :  setEditingsubTitle(false)}
          autoFocus
          className="text-3xl font-bold border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <p className="text-lg opacity-80"
          contentEditable={!isPreview} 
          suppressContentEditableWarning={true}
          style={{
            color : subtitleColor ,
            fontFamily : fontFamily || "serif",
            fontWeight : subtitleBold ? "bold" : "normal",
            fontSize : subtitleSize || 16,
          }}
         onInput={(e) => handleChange("subtitle", e.currentTarget.textContent)}
         onClick={() =>  !isPreview ?  setEditingsubTitle(true) :  setEditingsubTitle(false)}
          >
          {subtitle}
          </p>
         )}
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
<div className="relative w-full h-56">
  {projectImages?.[project.id] ? (
    <img
      src={projectImages[project.id]}
      alt={project.name}
      className="w-full h-full object-cover"
    />
  ) : (
      <img src={project.image} alt="projects"
      className="w-full h-full object-cover"
       />
  )}

  {/* Hover overlay to upload image */}
  { !isPreview && (
   <>
  <label
    htmlFor={`upload-${project.id}`}
    className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
  >
    Add / Change Image
  </label>

  <input
    id={`upload-${project.id}`}
    type="file"
    accept="image/*"
    onChange={(e) => handleImageUpload(e, project.id)}
    className="hidden"
  />
  </>
  )}

</div>



    {/* card content */}
    <div className="p-6 flex flex-col gap-3">
      <h3
        className="text-xl font-semibold cursor-pointer"
        contentEditable={!isPreview} 
        suppressContentEditableWarning={true}
        onBlur={(e) => handleProjectChange(project.id, "name", e.currentTarget.textContent)}
      >
        {project.name}
      </h3>

      <p
        className="text-sm opacity-80 cursor-pointer"
        contentEditable={!isPreview} 
        suppressContentEditableWarning={true}
        onBlur={(e) =>
          handleProjectChange(project.id, "description", e.currentTarget.textContent)
        }
      >
        {project.description}
      </p>

{isEditing ?  (
  <div
    className="mt-auto inline-block px-5 py-2 rounded-lg text-center text-sm font-medium bg-black text-white hover:opacity-80 transition cursor-pointer"
            style={{
              background: buttonColor || "#1c398e",
              color: buttonTextColor || "#fff",
              fontSize: buttonTextSize,
              fontWeight : buttonBold ? "bold" : "normal",
            }}
  >
    <span
      contentEditable={!isPreview} 
      suppressContentEditableWarning={true}
      onBlur={(e) =>
        handleProjectChange(project.id, "buttonText", e.currentTarget.textContent)
      }
      className="outline-none"
      style={{
        color: buttonTextColor
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

      {/* link edit button */}
        {/* <button
          onClick={handleLinkEdit}
          className="absolute top-2 right-2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          Edit Link
        </button> */}
    </div>
  </div>
))}

      </div>

{/*  MINI TOOLBAR */}
{selected &&  !isPreview && (
  <MiniToolbar
    title="Portfolio Section Editor"
    onClick={(e) => e.stopPropagation()}
    onClose={() => onChange(id, "selected", false)}
    onChange={handleChange}
    fields={[
      { name: "buttonColor", label: "Button Color", type: "color", value: buttonColor },
      { name: "bgColor", label: "Background", type: "color", value: bgColor },
      { name: "buttonTextColor", label: "button text Color", type: "color", value: buttonTextColor },
      { name: "titleColor", label: "title color", type: "color", value: titleColor },
      { name: "subtitleColor", label: "subtitle Color", type: "color", value: subtitleColor },
      { name: "cardTextColor", label: "card text Color", type: "color", value: cardTextColor },
    ]}
  />
)}
    </section>
  );
};

export default PortfolioSection;