export const ELEMENT_CONFIGS = {
    // 🎨 Common styles that apply to the selected block/element itself
    self: [
        { label: "Width", name: "width", input: "number" },
        { label: "Height", name: "height", input: "number" },
        { label: "Background Color", name: "bgColor", input: "color" },
    ],

    // ✏️ Text-specific styles (applies to 'text' block or 'title'/'subtitle' sub-elements)
    text: [
        { label: "Content", name: "content", input: "textarea" },
        { label: "Font Size", name: "fontSize", input: "number" },
        { label: "Color", name: "color", input: "color" },
        { label: "Weight", name: "fontWeight", input: "number" },
        { label: "Align", name: "textAlign", input: "text" },
        { label: "Font", name: "fontFamily", input: "text" },
    ],

    // 🔘 Button-specific styles
    button: [
        { label: "Label", name: "label", input: "text" },
        { label: "BG Color", name: "buttonColor", input: "color" },
        { label: "Text Color", name: "color", input: "color" },
        { label: "Padding", name: "padding", input: "number" },
    ],
    
    // 🖼️ Image-specific styles
    image: [
        { label: "Width", name: "width", input: "number" },
        { label: "Height", name: "height", input: "number" },
        // You'll need actions for upload/clear here
    ],
};

/**
 * Maps block types to their contextual property configurations.
 * The keys are {blockType}:{propertyKey}
 */
export const TOOLBAR_CONFIG = {
    // --- Generic Blocks (Use 'self' configuration) ---
    'text:self': [
        ...ELEMENT_CONFIGS.self,
        ...ELEMENT_CONFIGS.text,
    ],
    'button:self': [
        ...ELEMENT_CONFIGS.self,
        ...ELEMENT_CONFIGS.button,
    ],
    'image:self': [
        ...ELEMENT_CONFIGS.self,
        ...ELEMENT_CONFIGS.image,
    ],

    // --- Complex Block: HERO (Example) ---
    // The main block container (for overall block size/background)
    'hero:self': [
        ...ELEMENT_CONFIGS.self,
        { label: "Font", name: "fontFamily", input: "text" }, // Global font
    ],

    // Title sub-element (uses text styles with 'title' property names)
    'hero:title': [
        { label: "Content", name: "title", input: "textarea" },
        { label: "Font Size", name: "titleSize", input: "number" },
        { label: "Color", name: "titleColor", input: "color" },
        { label: "Weight", name: "titleWeight", input: "number" },
        { label: "Align", name: "textAlign", input: "text" },
    ],

    // Subtitle sub-element (uses text styles with 'subtitle' property names)
    'hero:subtitle': [
        { label: "Content", name: "subtitle", input: "textarea" },
        { label: "Font Size", name: "subtitleSize", input: "number" },
        { label: "Color", name: "subtitleColor", input: "color" },
        { label: "Weight", name: "subtitleWeight", input: "number" },
        { label: "Align", name: "textAlign", input: "text" },
    ],

    // Button sub-element (uses button styles with 'button' property names)
    'hero:buttonStyle': [
        { label: "Label", name: "buttonText", input: "text" },
        { label: "BG Color", name: "buttonColor", input: "color" },
        { label: "Text Color", name: "buttonTextColor", input: "color" },
        { label: "Font Size", name: "buttonTextSize", input: "number" },
        // ... other button styles
    ],
    
    // Image sub-element
    'hero:image': [
        ...ELEMENT_CONFIGS.image
    ]
};