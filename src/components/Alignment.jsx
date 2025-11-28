import React from 'react';

// This component controls the textAlign property for the selected block
const AlignmentControls = ({ selectedBlock, updateBlock }) => {
    const alignmentOptions = [
        { key: 'left', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
        )},
        { key: 'center', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
        )},
        { key: 'right', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
        )},
    ];

    const currentAlignment = selectedBlock.textAlign || 'left';

    const stop = (e) => e.stopPropagation();

    return (
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg shadow-inner" onPointerDown={stop}>
            {alignmentOptions.map(({ key, icon }) => (
                <button
                    key={key}
                    onClick={() => updateBlock(selectedBlock.id, "textAlign", key)}
                    className={`p-1 rounded-md transition-colors duration-150 ${
                        currentAlignment === key 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-200'
                    }`}
                    title={`Align ${key}`}
                >
                    {icon}
                </button>
            ))}
        </div>
    );
};

export default AlignmentControls;