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


  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);


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
      linkColor: "#333333",
      linkFontSize: 16,
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

  setBlocks((prev) => [...prev, newBlock]);
  setSelectedBlockId(id);
};

  // Auto-expand canvas height based on block positions
  useEffect(() => {
    if (blocks.length === 0) return;
    const maxY = Math.max(...blocks.map((b) => b.y + (b.height || 100)), 800);
    setCanvasHeight(maxY + 200);
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

  // Canvas mouse down: deselect unless click inside toolbar (toolbar stops propagation anyway)
  const handleCanvasMouseDown = (e) => {
    // If user clicked inside toolbar, toolbar's onMouseDown already stopPropagation,
    // but keep this robust: if nearest toolbar found, do nothing
    if (e.target.closest(".toolbar")) return;
    if (e.target.closest(".navbar-editable")) return; 
    setSelectedBlockId(null);
  };

  const navbarBlock = blocks.find(b => b.type === "navbar");

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Sidebar */}
 <div className="w-64 h-screen sticky top-0 bg-pink-50/80 backdrop-blur-lg border-r border-pink-100 p-6">
  <h2 className="text-xl font-bold mb-6 text-gray-800">🎨 Blocks</h2>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock('text')}
  >
    <Type className="w-5 h-5 text-gray-700" />
    Add Text
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock('image')}
  >
    <ImageIcon className="w-5 h-5 text-gray-700" />
    Add Image
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock('button')}
  >
    <MousePointerClick className="w-5 h-5 text-gray-700" />
    Add Button
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock('navbar')}
  >
    <Navigation className="w-5 h-5 text-gray-700" />
    Add Navbar
  </button>

  <button
    className="w-full flex items-center gap-3 bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium p-3 rounded-xl mb-3 transition-all shadow-sm"
    onClick={() => addBlock('footer')}
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
  className="w-full bg-gray-200 text-gray-800 p-3 rounded-xl mt-6 hover:bg-gray-300 transition"
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
</div>

      {/* Canvas */}
      <div className="flex-1 bg-gray-50 p-8" onMouseDown={handleCanvasMouseDown}>
        <h3 className="text-3xl font-extrabold text-gray-700 mb-6 text-center">Start building below</h3>
        {/* GLOBAL TOOLBAR  */}
        {selectedBlock && (
          <div
            className="toolbar fixed top-21 left-[60%] -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-4 z-50"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* delete a block */}
            <button onClick={() => deleteBlock(selectedBlock.id)} className="text-red-500 font-bold">
              ✖ Delete
            </button>
            {/* width  */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">W</label>
              <input
                onPointerDown={(e) => e.stopPropagation()}
                type="number"
                value={selectedBlock.width}
                onChange={(e) => updateBlock(selectedBlock.id, "width", e.target.value === "" ? "" : Number(e.target.value))}
                className="border rounded p-1 w-20"
              />
            </div>
            {/* height */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">H</label>
              <input
                onPointerDown={(e) => e.stopPropagation()}
                type="number"
                value={selectedBlock.height === "auto" ? "" : selectedBlock.height}
                onChange={(e) => updateBlock(selectedBlock.id, "height", e.target.value === "" ? "auto" : Number(e.target.value))}
                className="border rounded p-1 w-20"
              />
            </div>

            {/* type-specific controls */}
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
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Logo Color</label>
      <input
        type="color"
        value={selectedBlock.logoColor}
        onChange={(e) => updateBlock(selectedBlock.id, "logoColor", e.target.value)}
      />
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Links Color</label>
      <input
        type="color"
        value={selectedBlock.linkColor}
        onChange={(e) => updateBlock(selectedBlock.id, "linkColor", e.target.value)}
      />
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Button BG</label>
      <input
        type="color"
        value={selectedBlock.ctaBgColor}
        onChange={(e) => updateBlock(selectedBlock.id, "ctaBgColor", e.target.value)}
      />
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Button Text</label>
      <input
        type="color"
        value={selectedBlock.ctaTextColor}
        onChange={(e) => updateBlock(selectedBlock.id, "ctaTextColor", e.target.value)}
      />
    </div>

    <button
      onClick={() => updateBlock(selectedBlock.id, "logoBold", !selectedBlock.logoBold)}
      className={`px-2 py-1 border rounded ${selectedBlock.logoBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <b>B</b> Logo
    </button>

    <button
      onClick={() => updateBlock(selectedBlock.id, "ctaBold", !selectedBlock.ctaBold)}
      className={`px-2 py-1 border rounded ${selectedBlock.ctaBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <b>B</b> Button
    </button>
  </>
            )}


            <button onClick={() => setSelectedBlockId(null)} className="px-3 py-1 bg-slate-100 rounded">
              Done
            </button>
          </div>
        )}
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div style={{
          backgroundColor: bgColor || "#fff",
          minHeight: `${canvasHeight}px`,
        }}
          className="canvas-area w-[90%] mx-auto relative overflow-hidden rounded-xl border border-gray-300 shadow-inner p-6 transition-all duration-300">
            {/* NAVBAR (non-draggable, always on top) */}
            {navbarBlock && (
  <div
  onMouseDown={(e) => e.stopPropagation()}
    onClick={(e) => {
      e.stopPropagation();
      setSelectedBlockId(navbarBlock.id);
    }}
    style={{ backgroundColor: navBgColor }}
    className={`relative mb-6 navbar-editable ${selectedBlockId === navbarBlock.id ? "ring-2 ring-blue-400" : ""}`}
  >
    <NavbarBlock
      block={navbarBlock}
      isEditing={selectedBlockId === navbarBlock.id}
      onSelect={() => setSelectedBlockId(navbarBlock.id)}
      onUpdate={(key, value) => updateBlock(navbarBlock.id, key, value)}
      onUploadLogo={(file) => handleLogoUpload(navbarBlock.id, file)}
    />
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
                      width: typeof block.width === "number" ? block.width : block.width,
                      height: block.height === "auto" ? "auto" : block.height,
                      fontSize: block.fontSize || 16,
                      color: block.color || "#000",
                      padding: 8,
                      borderRadius: 8,
                      boxSizing: "border-box",
                      background: selectedBlockId === block.id ? "rgba(255,255,255,0.9)" : "transparent",
                    }}
                  >
                    {block.isEditing ? (
                      <div className="relative">
                        <button onPointerDown={(e) => e.stopPropagation()} onClick={() => deleteBlock(block.id)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7">
                          ✖
                        </button>

                        <textarea
                          onPointerDown={(e) => e.stopPropagation()}
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                          style={{ width: "100%", height: block.height === "auto" ? 100 : block.height }}
                          className="p-2 border rounded"
                        />

                        <div className="flex gap-2 mt-2 items-center">
                          <input onPointerDown={(e) => e.stopPropagation()} type="color" value={block.color} onChange={(e) => updateBlock(block.id, "color", e.target.value)} />
                          <button onPointerDown={(e) => e.stopPropagation()} onClick={() => updateBlock(block.id, "isEditing", false)} className="px-3 py-1 bg-blue-500 text-white rounded">
                            Done
                          </button>
                        </div>

                        {/* resize handle */}
                        <div onPointerDown={(e) => startResizing(e, block.id)} className="absolute w-3 h-3 bg-blue-500 rounded-full" style={{ right: -8, bottom: -8, cursor: "se-resize" }} />
                      </div>
                    ) : (
                      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", maxWidth: block.width }}>{block.content}</div>
                    )}
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
          </div>
        </DndContext>
      </div>
    </div>
  );
}

