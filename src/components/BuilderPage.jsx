import React, { useState , useEffect} from "react";
import DraggableBlock from "./dragg";
import NavbarBlock from "./BuiltinNav";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { Type, Image as ImageIcon, MousePointerClick, Navigation, LayoutTemplate } from "lucide-react";

export default function Builder() {

  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem("builderBlocks");
    return saved ? JSON.parse(saved) : [];
  });
  const [canvasHeight, setCanvasHeight] = useState(800);

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

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));


  // saving the block to local storage 
  useEffect(() => {
  localStorage.setItem("builderBlocks", JSON.stringify(blocks));
  }, [blocks]);
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

  //  If it's a navbar, handle it first and return
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
  // footer
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

  // build a clean HTML document
  const fullHtml = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Exported Landing Page</title>

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
     {/* navbar */}
    <div className="flex items-center justify-between p-4 bg-pink-50 sticky top-0 z-50">

        <button
          style={{
            display : !isPreview ? "none" : "block" ,
          }}
          onClick={() => { exportLandingPage(); }}
          className="bg-pink-400  text-white px-4 py-2 rounded-md hover:bg-pink-500 transition"
        >
          Export Page
        </button>
         <button
          onClick={() => setIsPreview(!isPreview)}
          className=" ml-auto bg-pink-400 text-white  px-4 py-2 rounded-md hover:bg-pink-500 transition"
        >
          {isPreview ? "Exit Preview" : "Preview"}
        </button>
    </div>
    {/* builder */}
    <div className="min-h-screen flex bg-pink-100" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
    {/* sidebar toggle btn */}
    <button
  style={{
    display: isPreview ? "none" : "block",
  }}
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className={`fixed top-10 -translate-y-1/2 left-3 z-50 bg-pink-400 text-white 
              p-2 rounded-full shadow-md hover:bg-pink-500 transition-all duration-300
              ${sidebarOpen ? "translate-x-[15rem]" : "translate-x-0"}`}
  title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
>
  {sidebarOpen ? "⟨" : "⟩"}
    </button>
    {/* Sidebar */}
    <div
    style={{
      display : isPreview ? "none" : "block" ,
      overflowY : "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#f9a8d4 transparent " ,

    }}
  className={`fixed top-0 left-0  h-screen bg-pink-50/80  backdrop-blur-lg border-r border-pink-100 p-6 shadow-md transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } w-62 pt-[70px]`}
>  
  <h2 className="text-xl font-bold mb-6 text-blue-900">🎨 Blocks</h2>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock("text")}
  >
    <Type className="w-5 h-5 text-gray-700" />
    Add Text
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock("image")}
  >
    <ImageIcon className="w-5 h-5 text-gray-700" />
    Add Image
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock("button")}
  >
    <MousePointerClick className="w-5 h-5 text-gray-700" />
    Add Button
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock("navbar")}
  >
    <Navigation className="w-5 h-5 text-gray-700" />
    Add Navbar
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock("footer")}
  >
    <LayoutTemplate className="w-5 h-5 text-gray-700" />
    Add Footer
  </button>

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

  <div className="mt-6">
    <h3 className="text-sm font-semibold text-gray-600 mb-2">Background</h3>
    <input
      type="color"
      value={bgColor}
      onChange={(e) => setBgColor(e.target.value)}
      className="w-full h-10 border border-pink-200 rounded cursor-pointer bg-transparent"
    />
  </div>

  <div className="mt-6">
    <h3 className="text-sm font-semibold text-gray-600 mb-2">Navbar Background</h3>
    <input
      type="color"
      value={navBgColor}
      onChange={(e) => setNavBgColor(e.target.value)}
      className="w-full h-10 border border-pink-200 rounded cursor-pointer bg-transparent"
    />
  </div>
    <div className="mt-6">
    <h3 className="text-sm font-semibold text-gray-600 mb-2">Footer Background</h3>
    <input
      type="color"
      value={footerBG}
      onChange={(e) => setFooterBG(e.target.value)}
      className="w-full h-10 border border-pink-200 rounded cursor-pointer bg-transparent"
    />
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
                <input onPointerDown={(e) => e.stopPropagation()} type="color" value={selectedBlock.color} onChange={(e) => updateBlock(selectedBlock.id, "color", e.target.value)} />
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
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => updateBlock(selectedBlock.id, "bold", !selectedBlock.bold)}
                  className={`px-2 py-1 border rounded-lg transition-all duration-150 hover:bg-gray-100 ${
                    selectedBlock.bold ? "bg-gray-800 text-white" : "bg-white text-gray-700"
                  }`}
                >
                  <b>B</b>
                </button>
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
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div 
          style={{
          transform: sidebarOpen && !isPreview ? "scale(0.7)" : "scale(1)" ,
          transformOrigin: "top center",
          width : "100%",
          overflow: "visible" ,
          backgroundColor: bgColor || "#fff",
          height :"1900px",
          // minHeight: `${canvasHeight}px` || "1200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // footer sticks to bottom
          flexGrow: 1,
          }}
          id="page-canvas" 
          className={`canvas-area mx-auto relative origin-top transition-transform duration-300 rounded-xl border border-gray-300 shadow-inner p-6 
          ${sidebarOpen && !isPreview ? "ml-31" : "ml-0"}`}>


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
      textAlign: block.textAlign,
      fontWeight: block.bold ? "bold" : "normal",
      fontSize: block.fontSize || 16,
      fontFamily: block.fontFamily || "Inter, sans-serif",
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
                    <button onPointerDown={(e) => e.stopPropagation()} style={{ backgroundColor: block.color || "#06276eff" }} className="w-full h-full text-white font-semibold rounded shadow-md">{block.label}</button>
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

