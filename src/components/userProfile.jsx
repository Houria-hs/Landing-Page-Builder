import { useState, useEffect } from "react";
import { Plus, Edit3, Mail, Phone, MapPin, Info } from "lucide-react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // image persisted
  const [image, setImage] = useState(() => {
    return localStorage.getItem("profileImg") || "";
  });
  useEffect(() => {
    if (image) localStorage.setItem("profileImg", image);
    else localStorage.removeItem("profileImg");
  }, [image]);

  // profile persisted (lazy init)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profileData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Houry",
          email: "houry@example.com",
          phone: "+213 555 123 456",
          location: "Algiers, Algeria",
          bio: "Web developer & digital artist who loves building beautiful interfaces and painting galaxies.",
        };
  });

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profile));
  }, [profile]);

  // savedProjects persisted
  const [savedProjects, setSavedProjects] = useState(() => {
    const saved = localStorage.getItem("savedProjects");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Landing Page #1", date: "Oct 28, 2025" },
          { id: 2, name: "Portfolio Mockup", date: "Oct 30, 2025" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("savedProjects", JSON.stringify(savedProjects));
  }, [savedProjects]);

  // handle profile updates
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // helper to add project and persist automatically via effect
  const addNewProject = () => {
    const newProject = {
      id: (savedProjects[0]?.id || 0) + 1,
      name: `New Project #${(savedProjects[0]?.id || 0) + 1}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setSavedProjects([newProject, ...savedProjects]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-pink-100 rounded-2xl shadow-md p-6 mt-10">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        {/* Profile Picture */}
        <div className="relative">
          {/* don't break if image is empty */}
          <img
            src={image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'></svg>"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-pink-300 object-cover"
          />
          <label className="absolute bottom-0 right-0 cursor-pointer">
            <Edit3
              size={14}
              className="text-white bg-pink-500 p-1.5 rounded-full shadow hover:bg-pink-600 transition"
              onClick={() => {
                /* optional: trigger file input programmatically if desired */
              }}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Username */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange("name", e.currentTarget.textContent?.trim() || "")}
              className="text-xl font-semibold text-gray-800 flex items-center gap-2"
            >
              {profile.name}
            </h2>

            {/* If you want toggle editing mode via a button, enable this */}
            {/* <button onClick={() => setIsEditing((p) => !p)}>
              <Edit3 size={16} />
            </button> */}
          </div>
          <p className="text-sm text-gray-500 mt-1">Creative Builder ✨</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-200"></div>

      {/* Editable Profile Fields */}
      <div className="grid gap-3 text-sm">
        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-pink-400" />
          {isEditing ? (
            <input
              type="email"
              value={profile.email}
              onBlur={(e) => handleChange("email", e.target.value)}
              autoFocus
              className="border-b border-gray-300 focus:border-pink-400 outline-none flex-1"
            />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange("email", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {profile.email}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Phone size={16} className="text-pink-400" />
          {isEditing ? (
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border-b border-gray-300 focus:border-pink-400 outline-none flex-1"
            />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange("phone", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {profile.phone}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-pink-400" />
          {isEditing ? (
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="border-b border-gray-300 focus:border-pink-400 outline-none flex-1"
            />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange("location", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {profile.location}
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Info size={16} className="text-pink-400 mt-1" />
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="border-b border-gray-300 focus:border-pink-400 outline-none flex-1 resize-none"
              rows={2}
            />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange("bio", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      {/* Saved Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-semibold text-gray-700">Saved Projects</h3>
          <button
            className="flex items-center gap-1 text-pink-500 hover:text-pink-600 text-sm"
            onClick={addNewProject}
          >
            <Plus size={16} /> New
          </button>
        </div>

        {savedProjects.length > 0 ? (
          <div className="grid gap-3">
            {savedProjects.map((project) => (
              <div
                key={project.id}
                className="p-3 rounded-xl border border-pink-100 bg-pink-50 hover:bg-pink-100 transition cursor-pointer"
              >
                <h4 className="font-medium text-gray-700">{project.name}</h4>
                <p className="text-xs text-gray-500">{project.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No saved projects yet 💭</p>
        )}
      </div>
    </div>
  );
}

