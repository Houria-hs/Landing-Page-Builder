import React from 'react'
import FontSelector from './FontSelector';
const GlobalToolbar = ({
  isPreview,
  selectedBlock,
  updateBlock,
  handleImageUpload,
  duplicateBlock,
  deleteBlock,

}) => {

     if (isPreview || !selectedBlock) return null;
  return (
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
              {/* fonstise */}
                <div className=" text-center gap-2">
                  <input
                    onPointerDown={(e) => e.stopPropagation()}
                    type="number"
                    min={1}
                    value={selectedBlock.fontSize || 16}
                    onChange={(e) => updateBlock(selectedBlock.id, "fontSize",Number(e.target.value))}
                    className="border rounded p-1 w-16"
                  />
                  <label className="text-sm text-gray-600">FontSize</label>

                </div>
              <FontSelector
              selectedFont={selectedBlock?.fontFamily || "Inter"}
              onChange={(font) => updateBlock(selectedBlock.id, "fontFamily", font)}
            />
            
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
                <input onPointerDown={(e) => e.stopPropagation()} type="color" value={selectedBlock.color} onChange={(e) => updateBlock(selectedBlock.id, "color", e.target.value)} />
                <input onPointerDown={(e) => e.stopPropagation()} type="text" value={selectedBlock.label} onChange={(e) => updateBlock(selectedBlock.id, "label", e.target.value)} className="border rounded p-1" />
              </>
              
            )}
            {selectedBlock.type === "image" && (
              <>
                {/* <input
                  onPointerDown={(e) => e.stopPropagation()}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleImageUpload(selectedBlock.id, e.target.files[0]);
                  }}
                /> */}
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
        style={{width: "4rem" , height:"2.5rem"}}
        onChange={(e) => updateBlock(selectedBlock.id, "buttonColor", e.target.value)}
      />
      <label className="text-sm text-gray-700">Btn BG</label>
                </div>
                 {/* btn text color */}
                <div className="flex items-center flex-col">
      <input
        type="color"
        style={{width: "4rem" , height:"2.5rem"}}
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
              <button
                onClick={() => updateBlock(selectedBlock.id, "buttonBold", !selectedBlock.buttonBold)}
                className={`px-2 py-1 border rounded ${selectedBlock.buttonBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                <b>B</b> Btn
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
              <div className="flex items-center flex-col">
                <input
                 onPointerDown={(e) => e.stopPropagation()}
                  type="number"
                  min={1}
                  value={selectedBlock.buttonTextSize || 16}
                  onChange={(e) => updateBlock(selectedBlock.id, "buttonTextSize",Number(e.target.value))}
                  className="border rounded p-1 w-16"
                />
                <label className="text-sm text-gray-700">Button</label>
              </div>
             </>
            )}
            {selectedBlock?.type === "portfolio" && (
              // bold
              <>
            <FontSelector
              selectedFont={selectedBlock?.fontFamily || "serif"}
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
              <button
                onClick={() => updateBlock(selectedBlock.id, "buttonBold", !selectedBlock.buttonBold)}
                className={`px-2 py-1 border rounded ${selectedBlock.buttonBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                <b>B</b> Btn
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
              <div className="flex items-center flex-col">
                <input
                 onPointerDown={(e) => e.stopPropagation()}
                  type="number"
                  min={1}
                  value={selectedBlock.buttonTextSize || 16}
                  onChange={(e) => updateBlock(selectedBlock.id, "buttonTextSize",Number(e.target.value))}
                  className="border rounded p-1 w-16"
                />
                <label className="text-sm text-gray-700">Button</label>
              </div>
             </>
            )}
            {selectedBlock?.type === "aboutSection" && (
              // bold
              <>
            <FontSelector
              selectedFont={selectedBlock?.fontFamily || "serif"}
              onChange={(font) => updateBlock(selectedBlock.id, "fontFamily", font)}
            />
              <button
                onClick={() => updateBlock(selectedBlock.id, "titleBold", !selectedBlock.titleBold)}
                className={`px-2 py-1 border rounded ${selectedBlock.titleBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                <b>B</b> Title
              </button>
              <button
                onClick={() => updateBlock(selectedBlock.id, "descriptionBold", !selectedBlock.descriptionBold)}
                className={`px-2 py-1 border rounded ${selectedBlock.descriptionBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                <b>B</b> Subtitle
              </button>
              <button
                onClick={() => updateBlock(selectedBlock.id, "buttonBold", !selectedBlock.buttonBold)}
                className={`px-2 py-1 border rounded ${selectedBlock.buttonBold ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                <b>B</b> Btn
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
                  value={selectedBlock.descriptionSize || 16}
                  onChange={(e) => updateBlock(selectedBlock.id, "descriptionSize",Number(e.target.value))}
                  className="border rounded p-1 w-16"
                />
                <label className="text-sm text-gray-700">Subtitle</label>
              </div>
              <div className="flex items-center flex-col">
                <input
                 onPointerDown={(e) => e.stopPropagation()}
                  type="number"
                  min={1}
                  value={selectedBlock.buttonTextSize || 16}
                  onChange={(e) => updateBlock(selectedBlock.id, "buttonTextSize",Number(e.target.value))}
                  className="border rounded p-1 w-16"
                />
                <label className="text-sm text-gray-700">Button</label>
              </div>
             </>
            )}
            {/* duplicate a block */}
            <button onClick={() => duplicateBlock(selectedBlock.id)}
            className="px-2 py-1 border rounded-lg transition-all duration-150 hover:bg-gray-100"
            >
              D
            </button>
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
  )
}

export default GlobalToolbar