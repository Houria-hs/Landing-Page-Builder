import React, { useState, useEffect } from "react";
import WebFont from "webfontloader";


const FontSelector = ({ selectedFont, onChange }) => {
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFonts = localStorage.getItem("textfonts");
    const savedSelectedFont = localStorage.getItem("selectedFont");

    if (savedFonts) {
      setFonts(JSON.parse(savedFonts));
      setLoading(false);
    } else {
      fetch("http://localhost:5000/api/fonts")
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setFonts(data.items);
            localStorage.setItem("textfonts", JSON.stringify(data.items));
            
          
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching fonts:", err);
          setLoading(false);
        });
    }

    // restore previously selected font if available
    if (savedSelectedFont) {
      onChange(savedSelectedFont);
    }
  }, []);

  // When the selected font changes, load it and store it
  useEffect(() => {
    if (selectedFont) {
      WebFont.load({
        google: { families: [selectedFont] },
      });
      localStorage.setItem("selectedFont", selectedFont);
    }
  }, [selectedFont]);

  if (loading) return <p className="text-gray-500 text-sm">Loading fonts...</p>;

  return (
    <div className="flex flex-col space-y-1">
      <select
        value={selectedFont}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-1 text-sm"
      >
        {fonts.map((font) => (
          <option key={font.family} value={font.family}>
            {font.family}
          </option>
        ))}
      </select>
      <label className="text-sm text-gray-600">Font Family</label>

    </div>
  );
};

export default FontSelector