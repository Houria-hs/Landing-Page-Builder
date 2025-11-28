import { motion, AnimatePresence } from "framer-motion";
import { Type, Image as ImageIcon, MousePointerClick, LayoutTemplate, Navigation, FileText, Image, User, Briefcase } from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  isPreview,
  addBlock,
  bgColor,
  navBgColor,
  footerBG,
  setBlocks,
  setBgColor,
  setNavBgColor,
  setFooterBG,
}) {
  const [showSections, setShowSections] = useState(false);

  const sections = [
    { label: "Hero Section", icon: <Image />, type: "hero" },
    { label: "About Section", icon: <User />, type: "aboutSection" },
    { label: "Portfolio Section", icon: <Briefcase />, type: "portfolio" },
    { label: "Navbar", icon: <Navigation />, type: "navbar" },
    { label: "Footer", icon: <LayoutTemplate />, type: "footer" },
  ];

  const basicBlocks = [
    { label: "Text", icon: <Type />, type: "text" },
    { label: "Image", icon: <ImageIcon />, type: "image" },
    { label: "Button", icon: <MousePointerClick />, type: "button" },
    { label: "Form", icon: <FileText />, type: "form" },
  ];

  return (
    <AnimatePresence>
      {!isPreview && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className=" sidebar fixed left-0 top-[80px] h-[calc(100vh-70px)] 
          w-64 bg-pink-50/80 backdrop-blur-lg border-r border-pink-100 
          p-6 shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300/50"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold mb-6 text-blue-900 tracking-wide"
          >
            🎨 Blocks
          </motion.h2>

          <div className="space-y-3">
            {/* Basic Blocks */}
            {basicBlocks.map((item, index) => (
              <motion.button
                key={item.type}
                onClick={() => addBlock(item.type)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="w-full flex items-center gap-3 bg-pink-200/80 hover:bg-pink-300/90 text-gray-800 
                font-medium p-3 rounded-xl transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}

            {/* Add Section Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSections(!showSections)}
                className="w-full flex items-center justify-between bg-pink-400/80 hover:bg-pink-500/90 text-white 
                  font-medium p-3 rounded-xl transition-all shadow-sm"
              >
                Add Section
                <span>{showSections ? "▲" : "▼"}</span>
              </button>

              <AnimatePresence>
                {showSections && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 space-y-2"
                  >
                    {sections.map((sec) => (
                      <button
                        key={sec.type}
                        onClick={() => {
                          addBlock(sec.type);
                          setShowSections(false);
                        }}
                        className="w-full flex items-center gap-3 bg-pink-200/80 hover:bg-pink-300/90 text-gray-800 
                          font-medium p-2 rounded-lg transition-all"
                      >
                        {sec.icon}
                        <span>{sec.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🧹 Reset project */}
            <motion.button
              onClick={() => {
                if (window.confirm("Clear your saved layout?")) {
                  localStorage.clear();
                  setBlocks([]);
                }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-100 text-gray-800 p-3 rounded-xl mt-6 hover:bg-blue-200 transition"
            >
              🧹 Reset Project
            </motion.button>
          </div>

          {/* 🎨 Background settings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 space-y-6 border-t border-pink-200 pt-4"
          >
            {[ 
              { label: "Body Background", value: bgColor, setValue: setBgColor },
              { label: "Navbar Background", value: navBgColor, setValue: setNavBgColor },
              { label: "Footer Background", value: footerBG, setValue: setFooterBG },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  {item.label}
                </h3>
                <input
                  type="color"
                  value={item.value}
                  onChange={(e) => item.setValue(e.target.value)}
                  className="w-full h-10 border border-pink-200 rounded cursor-pointer bg-transparent"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
