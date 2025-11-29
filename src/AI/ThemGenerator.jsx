import React, { useState, useCallback } from 'react';

const RENDER_BACKEND_URL = 'https://landing-page-builder-backend.onrender.com';
// calls secure backend on Render
const fetchThemeData = async (themeKeyword) => {
  if (RENDER_BACKEND_URL === '') {
     console.error("Please update RENDER_BACKEND_URL in ThemeGenerator.jsx with your actual URL.");
     throw new Error("API URL not configured. Cannot connect to backend.");
  }

  // Set up the POST request options
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Send the keyword to the Render server
    body: JSON.stringify({ keyword: themeKeyword }),
  };

  try {
    // The request goes to your Render server, which then securely calls Gemini
    const response = await fetch(`${RENDER_BACKEND_URL}/generate-theme`, options);
    
    if (!response.ok) {
        // Handle server errors (e.g., 500 from Express)
        const errorBody = await response.json();
        throw new Error(`Theme generation failed: ${errorBody.error || 'Unknown server error from backend.'}`);
    }

    // The Render server returns the final parsed JSON palette
    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error fetching theme from Render Backend:", error);
    return null;
  }
};


// --- Component Definitions ---

const ColorCard = ({ role, hex }) => {
  // Simple check to determine if text should be light or dark for readability
  const isLight = hex && parseInt(hex.slice(1), 16) > 0xffffff / 2;
  const textColor = isLight ? 'text-gray-900' : 'text-gray-100';

  // Custom clipboard copy function
  const copyToClipboard = () => {
    // Standard secure way to copy text to clipboard using document.execCommand
    const el = document.createElement('textarea');
    el.value = hex;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    // Simple visual feedback instead of an alert
    const feedback = document.createElement('div');
    feedback.textContent = `Copied ${hex}`;
    feedback.className = 'fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-xl animate-bounce z-50';
    document.body.appendChild(feedback);
    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 1500);
  };

  return (
    <div className="flex flex-col rounded-xl p-4 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
         style={{ backgroundColor: hex }}>
      <div className={`text-lg font-bold ${textColor}`}>{role}</div>
      <div className={`text-sm font-mono mt-1 ${textColor} opacity-80`}>{hex}</div>
      <button
        onClick={copyToClipboard}
        className={`mt-2 px-3 py-1 text-xs rounded-full transition ${isLight ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'} shadow-md`}
      >
        Copy
      </button>
    </div>
  );
};

export const ThemeGenerator = () => {
  const [keyword, setKeyword] = useState('creative tech');
  const [themeData, setThemeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = useCallback(async () => {
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);
    setThemeData(null);

    const data = await fetchThemeData(keyword);

    if (data && data.palette && data.palette.length === 5) {
      setThemeData(data);
    } else {
      // General error check
      if (!data) {
          setError("Failed to fetch data. Check your console for details and ensure the RENDER_BACKEND_URL is correct.");
      } else {
          setError("Generated response was invalid. Please try a different keyword.");
      }
    }
    setIsLoading(false);
  }, [keyword]);

  // Handler for the "Go Back" button
  const handleBackToBuilder = () => {
      // Placeholder navigation. In a real app, you would use React Router's navigate function.
      console.log('User navigating back to the builder...');
      window.history.back(); 
  };
  
  return (
    <div className="p-4 sm:p-8 font-[Inter] w-full">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
        
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-pink-600"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8A8 8 0 0 0 12 20zm-2-9a2 2 0 1 1 2 2 2 2 0 0 1-2-2z"/><path d="M12 2v10m-3-3l3 3m3-3l-3 3"/></svg>
            AI Theme Generator
          </h1>
          <p className="text-sm text-gray-500">
            Generate professional, five-color palettes powered by Gemini.
          </p>
        </header>

        {/* Input and Action Area */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Input Field */}
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., retro 80s, professional finance, nature vibes"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-inner"
            disabled={isLoading}
          />
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
              {/* Go Back Button (Secondary, pink outline) */}
              <button 
                  onClick={handleBackToBuilder} 
                  className="w-full sm:w-1/2 px-6 py-3 font-semibold rounded-lg transition-colors shadow-md border border-pink-600 text-pink-600 hover:bg-pink-50 active:bg-pink-100"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                  Go Back to Builder
              </button>
            
              {/* Generate Button (Primary Pink) */}
              <button
                onClick={handleGenerate}
                disabled={isLoading || !keyword.trim()}
                className={`w-full sm:w-1/2 px-6 py-3 font-semibold rounded-lg transition-colors shadow-md 
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-pink-600 text-white hover:bg-pink-700 active:bg-pink-800'
                  }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Generate Theme'
                )}
              </button>
          </div>
        </div>

        {/* Output Display Area */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {themeData && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{themeData.themeName}</h2>
            <p className="text-gray-600 mb-6 italic text-sm">{themeData.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {themeData.palette.map((color, index) => (
                <ColorCard key={index} role={color.role} hex={color.hex} />
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};