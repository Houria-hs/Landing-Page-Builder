import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

export default function DraggableBlock({
  id,
  x,
  y,
  isEditing,
  children,
  toolbar,
  onStartResize,
  onSelect,
  isPreview,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(id),
  });
  
  
  const style = {
    position: "absolute",
    left: x,
    top: y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    touchAction: "none",
    zIndex: isEditing ? 50 : 20,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect(id);
      }}
      className="relative block group"
    >
      {/* === TOOLBAR === */}
      {isEditing && toolbar && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute -top-14 left-0 flex gap-2 items-center bg-white border border-gray-200 
                     rounded-lg shadow px-3 py-2 z-40"
        >
          {toolbar}
        </div>
      )}

      {/* === DRAG HANDLE === */}
      {!isPreview && (
      <button
        data-editor-ui
        {...listeners}
        {...attributes}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 left-2 p-1 bg-white/90 border border-gray-200 rounded-md 
                   cursor-grab hover:bg-gray-100 active:cursor-grabbing shadow-sm 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
        title="Drag block"
      >
        <GripVertical className="w-4 h-4 text-gray-600" />
      </button>
    )}

      {/* === CONTENT === */}
      <div className="relative">
        {children}

        {/* === RESIZE HANDLE === */}
        {isEditing && onStartResize && (
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              onStartResize(e, id);
            }}
            className="absolute w-4 h-4 bg-blue-500 rounded cursor-se-resize"
            style={{
              right: -8,
              bottom: -8,
              zIndex: 60,
            }}
            title="Resize"
          />
        )}
      </div>
    </div>
  );
}


