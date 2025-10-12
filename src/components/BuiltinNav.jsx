import React, { useRef } from "react";

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

  const triggerLogoFile = () => fileRef.current && fileRef.current.click();

  return (
    <div className="relative">
      {/* === NAVBAR === */}
      <header
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect();
        }}
        className={`w-full top-0 z-40 transition-all duration-200 ${
          isEditing ? "ring-2 ring-blue-400 rounded-md" : ""
        }`}
      >
        <div
          className="max-w-[1000px] mx-auto px-6 flex items-center justify-between"
          style={{ height }}
        >
          {/* LOGO */}
          <div className="flex items-center gap-3"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="logo"
                className="h-8 w-auto object-contain"
              />
            ) : (
              <div className="text-lg font-semibold select-none"
               style={{
                color: block.logoColor,
                fontSize: block.logoFontSize,
                fontWeight: block.logoBold ? "bold" : "normal",
            }}
              >
                {logoText}
              </div>
            )}
          </div>

          {/* LINKS */}
          <nav className="flex gap-6 items-center">
            {links.map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-sm text-gray-700 hover:underline"
                  style={{
    color: block.linkColor,
    fontSize: block.linkFontSize,
  }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA */}
          {showCTA && (
            <button className="px-4 py-2 rounded bg-blue-600 text-white text-sm"
             style={{
    backgroundColor: block.ctaBgColor,
    color: block.ctaTextColor,
    fontWeight: block.ctaBold ? "bold" : "normal",
    fontSize: block.ctaFontSize,
  }}
  >
              {ctaLabel}
            </button>
          )}
        </div>
      </header>

      {/* === EDITING TOOLBAR === */}
      {isEditing && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[90%] bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {/* Logo */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-600">Logo Text</label>
              <input
                onClick={(e) => e.stopPropagation()}
                className="border rounded px-2 py-1"
                value={logoText}
                onChange={(e) => onUpdate("logoText", e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerLogoFile();
                }}
                className="border rounded px-2 py-1 bg-gray-100"
              >
                Change Logo
              </button>
              <input
                ref={fileRef}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onUploadLogo(f);
                }}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
              />
            </div>

            {/* Links */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-600">Navigation Links</label>
              {links.map((link, i) => (
                <div key={i} className="flex items-center gap-1">
                  <input
                    onClick={(e) => e.stopPropagation()}
                    value={link}
                    onChange={(e) => {
                      const next = [...links];
                      next[i] = e.target.value;
                      onUpdate("links", next);
                    }}
                    className="border rounded px-2 py-1 w-full"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = links.filter((_, idx) => idx !== i);
                      onUpdate("links", next);
                    }}
                    className="px-1 py-0.5 bg-red-100 text-red-600 rounded"
                  >
                    ✕
                  </button>
                </div>
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
              <label className="font-medium text-gray-600">CTA Button</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!showCTA}
                  onChange={(e) => onUpdate("showCTA", e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span>Show CTA</span>
              </label>
              {showCTA && (
                <input
                  onClick={(e) => e.stopPropagation()}
                  value={ctaLabel}
                  onChange={(e) => onUpdate("ctaLabel", e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Button text"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

