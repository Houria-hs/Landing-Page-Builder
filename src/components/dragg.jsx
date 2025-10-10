import { useDraggable } from "@dnd-kit/core";
import React from "react";

export default function DraggableBlock({
  id,
  x,
  y,
  isEditing,
  children,
  toolbar,
  onStartResize,
  onSelect,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(id),
  });

  const style = {
    position: "absolute",
    left: x,
    top: y,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "none",
    touchAction: "none",
    zIndex: isEditing ? 50 : 20,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();      // prevent canvas deselect
        onSelect && onSelect(id); // call parent with id only
      }}
      className="relative block"
    >
      {isEditing && toolbar && (
        <div onMouseDown={(e) => e.stopPropagation()} className="absolute -top-14 left-0 flex gap-2 items-center bg-white border border-gray-200 rounded-lg shadow px-3 py-2 z-40">
          {toolbar}
        </div>
      )}

      <div className="relative">
        {children}

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

