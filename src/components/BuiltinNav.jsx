import React, { useRef } from "react";
import { Image, Type, Trash } from "lucide-react"; // add nice icons

export default function NavbarBlock({
  block = {},
  isEditing = false,
  onUpdate = () => {},
  onUploadLogo = () => {},
  onSelect = () => {},
}) {
  const fileRef = useRef(null);

  const {
    logoText = "Brand",
    logoSrc = null,
    links = ["Home", "About", "Contact"],
    showCTA = true,
    ctaLabel = "Sign up",
    height = 64,
  } = block || {};

  const triggerLogoFile = () => fileRef.current?.click();

  return (
    <div className="relative">
      {/* === NAVBAR === */}
      <header
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect();
        }}
        className={`w-full top-0 z-40 transition-all duration-200 ${
          isEditing ? "ring-2 ring-pink-400 rounded-md" : ""
        }`}
      >
        <div
          className="max-w-[1000px] mx-auto px-6 flex items-center justify-between"
          style={{ height }}
        >
          {/* LOGO */}
          <div className="flex items-center gap-3">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="logo"
                className="h-10 w-auto object-contain rounded"
              />
            ) : (
              <span
                className="text-xl font-semibold select-none"
                style={{
                  color: block.logoColor || "#333",
                  fontSize: block.logoFontSize || "20px",
                  fontWeight: block.logoBold ? "bold" : "normal",
                }}
              >
                {logoText}
              </span>
            )}
          </div>

          {/* LINKS */}
          <nav className="flex gap-6 items-center">
            {links.map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: block.linkColor || "#333",
                  fontSize: block.linksFontSize || "14px",
                  fontWeight: block.linksBold ? "bold" : "normal",
                }}
                className="hover:underline"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA */}
          {showCTA && (
            <button
              className="px-4 py-2 rounded text-sm transition"
              style={{
                backgroundColor: block.ctaBgColor || "#2563eb",
                color: block.ctaTextColor || "#fff",
                fontWeight: block.ctaBold ? "bold" : "normal",
                fontSize: block.ctaFontSize || "14px",
                
              }}
            >
              {ctaLabel}
            </button>
          )}
        </div>
      </header>

      {/* === EDIT TOOLBAR === */}
      {isEditing && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[90%] bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-50">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {/* Logo Options */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700 flex items-center gap-1">
                <Type size={14} /> Logo
              </label>
              {!logoSrc ? (
                <>
                  <input
                    className="border rounded px-2 py-1"
                    value={logoText}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onUpdate("logoText", e.target.value)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerLogoFile();
                    }}
                    className="flex items-center gap-2 justify-center text-gray-600 border rounded px-2 py-1 hover:bg-gray-100"
                  >
                    <Image size={14} /> Upload Logo
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onUploadLogo(file);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate("logoSrc", null);
                    }}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700"
                  >
                    <Trash size={14} /> Remove Logo
                  </button>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Navigation</label>
              {links.map((link, i) => (
                <input
                  key={i}
                  value={link}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const next = [...links];
                    next[i] = e.target.value;
                    onUpdate("links", next);
                  }}
                  className="border rounded px-2 py-1"
                />
              ))}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate("links", [...links, "New link"]);
                }}
                className="text-xs mt-1 border rounded px-2 py-1 bg-gray-50 hover:bg-gray-100"
              >
                + Add Link
              </button>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">CTA Button</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showCTA}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onUpdate("showCTA", e.target.checked)}
                />
                <span>Show CTA</span>
              </label>
              {showCTA && (
                <input
                  value={ctaLabel}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onUpdate("ctaLabel", e.target.value)}
                  className="border rounded px-2 py-1"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


