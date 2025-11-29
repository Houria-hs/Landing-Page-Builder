import React, { useState , useEffect } from "react";
import DraggableBlock from "./dragg";
import NavbarBlock from "./BuiltinNav";
import FormBlock from "./FormBlock";
import HeroBlock from "../prebuiltSections/HeroSection";
import AboutSection from "../prebuiltSections/AboutSection";
import PortfolioSection from "../prebuiltSections/Portfolio";
import WebFont from "webfontloader";
import Sidebar from "./SideBar";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { getProfile } from "../services/authService";
import NavBuilderBlock from "./builderNav";
import GlobalToolbar from "./GlobalToolbar"
import Footer from "../prebuiltSections/Footer";


export default function Builder() {

  // profile image 
 const profileImg = localStorage.getItem("profileImg");

 // user 
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getProfile();
      setUser(user);
    };
    fetchUser();
  }, []);

// preview state
const [isPreview, setIsPreview] = useState(false)

// responsive preview toggle
const [RSpreviewMode, setRSpreviewMode] = useState("desktop");


// saving the block to local storage 
 const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem("builderBlocks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
  localStorage.setItem("builderBlocks", JSON.stringify(blocks));
  }, [blocks]);

//  Load last used font globally at app start
  useEffect(() => {
    const savedFont = localStorage.getItem("selectedFont");
    if (savedFont) {
      WebFont.load({ google: { families: [savedFont] } });
    }
  }, []);


  // CanvaS height
const [canvasHeight, setCanvasHeight] = useState(
  () => Number(localStorage.getItem("canvasHeight")) || 1200
);
useEffect(() => {
  localStorage.setItem("canvasHeight", canvasHeight);
}, [canvasHeight]);



// backgeound colors
  const [bgColor, setBgColor] = useState(() => localStorage.getItem("builderBgColor") || "#ffffff");
  const [navBgColor, setNavBgColor] = useState(() => localStorage.getItem("builderNavBgColor") || "#f8f9fa");
  const navbarBlock = blocks.find(b => b.type === "navbar");
  const [footerBG , setFooterBG] = useState(() => 
    localStorage.getItem("footerBgColor") || "#ffffff" 
  );
    // saving the background colors to local storage as well
  useEffect(() => {
  localStorage.setItem("builderBgColor", bgColor);
  }, [bgColor]);
  useEffect(() => {
  localStorage.setItem("builderNavBgColor", navBgColor);
  }, [navBgColor]);
  useEffect(() => {
  localStorage.setItem("footerBgColor", footerBG);
  }, [footerBG]);


  // const [selectedBlockId, setSelectedBlockId] = useState(null);
  // const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
 
  // sensors for drag and drop
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));




// NEW STATE: Tracks the block ID and the property key of the selected element
const [selectedElement, setSelectedElement] = useState({ 
    blockId: null, 
    propertyKey: null 
});

const { blockId: selectedBlockId, propertyKey: selectedPropertyKey } = selectedElement;

// New function to select a block OR a sub-element
const selectElement = (blockId, propertyKey = 'self') => {
    // If the user clicks the currently selected element again, deselect it
    if (selectedElement.blockId === blockId && selectedElement.propertyKey === propertyKey) {
        setSelectedElement({ blockId: null, propertyKey: null });
    } else {
        setSelectedElement({ blockId, propertyKey });
    }
};
// Find the full block object that is currently selected
const selectedBlock = blocks.find((b) => b.id === selectedBlockId);


  // Add block 
  const addBlock = (type) => {
  const id = String(Date.now());

  let newY = 100;

  if (blocks.length > 0) {
    const last = blocks[blocks.length - 1];
    newY = last.y + (last.height || 300) + 200;
  }

  
  if (type === "hero") {
  const id = String(Date.now());
  const newHero = {
    id,
    type: "hero",
    title: "Your Next Big Idea Starts Here 🚀",
    subtitle:"Create stunning, responsive pages effortlessly with our builder.",
    buttonText: "Get Started",
    buttonColor: "#1c398e",
    buttonTextColor: "#ffffff",
    bgColor: "transparent",
    titleColor : "#111111",
    subtitleColor : "#111111",
    titleBold : false,
    subtitleBold : false,
    buttonBold : false,
    titleSize : 30 ,
    subtitleSize : 16 ,
    buttonTextSize : 16,
    TitlefontFamily : "inter",
    SubfontFamily : "inter",
    BtnfontFamily : "inter",
    imageUrl: "/logo.png",
    x: 20,
    y: newY,
    imgWidth : 400,
    imgHeight : 400,
    width: 1200,
    height: 500,
    textAlign: "left",
  };

  setBlocks((prev) => [...prev, newHero]);
  selectElement(id, 'self'); //  NEW LOGIC
  return;
  }
  if (type === "portfolio") {
  const id = String(Date.now());

  const newPortfolio = {
    id,
    type: "portfolio",
      projects: [
  {
    id: 1,
    image: "/logo.png",
    name: "Project One",
    description: "A short description about project one.",
    link: "#",
  },
  {
    id: 2,
    image: "/logo.png",
    name: "Project Two",
    description: "A short description about project two.",
    link: "#",
  },
  {
    id: 3,
    image: "/logo.png",
    name: "Project Three",
    description: "A short description about project three.",
    link: "#",
  },
      ],
    title: "Your Next Big Idea Starts Here 🚀",
    subtitle:"Create stunning, responsive pages effortlessly with our builder.",
    buttonText: "Get Started",
    buttonColor: "#1c398e",
    buttonTextColor: "#ffffff",
    bgColor: "transparent",
    textColor: "#111111",
    titleColor : "#111111",
    subtitleColor : "#111111",
    cardTextColor :"#111111",
    titleBold : false,
    subtitleBold : false,
    buttonBold : false,
    titleSize : 30 ,
    subtitleSize : 16 ,
    buttonTextSize : 16,
    imageUrl: "/logo.png",    x: 20,
    y: newY,
    width: 1200,
    height: 500,

    titeFontFamily : "inter",
    SubtiteFontFamily : "inter",

    // cards
    cardsBGcolor: "#ffffffff",

    cardTitleColor:"#111111",
    cardSubtitleColor:"#111111",
    cardButtonColor:"#1c398e",
    cardButtonTextColor:"#ffffffff",
     
    cardTitleBold : true ,
    cardSubtitleBold : false ,
    cardBtnBold : false ,
    
    cardTitleSize : 20 ,
    cardSubtitleSize : 16 ,
    cardBtnSize : 16 ,

    cardTitleFontFamily : "inter",
    cardSubFontFamily : "inter",
    cardBtnFontFamily : "inter",

    textAlign : "center",
  };

  setBlocks((prev) => [...prev, newPortfolio]);
  return;
  }
  if (type === "aboutSection") {
  const id = String(Date.now());

  const newAbout = {
    id,
    type: "aboutSection",
    title: "About Us",
    description:" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    buttonText: "Contact Us",
    buttonColor: "#1c398e",
    buttonTextColor: "#ffffff",
    bgColor: "transparent",
    textColor: "#111111",
    titleColor: "#111111",
    titleBold : false,
    descriptionBold : false,
    buttonBold : false,
    titleSize : 30 ,
    descriptionSize : 16 ,
    buttonTextSize : 16,
    TitlefontFamily : "inter",
    SubfontFamily : "inter",
    BtnfontFamily : "inter",
    imageUrl: "/logo.png",    imageUrl: "/logo.png",
    x: 20,
    y: newY,
      imgWidth : 400,
    imgHeight : 400,
    width: 1200,
    height: 500,
    textAlign: "left",
    buttonAlign : "left",
  };

  setBlocks((prev) => [...prev, newAbout]);
  // setSelectedBlockId(id);
  return;
  }
  if (type === "form") {
  const id = String(Date.now()); 

  const newForm = {
    id,
    type: "form",
     x: 100,
     y: newY,
    width: 450,
    height: 350,
    fields: [
      { id: 1, label: "Name", type: "text", value: "" },
      { id: 2, label: "Email", type: "email", value: "" },
      { id: 3, label: "Message", type: "textarea", value: "" },
    ],
    labelSize : 16 ,
    labelolor : "#06276eff",
    labelBold : false ,
    buttonText: "Send",
    labelFont : "inter",
    buttonColor : "#06276eff",
    color: "#333",
    bgColor: "#fff",
    btnTextColor: "#ffffff",
    Bold: false,
    btnFontSize: 14,
    btnFont : "inter",
    isEditing: false,
  };

  setBlocks((prev) => [...prev, newForm]);
  // setSelectedBlockId(id);
  return; 
  }
  if (type === "navbar") {
    const hasNavbar = blocks.some(b => b.type === "navbar");
    if (hasNavbar) return alert("You already have a navbar 😅");

    const newNavbar = {
      id,
      type: "navbar",
      x: 0,
      y: 0,
      width: "100%",
      height: 64,
      bgColor: "#ffffff",
      logoText: "Brand",
      logoSrc: null,
      links: ["Home", "About", "Contact"],
      showCTA: true,
      ctaLabel: "Sign up",
      logoColor: "#000000",
      logoFontSize: 18,
      logoBold: false,
      linksBold : false,
      logoFamily : "inter",
      LinksFamily : "inter",
      CTAFamily : "inter",
      linkColor: "#333333",
      ctaFontSize: 16,
      linksFontSize : 16,
      ctaBgColor: "#1c398e",
      ctaTextColor: "#ffffff",
      ctaBold: false,
      ctaFontSize: 14,
      center : false,
    };
    setBlocks((prev) => [...prev, newNavbar]);
    // setSelectedBlockId(id);
    selectElement(id, 'self'); 
    return; 
  }
  //  Otherwise, handle normal blocks (text, image, button)
  const newBlock = {
    id,
    type,
    x: 100,
    y: newY,
    bold: false,
    width: type === "image" ? 500 : 150,
    height: type === "image" ? 500 : 50,
    fontSize: type === "text" ? 16 : 18,
    content: type === "text" ? "Text..." : "",
    color: type === "text" ? "#000000" : "#1c398e",
    label: type === "button" ? "Button" : "",
    buttonColor: "#1c398e",
    src: null,
    isEditing: false,
    textAlign: "left",
  };
  if (type === "footer") {
  const hasFooter = blocks.some((block) => block.type === "footer");
  if (hasFooter) return alert("You already have a footer 😅");

  const footerBlock = {
    id,
    width: "100%",
    height: 64,
    type: "footer",
    content: "© 2025 Your Brand — All rights reserved.",
    textColor: "#000000",
    textFontSize: 16,
    textBold: false,
    bgColor : "white",
    footerFont : "inter",
  };

  setBlocks((prev) => [...prev, footerBlock]);
   selectElement(id, 'self');  return;
  }
  setBlocks((prev) => [...prev, newBlock]);
  selectElement(id, 'self'); // ✅ NEW LOGIC
};

  // Auto-expand canvas height based on block positions
  useEffect(() => {
  if (blocks.length === 0) {
    setCanvasHeight(800); // default height when empty
    return;
  }

  // Find the bottommost point of all blocks
  const maxY = Math.max(...blocks.map((b) => b.y + (Number(b.height) || 100)), 0);

  // Add breathing room
  const newHeight = Math.max(maxY + 200, 800);

  // Only update when it actually changes to avoid flicker
  setCanvasHeight((prev) => (Math.abs(prev - newHeight) > 5 ? newHeight : prev));
  }, [blocks]);



  const updateBlock = (id, key, value) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, [key]: value } : b)));
  };
  const handleImageUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateBlock(id, "src", reader.result);
    reader.readAsDataURL(file);
  };
  const handleLogoUpload = (id, file) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => updateBlock(id, "logoSrc", reader.result);
  reader.readAsDataURL(file);
  };
const deleteBlock = (id) => {
    // 1. Determine which ID to delete (use argument ID or the currently selected block ID)
    const idToDelete = id || selectedBlockId; 
    
    if (!idToDelete) return; // Exit if no ID is found

    // 2. Filter blocks to remove the one with the determined ID
    setBlocks((prev) => prev.filter((b) => b.id !== idToDelete));
    
    // 3. Clear selection state if the deleted block was the selected one
    if (selectedBlockId === idToDelete) {
        setSelectedElement({ blockId: null, propertyKey: null }); // ✅ Use the new selection state setter
    }
};
  const handleDragEnd = (event) => {
    const { delta } = event;
    const id = event.active?.id;

    if (!id) return;
    setBlocks((prev) =>
      prev.map((b) =>
        String(b.id) === String(id) ? { ...b, x: b.x + (delta?.x || 0), y: b.y + (delta?.y || 0) } : b
      )
    );
  };
  // resize (pointer)
  const startResizing = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const block = blocks.find((b) => b.id === id);
    if (!block) return;

    const startWidth = typeof block.width === "number" ? block.width : parseInt(block.width) || 250;
    const startHeight =
      typeof block.height === "number" ? block.height : parseInt(block.height) || (block.type === "image" ? 180 : 100);

    const handlePointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      

      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                width: Math.max(60, Math.round(startWidth + dx)),
                height: b.type === "image" ? Math.max(40, Math.round(startHeight + dy)) : b.height,
              }
            : b
        )
      );
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };
  // resize for navbar 
  const startResizingNavbar = (e, id) => {
  e.preventDefault();
  e.stopPropagation();

  const startY = e.clientY;
  const block = blocks.find((b) => b.id === id);
  if (!block) return;

  const startHeight = block.height || 64;

  const handlePointerMove = (moveEvent) => {
    const dy = moveEvent.clientY - startY;
    const newHeight = Math.max(40, Math.round(startHeight + dy)); // min 40px
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, height: newHeight } : b))
    );
  };

  const handlePointerUp = () => {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
  };
  // Canvas mouse down: deselect unless click inside toolbar (toolbar stops propagation anyway)
  const handleCanvasMouseDown = (e) => {
    // If user clicked inside toolbar, toolbar's onMouseDown already stopPropagation,
    // but keep this robust: if nearest toolbar found, do nothing
    if (e.target.closest(".toolbar")) return;
    if (e.target.closest(".navbar-editable")) return; 
    setSelectedBlockId(null);
  };
  // export as html
const exportLandingPage = () => {
  const canvasEl = document.getElementById("page-canvas");
  if (!canvasEl) {
    alert("Canvas not found.");
    return;
  }

  // Clone the actual live canvas
  const clone = canvasEl.cloneNode(true);

  // Remove editor-only UI
  clone
    .querySelectorAll(
      "[data-editor-ui], .mini-toolbar, .hover-overlay, .resize-handle, .editor-overlay, .selected-border"
    )
    .forEach((el) => el.remove());

  // Disable contentEditable / interactivity
  clone.querySelectorAll("[contenteditable]").forEach((el) => {
    el.removeAttribute("contenteditable");
  });

  clone.querySelectorAll("button, input, textarea").forEach((el) => {
    el.removeAttribute("onclick");
  });

  // Collect unique fonts
  const usedFonts = [
    ...new Set(blocks.map((b) => b.fontFamily).filter(Boolean)),
  ];

  const fontQuery = usedFonts
    .map((f) => `family=${f.replace(/\s+/g, "+")}`)
    .join("&");

  const googleFontsLink =
    usedFonts.length > 0
      ? `<link href="https://fonts.googleapis.com/css2?${fontQuery}&display=swap" rel="stylesheet">`
      : "";

  // Build final HTML
  const fullHtml = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
${googleFontsLink}
<title>Exported Landing Page</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  body {
    background: #fff;
  }
  #page-canvas {
    width: 100vw;
    min-height: 100vh;
  }
</style>
</head>
<body>
  ${clone.outerHTML}
</body>
</html>`;

  // Download it
  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "landing-page.html";
  a.click();
  URL.revokeObjectURL(url);
};
// duplicate function
const duplicateBlock = (id) => {
    const idToDuplicate = id || selectedBlockId; // Use argument ID or the currently selected block ID

    setBlocks((prev) => {
        const index = prev.findIndex((b) => b.id === idToDuplicate);
        if (index === -1) return prev;

        const original = prev[index];
        const newId = String(Date.now());

        // Create a deep copy using JSON parse/stringify for complex nested elements 
        const blockContent = JSON.parse(JSON.stringify(original)); 

        // 💡 Ensure sub-element IDs are also unique when duplicating complex blocks
        let projectsCopy = blockContent.projects ? blockContent.projects.map(p => ({ ...p, id: String(Date.now() + Math.random()) })) : original.projects;
        let fieldsCopy = blockContent.fields ? blockContent.fields.map(f => ({ ...f, id: String(Date.now() + Math.random()) })) : original.fields;

        // Create the duplicated block object
        const duplicated = {
            ...blockContent,
            id: newId,
            x: (original.x || 0) + 30, // move 30px right
            y: (original.y || 0) + 30, // move 30px down
            isEditing: false,
            // Use the newly created copies for nested arrays
            ...(projectsCopy && { projects: projectsCopy }),
            ...(fieldsCopy && { fields: fieldsCopy }),
        };

        const updated = [...prev];
        updated.splice(index + 1, 0, duplicated);

        // Immediately select the duplicated block
        selectElement(newId, 'self'); // Select the new block
        
        return updated;
    });
};





  return (
    <>
      {/* Navbar */}
      <NavBuilderBlock
        isPreview={isPreview}
        setIsPreview={setIsPreview}
        exportLandingPage={exportLandingPage}
        user={user}
        profileImg={profileImg}
      />


    {/* builder */}
    <div className="min-h-screen flex bg-pink-100" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
     {/* sidebar */}
      <Sidebar
        isPreview={isPreview}
        addBlock={addBlock}
        bgColor={bgColor}
        setBgColor={setBgColor}
        navBgColor={navBgColor}
        setNavBgColor={setNavBgColor}
        footerBG={footerBG}
        setFooterBG={setFooterBG}
        setBlocks={setBlocks}
      />



      {/* start building */}
      <div  className="flex-1 p-2"
       onMouseDown={handleCanvasMouseDown}>        
        {/* GLOBAL TOOLBAR  */}
        <GlobalToolbar
        isPreview={isPreview}
        selectedBlock={selectedBlock}
        updateBlock={updateBlock}
        handleImageUpload={handleImageUpload}
        duplicateBlock={duplicateBlock}
        deleteBlock={deleteBlock}
        selectedPropertyKey={selectedPropertyKey} 
        />
        {/* height and resposniveness toolbar  */}
        <div style={{width : "60%"}}
className="flex ml-70 items-center justify-start gap-4 w-full mt-4 px-6">
  {/* Canvas Height Toolbar */}
  {!isPreview && (
    <div
      className="bg-white/80 backdrop-blur-md border border-pink-100 shadow-sm px-4 py-2 rounded-xl flex items-center gap-3 transition-all duration-300"
      style={{ width: "auto" }}
    >
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Canvas Height:
      </label>

      <input
        type="number"
        value={canvasHeight}
        onChange={(e) => setCanvasHeight(Number(e.target.value))}
        className="w-24 border border-pink-200 rounded p-1 text-center focus:ring-2 focus:ring-pink-300"
        min="400"
        step="100"
      />

      <span className="text-gray-600 text-sm">px</span>
    </div>
  )}

  {/* Responsive Toggle Toolbar */}
  {!isPreview && (
  <div className="flex display-none items-center justify-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 px-3 py-2 rounded-xl shadow-sm transition-all duration-300">
    <button
      onClick={() => setRSpreviewMode("desktop")}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
        RSpreviewMode === "desktop"
          ? "bg-pink-100 text-pink-600"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      🖥️ Desktop
    </button>

    <button
      onClick={() => setRSpreviewMode("tablet")}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
        RSpreviewMode === "tablet"
          ? "bg-pink-100 text-pink-600"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      💻 Tablet
    </button>

    <button
      onClick={() => setRSpreviewMode("mobile")}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
        RSpreviewMode === "mobile"
          ? "bg-pink-100 text-pink-600"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      📱 Mobile
    </button>
  </div>
  )}

        </div>

        {/* where the drag and drop is possible */}
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>         
          <div 
          id="page-canvas" 
          style={{
          display: "flex", 
          flexDirection: "column",
          transform:!isPreview ? "scale(0.7)" : "scale(1)" ,
          transformOrigin: "top center",
          // width : "100%",
           width:
        RSpreviewMode === "desktop"  
        ? "100%"
        : RSpreviewMode === "tablet"
        ? "768px"
        : "375px",
         marginLeft: isPreview
        ? "0"
        : RSpreviewMode === "tablet"
        ? "12rem"
        : RSpreviewMode === "mobile"
        ? "15.5rem"
        : "7.4rem",
          overflow: "visible" ,
          backgroundColor: bgColor || "#fff",
          minHeight: `${canvasHeight}px` || "1600px",
          transition: "height 0.3s ease",          
          flexGrow: 1,
          }}
          className={`canvas-area mt-1 mx-auto relative origin-top transition-transform duration-300 rounded-xl border border-gray-300 shadow-inner p-6 
          ${!isPreview ? "ml-29" : "ml-0"}`}>

            {/* NAVBAR (non-draggable, always on top) */}
            {navbarBlock && (
            <div
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                width : navbarBlock.width || "100%" ,
                height: navbarBlock.height || 64, // default height
                position: "relative",
              }}
              className={`mb-6 navbar-editable ${!isPreview && selectedBlockId === navbarBlock.id ? "ring-2 ring-blue-400" : ""}`}
            >
              <NavbarBlock
              id={navbarBlock.id}
              isPreview={isPreview}
                block={navbarBlock}
                selected={selectedBlockId === navbarBlock.id}
                onChange={updateBlock}
                deleteBlock={deleteBlock}
                isEditing={selectedBlockId === navbarBlock.id}
                onUpdate={(key, value) => updateBlock(navbarBlock.id, key, value)}
                onUploadLogo={(file) => handleLogoUpload(navbarBlock.id, file)}
                onElementSelect={selectElement} 
                selectedPropertyKey={selectedPropertyKey}
              />

              {/* 🟦 Add resize handle only when selected */}
              {selectedBlockId === navbarBlock.id && !isPreview && (
                <div
                  onPointerDown={(e) => startResizingNavbar(e, navbarBlock.id)}
                  className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/40 cursor-row-resize"
               />
              )}
            </div>
            )}

            
            {blocks.map((block) => (

               
              <DraggableBlock
                disabled={isPreview}
                isPreview={isPreview} 
                key={block.id}
                id={block.id}
                x={block.x}
                y={block.y}
                isEditing={selectedBlockId === block.id}
                onStartResize={!isPreview ? startResizing : undefined}
                // onSelect={selectBlock}
                onDragEnd={handleDragEnd}
               >

                
                {/* TEXT */}
                {block.type === "text" && (
  <div
                  onClick={(e) => {
                      e.stopPropagation();
                      selectElement(block.id, 'self');
                  }}
    style={{
      fontFamily: block.fontFamily || "Inter, sans-serif",
      fontWeight: block.bold ? "bold" : "normal",
      fontSize: block.fontSize || 16,
      color: block.color || "#000",
      textAlign: block.textAlign || "left",
      width: block.width || "auto",
      minHeight: "20px",
      padding: 8,
      borderRadius: 8,
      background:
        selectedBlockId === block.id && block.isEditing
          ? "rgba(255, 255, 255, 0.9)"
          : "transparent",
      outline:
        selectedBlockId === block.id
          ? "1.5px solid #f472b6"
          : "1px solid transparent",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      cursor: "text",
    }}
    contentEditable={!isPreview && block.isEditing}
    suppressContentEditableWarning={true}
    onFocus={true}
    onInput={(e) =>
      updateBlock(block.id, "content", e.currentTarget.textContent)
    }
    onBlur={() => updateBlock(block.id, "isEditing", false)}
  >
    {block.content || "Click to edit text..."}
  </div>
                )}
                
                {/* IMAGE */}
                {block.type === "image" && (
  <div
                  onClick={(e) => {
                      e.stopPropagation();
                      selectElement(block.id, 'self');
                  }}
    className="relative inline-block"
    style={{
      width: block.width,
      height: typeof block.height === "number" ? block.height : block.height
    }}
  >
    {selectedBlockId === block.id && !isPreview && (
      <div
        onPointerDown={(e) => startResizing(e, block.id)}
        className="absolute w-3 h-3 bg-blue-500 rounded-full"
        style={{ right: -6, bottom: -6, cursor: "se-resize" }}
      />
    )}

    {/* The image (default or uploaded) */}
    <img
      src={block.src || "/logo.png"}   // 👈 default image
      alt="image block"
      className="w-full h-full object-cover rounded cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        document.getElementById(`file-input-${block.id}`).click(); // 👈 trigger input
      }}
    />

    {/* Hidden file input */}
    <input
      id={`file-input-${block.id}`}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(block.id, file);
      }}
    />
  </div>
                )}

                {/* BUTTON */}
                {block.type === "button" && (
                  <div onClick={(e) => {
                      e.stopPropagation();
                      selectElement(block.id, 'self');
                  }} className="relative inline-block" style={{ width: block.width, height: block.height === "auto" ? undefined : block.height }}>
                    {selectedBlockId === block.id && !isPreview && (
                      <>
                        {/* <button onPointerDown={(e) => e.stopPropagation()} onClick={() => deleteBlock(block.id)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7">✖</button> */}
                        <div onPointerDown={(e) => startResizing(e, block.id)} className="absolute bottom-0 right-0 w-3 h-3 bg-blue-800 rounded-full" style={{ transform: "translate(50%,50%)", cursor: "se-resize" }} />
                      </>
                    )}
                    <button 
                     onPointerDown={(e) => e.stopPropagation()} 
                     style={{
                      fontSize : block.fontSize || 16,
                      fontWeight : block.bold ? "bold" : "normal",
                      backgroundColor: block.color || "#06276eff", 
                      fontFamily: block.fontFamily || "Inter, sans-serif",
                     }} 
                     className="w-full h-full text-white font-semibold rounded shadow-md">{block.label}</button>
                  </div>
                )}
                {/* form */}
                {block.type === "form" && (
                  <div
                  onMouseDown={(e) => e.stopPropagation()}

                  onClick={(e) => {
                      e.stopPropagation();
                      selectElement(block.id, 'self');
                  }}
>
  <FormBlock
    {...block}
    isPreview={isPreview}
    onElementSelect={selectElement} 
    selectedPropertyKey={selectedPropertyKey}
    selected={selectedBlockId === block.id}
    onChange={updateBlock}
              onClick={(e) => {
                e.stopPropagation();
                 selectElement(block.id, 'self');
              }}
                  />
</div>
                   
                )}
                {/* hero section */}
                {block.type === "hero" && (
                  <div
                   onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                      e.stopPropagation();
                      selectElement(block.id, 'self');
                  }}
                    style={{
                      width: block.width,
                      height: block.height,
                    }}
                  >
                    <HeroBlock
                    
                      {...block}
                      isPreview={isPreview}
                      selected={selectedBlockId === block.id}
                      onChange={updateBlock}
                      titleBold = {block.titleBold}
                      titleSize = {block.titleSize}
                      subtitleBold = {block.subtitleBold}
                      subtitleSize = {block.subtitleSize}
                      fontFamily = {block.fontFamily}
                      //  New Prop to allow child to select sub-elements
                     onElementSelect={selectElement} 
                     selectedPropertyKey={selectedPropertyKey}
                      style={{
                      // background: block.bgColor,
                      position: "relative",
                      width: block.width,
                      height: block.height,
                      fontFamily: block.fontFamily || localStorage.getItem("selectedFont") || "serif",

                    }}
                    />
                  </div>
                )}
                {/* about section */}
                {block.type === "aboutSection" && (
                  <div
                  onMouseDown={(e) => e.stopPropagation()}

                  onClick={(e) => {
                      e.stopPropagation();
                      selectElement(block.id, 'self');
                  }}
                    style={{
                      // background: block.bgColor,
                      // color: block.color,
                      width: block.width,
                      height: block.height,
                    }}
                  >
                    <AboutSection
                      {...block}
                      isPreview={isPreview}
                      selected={selectedBlockId === block.id}
                      onChange={updateBlock}
                      // onChange={updateBlock}
                      titleBold = {block.titleBold}
                      titleSize = {block.titleSize}
                      subtitleBold = {block.subtitleBold}
                      subtitleSize = {block.subtitleSize}
                      fontFamily = {block.fontFamily}
                     onElementSelect={selectElement} 
                     selectedPropertyKey={selectedPropertyKey}
                      style={{
                      // background: block.bgColor,
                      position: "relative",
                      width: block.width,
                      height: block.height,
                      fontFamily: block.fontFamily || localStorage.getItem("selectedFont") || "serif",

                    }}
                    />
                  </div>
                )}
                {block.type === "portfolio" && (
                  <div
                   onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        selectElement(block.id, 'self');
                    }}
                  
                    style={{
                      width: block.width,
                      height: block.height,
                    }}
                  >
                    <PortfolioSection
                      {...block}
                      isPreview={isPreview}
                      selected={selectedBlockId === block.id}
                      onChange={updateBlock}
                      isEditing={true}
                      
                     onElementSelect={selectElement} 
                     selectedPropertyKey={selectedPropertyKey}


                      style={{
                      position: "relative",
                      width: block.width,
                      height: block.height,
                      fontFamily: block.fontFamily || localStorage.getItem("selectedFont") || "Inter",
                    }}
                    />
                  </div>
                )}
              </DraggableBlock>
              ))}

            
            {blocks
              .filter((b) => b.type === "footer")
              .map((block) => (
                <div
                  key={block.id}
                   onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectElement(block.id, 'self');
                  }}
                  style={{
                                        marginTop : "auto",
                    position: "relative",
                  }}
                >
                   <Footer
                   isPreview={isPreview}
                   updateBlock={updateBlock}
                      selected={selectedBlockId === block.id}
                      onChange={updateBlock}
                   id={block.id}
                block={block}
                isEditing={selectedBlockId === block.id}
                onElementSelect={selectElement} 
                selectedPropertyKey={selectedPropertyKey}
                    content={block.content}
                    textColor={block.textColor}
                    textFontSize={block.textFontSize}
                    textBold={block.textBold}
                    bgColor={block.bgColor}
                    footerFont={block.footerFont}
                    width={block.width}
                    height={block.height}
                deleteBlock={deleteBlock}
                    
                   />
                </div> 
            ))}
          </div>
        </DndContext>
      </div>
    </div>
    </>
  );
}