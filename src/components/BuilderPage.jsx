import React, { useState , useEffect} from "react";
import DraggableBlock from "./dragg";
import NavbarBlock from "./BuiltinNav";
import FontSelector from "./FontSelector";
import FormBlock from "./FormBlock";
import HeroBlock from "../prebuiltSections/HeroSection";
import AboutSection from "../prebuiltSections/AboutSection";
import { Link } from "react-router-dom";
import WebFont from "webfontloader";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { Type, Image as ImageIcon, MousePointerClick, Navigation, LayoutTemplate, Bold } from "lucide-react";

export default function Builder() {

 const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem("builderBlocks");
    return saved ? JSON.parse(saved) : [];
  });
  // saving the block to local storage 
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
 const [canvasHeight, setCanvasHeight] = useState(
  () => Number(localStorage.getItem("canvasHeight")) || 1200
);
useEffect(() => {
  localStorage.setItem("canvasHeight", canvasHeight);
}, [canvasHeight]);


  const [bgColor, setBgColor] = useState(() => localStorage.getItem("builderBgColor") || "#ffffff");
  const [navBgColor, setNavBgColor] = useState(() => localStorage.getItem("builderNavBgColor") || "#f8f9fa");
  const navbarBlock = blocks.find(b => b.type === "navbar");
  const [footerBG , setFooterBG] = useState(() => 
    localStorage.getItem("footerBgColor") || "#ffffff" 
  );
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
  // preview mode
  const [isPreview, setIsPreview] = useState(false)
  // toggle sidebar 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // responsive preview toggle
  const [RSpreviewMode, setRSpreviewMode] = useState("desktop");
  // sensors for drag and drop
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

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

  // selectBlock now only needs id
  const selectBlock = (id) => {
    setSelectedBlockId(id);
  };

  // Add block (keeps existing behavior)
  const addBlock = (type) => {
  const id = String(Date.now());
  
  if (type === "hero") {
  const id = String(Date.now());

  const newHero = {
    id,
    type: "hero",
    title: "Your Next Big Idea Starts Here 🚀",
    subtitle:"Create stunning, responsive pages effortlessly with our builder.",
    buttonText: "Get Started",
    buttonColor: "#2563eb",
    buttonTextColor: "#ffffff",
    bgColor: "#ffffff",
    textColor: "#111111",
    titleBold : false,
    subtitleBold : false,
    titleSize : 30 ,
    subtitleSize : 16 ,
    fontFamily : "inter",
    imageUrl: "https://illustrations.popsy.co/violet/online-community.svg",
    x: 100,
    y: 100,
    width: 500,
    height: 500,
  };

  setBlocks((prev) => [...prev, newHero]);
  setSelectedBlockId(id);
  return;
  }
  if (type === "aboutSection") {
  const id = String(Date.now());

  const newHero = {
    id,
    type: "aboutSection",
    title: "About Us",
    description:" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    buttonText: "Contact Us",
    buttonColor: "#2563eb",
    buttonTextColor: "#ffffff",
    bgColor: "#ffffff",
    textColor: "#111111",
    titleBold : false,
    descriptionBold : false,
    titleSize : 30 ,
    descriptionSize : 16 ,
    fontFamily : "inter",
    imageUrl: "https://illustrations.popsy.co/violet/online-community.svg",
    x: 100,
    y: 100,
    width: 500,
    height: 500,
  };

  setBlocks((prev) => [...prev, newHero]);
  setSelectedBlockId(id);
  return;
  }
  if (type === "form") {
  const id = String(Date.now()); 

  const newForm = {
    id, // ✅ use the same one
    type: "form",
     x: 100,
     y: 100,
    width: 400,
    height: 350,
    fields: [
      { id: 1, label: "Name", type: "text", value: "" },
      { id: 2, label: "Email", type: "email", value: "" },
      { id: 3, label: "Message", type: "textarea", value: "" },
    ],
    buttonText: "Send",
    buttonColor : "#06276eff",
    color: "#333",
    bgColor: "#fff",
    btnTextColor: "#ffffff",
    Bold: false,
    btnFontSize: 14,
    isEditing: false,
  };

  setBlocks((prev) => [...prev, newForm]);
  setSelectedBlockId(id);
  return; 
  }

  if (type === "navbar") {
    const hasNavbar = blocks.some(b => b.type === "navbar");
    if (hasNavbar) return; // prevent multiple navbars

    const newNavbar = {
      id,
      type: "navbar",
      x: 0,
      y: 0,
      width: "100%",
      height: 64,
      navBgColor: "#ffffff",
      logoText: "Brand",
      logoSrc: null,
      links: ["Home", "About", "Contact"],
      showCTA: true,
      ctaLabel: "Sign up",
      logoColor: "#000000",
      logoFontSize: 18,
      logoBold: false,
      linksBold : false,
      linkColor: "#333333",
      ctaFontSize: 16,
      linksFontSize : 16,
      ctaBgColor: "#06276eff",
      ctaTextColor: "#ffffff",
      ctaBold: false,
      ctaFontSize: 14,
      bgColor: "transparent",

    };
    setBlocks((prev) => [...prev, newNavbar]);
    setSelectedBlockId(id);
    return; //  stop here so no second block is added
  }
  //  Otherwise, handle normal blocks (text, image, button)
  const newBlock = {
    id,
    type,
    x: 100,
    y: 100,
    bold: false,
    width: type === "image" ? 220 : 250,
    height: type === "image" ? 180 : "auto",
    fontSize: 16,
    content: type === "text" ? "Text..." : "",
    color: type === "text" ? "#000000" : "#06276eff",
    label: type === "button" ? "Click Me" : "",
    buttonColor: "#06276eff",
    src: null,
    isEditing: false,
    textAlign: "left",
  };

  if (type === "footer") {
  const hasFooter = blocks.some((block) => block.type === "footer");
  if (hasFooter) return alert("You already have a footer 😅");

  const footerBlock = {
    id,
    type: "footer",
    content: "© 2025 Your Brand — All rights reserved.",
    textColor: "#000000",
    textFontSize: 16,
    textBold: false,
  };

  setBlocks((prev) => [...prev, footerBlock]);
  setSelectedBlockId(id);
  return;
  }


  setBlocks((prev) => [...prev, newBlock]);
  setSelectedBlockId(id);
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
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
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
  // export as html fucntion 
  const exportLandingPage = () => {
  const canvasEl = document.getElementById("page-canvas");
  if (!canvasEl) {
    alert("Canvas not found.");
    return;
  }

  // clone the actual live canvas HTML
  const clone = canvasEl.cloneNode(true);
  

  // remove any editor-only UI (handles, outlines, buttons, etc.)
  clone.querySelectorAll("[data-editor-ui], .resize-handle, .selected-border, .editor-overlay").forEach(el => el.remove());


   // 1️⃣ Get all unique fonts from your blocks
  const usedFonts = [
    ...new Set(
      blocks
        .map((block) => block.fontFamily)
        .filter(Boolean) // remove null/undefined
    ),
  ];

  // 2️⃣ Build the Google Fonts link
  const fontQuery = usedFonts
    .map((font) => `family=${font.replace(/\s+/g, "+")}`)
    .join("&");

  const googleFontsLink = `<link href="https://fonts.googleapis.com/css2?${fontQuery}&display=swap" rel="stylesheet">`;

  // 3️⃣ Convert your blocks into HTML (however you already do it)
  const pageContent = blocks
    .map(
      (block) =>
        `<div style="font-family: '${block.fontFamily}', sans-serif;">${block.content}</div>`
    )
    .join("\n");

  // build a clean HTML document
  const fullHtml = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
 ${googleFontsLink}<title>Exported Landing Page</title>
<!-- tailwind -->
<script src="https://cdn.tailwindcss.com"></script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  body {
    background: ${bgColor || "#fff"};
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

  // download it
  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "landing-page.html";
  a.click();
  URL.revokeObjectURL(url);
 };
 const duplicateBlock = (id) => {
  setBlocks((prev) => {
    const index = prev.findIndex((b) => b.id === id);
    if (index === -1) return prev;

    const original = prev[index];
    const newId = String(Date.now());

    // Create a shallow copy with new ID + slight offset so it’s visible
    const duplicated = {
      ...original,
      id: newId,
      x: (original.x || 0) + 30, // move 30px right
      y: (original.y || 0) + 30, // move 30px down
      isEditing: false,
    };

    const updated = [...prev];
    updated.splice(index + 1, 0, duplicated);
    return updated;
  });
 };



  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50 border-b border-pink-100">
  {/* Left Section — Logo / App Name */}
  <div className="flex items-center space-x-2">
    <span className="text-pink-400  text-xl font-semibold tracking-wide">
      Landing<span className="text-blue-900">Forge</span>
    </span>
  </div>

  {/* Middle Section — Navigation Links */}
  <div className="hidden md:flex items-center space-x-6">
    <button className="text-gray-600 hover:text-pink-500 transition">
      Dashboard
    </button>
    <button className="text-gray-600 hover:text-pink-500 transition">
      My Pages
    </button>
    <button className="text-gray-600 hover:text-pink-500 transition">
      Templates
    </button>
    <button className="text-gray-600 hover:text-pink-500 transition">
      Analytics
    </button>
  </div>

  {/* Right Section — Actions */}
  <div className="flex items-center space-x-3">
    {/* Export Button (only visible in preview mode) */}
    {isPreview && (
      <button
        onClick={exportLandingPage}
        className="bg-pink-400  text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
      >
        Export
      </button>
    )}

    {/* Preview Toggle */}
    <button
      onClick={() => setIsPreview(!isPreview)}
      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
    >
      {isPreview ? "Exit Preview" : "Preview"}
    </button>

    {/* User Profile Dropdown (placeholder for now) */}
    <div className="relative">
      <Link 
       to="/profile"
      className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition">
        <img
          src="https://i.pravatar.cc/30"
          alt="User"
          className="w-6 h-6 rounded-full"
        />
        <span className="hidden md:inline text-sm text-gray-700">You</span>
      </Link>
    </div>
  </div>
      </nav>


    {/* builder */}
    <div className="min-h-screen flex bg-pink-100" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Sidebar */}
      <div
  style={{
    display: isPreview ? "none" : "block",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#f9a8d4 transparent",
  }}
  className={`fixed left-0 top-[70px] h-[calc(100vh-70px)] 
  bg-pink-50/80 backdrop-blur-lg border-r border-pink-100 
  p-6 shadow-md transform transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
>
  <h2 className="text-xl font-bold mb-6 text-blue-900">🎨 Blocks</h2>

  <div className="space-y-3">
    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("text")}
    >
      <Type className="w-5 h-5 text-gray-700" />
      Add Text
    </button>

    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("image")}
    >
      <ImageIcon className="w-5 h-5 text-gray-700" />
      Add Image
    </button>

    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("button")}
    >
      <MousePointerClick className="w-5 h-5 text-gray-700" />
      Add Button
    </button>

    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("form")}
    >
      <Type className="w-5 h-5 text-gray-700" />
      Add Form
    </button>
    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("hero")}
    >
      <Type className="w-5 h-5 text-gray-700" />
      Add Hero Section
    </button>
    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("aboutSection")}
    >
      <Type className="w-5 h-5 text-gray-700" />
      Add About Section
    </button>

    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("navbar")}
    >
      <Navigation className="w-5 h-5 text-gray-700" />
      Add Navbar
    </button>
    

    <button
      className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl transition-all shadow-sm"
      onClick={() => addBlock("footer")}
    >
      <LayoutTemplate className="w-5 h-5 text-gray-700" />
      Add Footer
    </button>
     {/* reset project btn */}
    <button
      onClick={() => {
        if (window.confirm("Clear your saved layout?")) {
          localStorage.clear();
          setBlocks([]);
          setBgColor("#ffffff");
          setNavBgColor("#f8f9fa");
        }
      }}
      className="w-full bg-blue-100 text-gray-800 p-3 rounded-xl mt-6 hover:bg-gray-300 transition"
    >
      🧹 Reset Project
    </button>
  </div>

  {/* Background Settings */}
  <div className="mt-6 space-y-6">
    <div>
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Body Background</h3>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        className="w-full h-10 border border-pink-200 rounded cursor-pointer bg-transparent"
      />
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Navbar Background</h3>
      <input
        type="color"
        value={navBgColor}
        onChange={(e) => setNavBgColor(e.target.value)}
        className="w-full h-10 border border-pink-200 rounded cursor-pointer bg-transparent"
      />
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Footer Background</h3>
      <input
        type="color"
        value={footerBG}
        onChange={(e) => setFooterBG(e.target.value)}
        className="w-full h-10 border border-pink-200 rounded cursor-pointer bg-transparent"
      />
    </div>
  </div>
      </div>

      
      {/* start building */}
      <div  className="flex-1 p-2" onMouseDown={handleCanvasMouseDown}>        
        {/* GLOBAL TOOLBAR  */}
        {selectedBlock && (
          <div
            className="toolbar  fixed top-3 left-[60%] -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-2 z-50"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* width  */}
            <div className="flex items-center flex-col">
              <input
                onPointerDown={(e) => e.stopPropagation()}
                type="number"
                value={selectedBlock.width}
                onChange={(e) => updateBlock(selectedBlock.id, "width", e.target.value === "" ? "" : Number(e.target.value))}
                className="border rounded p-1 w-15"
              />
              <label className="text-sm text-gray-700">Width</label>
            </div>
            {/* height */}
            <div className="flex items-center flex-col">
              <input
                onPointerDown={(e) => e.stopPropagation()}
                type="number"
                value={selectedBlock.height === "auto" ? "" : selectedBlock.height}
                onChange={(e) => updateBlock(selectedBlock.id, "height", e.target.value === "" ? "auto" : Number(e.target.value))}
                className="border rounded p-1 w-15"
              />
              <label className="text-sm text-gray-700">Height</label>
            </div>
            {selectedBlock.type === "text" && (
              <>
            <FontSelector
              selectedFont={selectedBlock?.fontFamily || "Inter"}
              onChange={(font) => updateBlock(selectedBlock.id, "fontFamily", font)}
            />
                {/* textcolor */}
                <input onPointerDown={(e) => e.stopPropagation()} type="color" value={selectedBlock.color} onChange={(e) => updateBlock(selectedBlock.id, "color", e.target.value)} />
                {/* fonstise */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Font</label>
                  <input
                    onPointerDown={(e) => e.stopPropagation()}
                    type="number"
                    min={1}
                    value={selectedBlock.fontSize || 16}
                    onChange={(e) => updateBlock(selectedBlock.id, "fontSize",Number(e.target.value))}
                    className="border rounded p-1 w-16"
                  />
                </div>
                <textarea onPointerDown={(e) => e.stopPropagation()} value={selectedBlock.content} onChange={(e) => updateBlock(selectedBlock.id, "content", e.target.value)} className="border rounded p-1" />
               {/* bold */}
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => updateBlock(selectedBlock.id, "bold", !selectedBlock.bold)}
                  className={`px-2 py-1 border rounded-lg transition-all duration-150 hover:bg-gray-100 ${
                    selectedBlock.bold ? "bg-gray-800 text-white" : "bg-white text-gray-700"
                  }`}
                >
                  <b>B</b>
                </button>
                {/* alignment */}
                <div className="flex items-center gap-2">
  <button
    onPointerDown={(e) => e.stopPropagation()}
    onClick={() => updateBlock(selectedBlock.id, "textAlign", "left")}
    className={`px-2 py-1 border rounded-md text-sm ${
      selectedBlock.textAlign === "left"
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    ⬅
  </button>

  <button
    onPointerDown={(e) => e.stopPropagation()}
    onClick={() => updateBlock(selectedBlock.id, "textAlign", "center")}
    className={`px-2 py-1 border rounded-md text-sm ${
      selectedBlock.textAlign === "center"
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    ⬍
  </button>

  <button
    onPointerDown={(e) => e.stopPropagation()}
    onClick={() => updateBlock(selectedBlock.id, "textAlign", "right")}
    className={`px-2 py-1 border rounded-md text-sm ${
      selectedBlock.textAlign === "right"
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    ➡
  </button>
                </div>

              </>
            )}
            {selectedBlock.type === "button" && (
              <>
                <input onPointerDown={(e) => e.stopPropagation()} type="color" value={selectedBlock.color} onChange={(e) => updateBlock(selectedBlock.id, "color", e.target.value)} />
                <input onPointerDown={(e) => e.stopPropagation()} type="text" value={selectedBlock.label} onChange={(e) => updateBlock(selectedBlock.id, "label", e.target.value)} className="border rounded p-1" />
              <FontSelector
              selectedFont={selectedBlock?.fontFamily || "Inter"}
              onChange={(font) => updateBlock(selectedBlock.id, "fontFamily", font)}
            />

              </>
              
            )}
            {selectedBlock.type === "image" && (
              <>
                <input
                  onPointerDown={(e) => e.stopPropagation()}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleImageUpload(selectedBlock.id, e.target.files[0]);
                  }}
                />
                <button onClick={() => updateBlock(selectedBlock.id, "src", null)} className="px-2 py-1 bg-gray-100 rounded">
                  Clear
                </button>
              </>
            )}
            {selectedBlock.type === "navbar" && (
  <>
    {/* links fontsize */}
    <div className="flex items-center flex-col">
      <input
        onPointerDown={(e) => e.stopPropagation()}
        type="number"
        min={1}
        value={selectedBlock.linksFontSize || 16}
        onChange={(e) => updateBlock(selectedBlock.id, "linksFontSize",Number(e.target.value))}
        className="border rounded p-1 w-16"
      />
      <label className="text-sm text-gray-700">links</label>

    </div>
    {/* ctafontsize */}
    <div className="flex items-center flex-col">
      <input
        onPointerDown={(e) => e.stopPropagation()}
        type="number"
        min={1}
        value={selectedBlock.ctaFontSize || 16}
        onChange={(e) => updateBlock(selectedBlock.id, "ctaFontSize",Number(e.target.value))}
        className="border rounded p-1 w-16"
      />
      <label className="text-sm text-gray-700">cta</label>
    </div>
    {/* logo fontsize */}
    <div className="flex items-center flex-col">
      <input
        onPointerDown={(e) => e.stopPropagation()}
        type="number"
        min={1}
        value={selectedBlock.logoFontSize || 16}
        onChange={(e) => updateBlock(selectedBlock.id, "logoFontSize",Number(e.target.value))}
        className="border rounded p-1 w-16"
      />
      <label className="text-sm text-gray-700">Logo</label>
    </div>
    {/* button background */}
    <div className="flex items-center flex-col">
      <input
        type="color"
        value={selectedBlock.ctaBgColor}
        onChange={(e) => updateBlock(selectedBlock.id, "ctaBgColor", e.target.value)}
      />
      <label className="text-sm text-gray-700">Btn BG</label>
    </div>
    {/* btn text color */}
    <div className="flex items-center flex-col">
      <input
        type="color"
        value={selectedBlock.ctaTextColor}
        onChange={(e) => updateBlock(selectedBlock.id, "ctaTextColor", e.target.value)}
      />
      <label className="text-sm text-gray-700">Btn Text</label>
    </div>
    {/* links color */}
    <div className="flex items-center flex-col">
      <input
        type="color"
        value={selectedBlock.linkColor}
        onChange={(e) => updateBlock(selectedBlock.id, "linkColor", e.target.value)}
      />
      <label className="text-sm text-gray-700">links</label>
    </div>
    {/* logo color */}
    <div className="flex items-center flex-col">
      <input
        type="color"
        value={selectedBlock.logoColor}
        onChange={(e) => updateBlock(selectedBlock.id, "logoColor", e.target.value)}
      />
      <label className="text-sm text-gray-700">logo</label>
    </div>

    {/* bold */}

    {/* logo */}
    <button
      onClick={() =>
         updateBlock(selectedBlock.id, "logoBold", !selectedBlock.logoBold
         )}
      className={`px-2 py-1 border rounded ${selectedBlock.logoBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <b>B</b> Logo
    </button>
    {/* btn */}
    <button
      onClick={() => updateBlock(selectedBlock.id, "ctaBold", !selectedBlock.ctaBold)}
      className={`px-2 py-1 border rounded ${selectedBlock.ctaBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <b>B</b> Button
    </button>
    {/* links */}
    <button
      onClick={() => updateBlock(selectedBlock.id, "linksBold", !selectedBlock.linksBold)}
      className={`px-2 py-1 border rounded ${selectedBlock.linksBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <b>B</b> Links
    </button>
  </>
            )}
            {selectedBlock.type === "footer" && (
            <>
    <div className="flex items-center gap-2">
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">FontSize</label>
      <input
        onPointerDown={(e) => e.stopPropagation()}
        type="number"
        min={1}
        value={selectedBlock.textFontSize || 16}
        onChange={(e) => updateBlock(selectedBlock.id, "textFontSize",Number(e.target.value))}
        className="border rounded p-1 w-16"
      />
      </div>
      <label className="text-sm text-gray-600">Color</label>
      <input
        type="color"
        value={selectedBlock.textColor}
        onChange={(e) => updateBlock(selectedBlock.id, "textColor", e.target.value)}
      />
    </div>
    <button
      onClick={() => updateBlock(selectedBlock.id, "textBold", !selectedBlock.textBold)}
      className={`px-2 py-1 border rounded ${selectedBlock.textBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <b>B</b> 
    </button>
  </>
            )}
            {selectedBlock?.type === "form" && (
              <>
    
              <div className="space-y-2">

              </div>
              {/* btnfontsize */}
                <div className="flex items-center flex-col">
      <input
        onPointerDown={(e) => e.stopPropagation()}
        type="number"
        min={1}
        value={selectedBlock.btnFontSize || 16}
        onChange={(e) => updateBlock(selectedBlock.id, "btnFontSize",Number(e.target.value))}
        className="border rounded p-1 w-16"
      />
      <label className="text-sm text-gray-700">cta</label>
                </div>
                
                {/* button background */}
                <div className="flex items-center flex-col">
      <input
        type="color"
        value={selectedBlock.buttonColor}
        onChange={(e) => updateBlock(selectedBlock.id, "buttonColor", e.target.value)}
      />
      <label className="text-sm text-gray-700">Btn BG</label>
                </div>
                 {/* btn text color */}
                <div className="flex items-center flex-col">
      <input
        type="color"
        value={selectedBlock.btnTextColor}
        onChange={(e) => updateBlock(selectedBlock.id, "btnTextColor", e.target.value)}
      />
      <label className="text-sm text-gray-700">Btn Text</label>
                </div>
                {/* bold toggle */}
                <button
      onClick={() =>
         updateBlock(selectedBlock.id, "Bold", !selectedBlock.Bold
         )}
      className={`px-2 py-1 border rounded ${selectedBlock.Bold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <b>B</b> 
                </button>
                {/* add field */}
                <button
      onClick={() =>
        updateBlock(selectedBlock.id, "fields", [
          ...selectedBlock.fields,
          { id: Date.now(), label: "New Field", type: "text", value: "" },
        ])
      }
      className="bg-gray-800 text-white px-2 py-2 rounded w-30"
    >
      + Add Field
                </button>
              </>
            )}
            {selectedBlock?.type === "hero" && (
              // bold
              <>
            <FontSelector
              selectedFont={selectedBlock?.fontFamily || "Inter"}
              onChange={(font) => updateBlock(selectedBlock.id, "fontFamily", font)}
            />
              <button
                onClick={() => updateBlock(selectedBlock.id, "titleBold", !selectedBlock.titleBold)}
                className={`px-2 py-1 border rounded ${selectedBlock.titleBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                <b>B</b> Title
              </button>
              <button
                onClick={() => updateBlock(selectedBlock.id, "subtitleBold", !selectedBlock.subtitleBold)}
                className={`px-2 py-1 border rounded ${selectedBlock.subtitleBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                <b>B</b> Subtitle
              </button>
              {/* text fontsize */}
               <div className="flex items-center flex-col">
                <input
                 onPointerDown={(e) => e.stopPropagation()}
                  type="number"
                  min={1}
                  value={selectedBlock.titleSize || 30}
                  onChange={(e) => updateBlock(selectedBlock.id, "titleSize",Number(e.target.value))}
                  className="border rounded p-1 w-16"
                />
                <label className="text-sm text-gray-700">Title</label>
              </div>
              <div className="flex items-center flex-col">
                <input
                 onPointerDown={(e) => e.stopPropagation()}
                  type="number"
                  min={1}
                  value={selectedBlock.subtitleSize || 16}
                  onChange={(e) => updateBlock(selectedBlock.id, "subtitleSize",Number(e.target.value))}
                  className="border rounded p-1 w-16"
                />
                <label className="text-sm text-gray-700">Subtitle</label>
              </div>
             </>
            )}
            

            <button onClick={() => duplicateBlock(selectedBlock.id)}
            className="px-2 py-1 border rounded-lg transition-all duration-150 hover:bg-gray-100"
            >
              D
            </button>
            {/* <button onClick={() => setSelectedBlockId(null)} className="px-3 py-1 bg-slate-100 rounded">
              Done
            </button> */}
            {/* delete a block */}
            <button
              onClick={() => deleteBlock(selectedBlock.id)}
              className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
              title="Delete block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

          </div>
        )}
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
  <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 px-3 py-2 rounded-xl shadow-sm transition-all duration-300">
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
          style={{
          transform: sidebarOpen && !isPreview ? "scale(0.7)" : "scale(1)" ,
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
          minHeight: `${canvasHeight}px` || "1200px",
          transition: "height 0.3s ease",          
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // footer sticks to bottom
          flexGrow: 1,
          }}
          id="page-canvas" 
          className={`canvas-area mt-1 mx-auto relative origin-top transition-transform duration-300 rounded-xl border border-gray-300 shadow-inner p-6 
          ${!isPreview ? "ml-29" : "ml-0"}`}>


            {/* NAVBAR (non-draggable, always on top) */}
            {navbarBlock && (
            <div
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBlockId(navbarBlock.id);
              }}
              style={{
                backgroundColor: navBgColor,
                height: navbarBlock.height || 64, // default height
                position: "relative",
                width: "100%",
              }}
              className={`mb-6 navbar-editable ${selectedBlockId === navbarBlock.id ? "ring-2 ring-blue-400" : ""}`}
            >
              <NavbarBlock
                block={navbarBlock}
                isEditing={selectedBlockId === navbarBlock.id}
                onSelect={() => setSelectedBlockId(navbarBlock.id)}
                onUpdate={(key, value) => updateBlock(navbarBlock.id, key, value)}
                onUploadLogo={(file) => handleLogoUpload(navbarBlock.id, file)}
              />

              {/* 🟦 Add resize handle only when selected */}
              {selectedBlockId === navbarBlock.id && (
                <div
                  onPointerDown={(e) => startResizingNavbar(e, navbarBlock.id)}
                  className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/40 cursor-row-resize"
               />
              )}
            </div>
            )}

            {blocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                x={block.x}
                y={block.y}
                isEditing={selectedBlockId === block.id}
                onStartResize={startResizing}
                onSelect={selectBlock}
              >
              
                {/* TEXT */}
                {block.type === "text" && (
  <div
    onClick={(e) => {
      e.stopPropagation();
      setSelectedBlockId(block.id);
    }}
    style={{
      fontFamily: block.fontFamily || "Inter, sans-serif",
      textAlign: block.textAlign,
      fontWeight: block.bold ? "bold" : "normal",
      fontSize: block.fontSize || 16,
      fontFamily: block.fontFamily || "Inter",
      color: block.color || "#000",
      width: typeof block.width === "number" ? block.width : block.width,
      height: block.height === "auto" ? "auto" : block.height,
      padding: 8,
      borderRadius: 8,
      boxSizing: "border-box",
      background:
        selectedBlockId === block.id
          ? "rgba(255,255,255,0.9)"
          : "transparent",
      outline:
        selectedBlockId === block.id
          ? "1.5px solid #f472b6"
          : "1px solid transparent",
      cursor: "text",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    }}
    suppressContentEditableWarning
    contentEditable={block.isEditing}
    onInput={(e) =>
      updateBlock(block.id, "content", e.currentTarget.textContent)
    }
    onDoubleClick={() => updateBlock(block.id, "isEditing", true)}
    onBlur={() => updateBlock(block.id, "isEditing", false)}
  >
    {block.content || "Click to edit text..."}
  </div>
                )}

                {/* IMAGE */}
                {block.type === "image" && (
                  <div onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }} className="relative inline-block" style={{ width: block.width, height: typeof block.height === "number" ? block.height : block.height }}>
                    {selectedBlockId === block.id && (
                      <>
                        {/* <button onPointerDown={(e) => e.stopPropagation()} onClick={() => deleteBlock(block.id)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7">✖</button> */}
                        <div onPointerDown={(e) => startResizing(e, block.id)} className="absolute w-3 h-3 bg-blue-500 rounded-full" style={{ right: -6, bottom: -6, cursor: "se-resize" }} />
                      </>
                    )}

                    {block.src ? (
                      <img onPointerDown={(e) => e.stopPropagation()} src={block.src} alt="uploaded" className="w-full h-full object-cover rounded" onClick={() => setSelectedBlockId(block.id)} style={{ display: "block" }} />
                    ) : (
                      <input onPointerDown={(e) => e.stopPropagation()} type="file" accept="image/*" onChange={(e) => handleImageUpload(block.id, e.target.files?.[0])} />
                    )}
                  </div>
                )}

                {/* BUTTON */}
                {block.type === "button" && (
                  <div onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }} className="relative inline-block" style={{ width: block.width, height: block.height === "auto" ? undefined : block.height }}>
                    {selectedBlockId === block.id && (
                      <>
                        {/* <button onPointerDown={(e) => e.stopPropagation()} onClick={() => deleteBlock(block.id)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7">✖</button> */}
                        <div onPointerDown={(e) => startResizing(e, block.id)} className="absolute bottom-0 right-0 w-3 h-3 bg-blue-800 rounded-full" style={{ transform: "translate(50%,50%)", cursor: "se-resize" }} />
                      </>
                    )}
                    <button 
                     onPointerDown={(e) => e.stopPropagation()} 
                     style={{
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
    setSelectedBlockId(block.id);
  }}
>
  <FormBlock
    {...block}
    selected={selectedBlockId === block.id}
    style={{
      background: block.bgColor,
      color: block.color,
      Bold : block.Bold ,
      buttonColor: block.buttonColor,
      btnTextColor: block.btnTextColor,
      btnFontSize: block.btnFontSize,
      width: block.width,
      height: block.height,
    }}
    onChange={updateBlock}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBlockId(block.id);
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
                  setSelectedBlockId(block.id);
                  }}
                    

                  
                    style={{
                      // background: block.bgColor,
                      // color: block.color,
                      width: block.width,
                      height: block.height,
                    }}
                  >
                    <HeroBlock
                      {...block}
                      selected={selectedBlockId === block.id}
                      onChange={updateBlock}
                      titleBold = {block.titleBold}
                      titleSize = {block.titleSize}
                      subtitleBold = {block.subtitleBold}
                      subtitleSize = {block.subtitleSize}
                      fontFamily = {block.fontFamily}

                      style={{
                      // background: block.bgColor,
                      // color: block.color,
                      position: "relative",
                      width: block.width,
                      height: block.height,
                      fontFamily: block.fontFamily || localStorage.getItem("selectedFont") || "Inter",

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
                  setSelectedBlockId(block.id);
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
                      selected={selectedBlockId === block.id}
                      // onChange={updateBlock}
                      // titleBold = {block.titleBold}
                      // titleSize = {block.titleSize}
                      // subtitleBold = {block.subtitleBold}
                      // subtitleSize = {block.subtitleSize}
                      // fontFamily = {block.fontFamily}

                      style={{
                      // background: block.bgColor,
                      // color: block.color,
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

            
            {/* FOOTER — static, always bottom */}
            {blocks
              .filter((b) => b.type === "footer")
              .map((block) => (
                <footer
                  key={block.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBlockId(block.id);
                  }}
                  style={{
                    position: "relative",
                    bottom: 0,
                    width: "100%",
                    background:footerBG,
                    borderTop: "1px solid #f9a8d4",
                    textAlign: "center",
                    padding: "1rem",
                  }}
                  className={`rounded-t-lg shadow-inner ${
                    selectedBlockId === block.id ? "ring-2 ring-pink-400" : ""
                  }`}
                >
                  <textarea
                    style={{
                      color : block.textColor  || "#020202ff",
                      fontSize : block.textFontSize || 16,
                      fontWeight : block.textBold ? "bold" : "normal",
                    }}
                    value={block.content}
                    onChange={(e) =>
                      updateBlock(block.id, "content", e.target.value)
                    }
                    className="w-full text-center bg-transparent outline-none resize-none font-medium text-gray-700"
                  />
                </footer>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
    </>
  );
}

