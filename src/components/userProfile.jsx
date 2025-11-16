import { useState, useEffect } from "react";
import { Edit3, Mail, Phone, MapPin, Info, LogOut, Home, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfile , updateProfile } from "../services/authService";



export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});

useEffect(() => {
  async function loadProfile() {
    try {
      const data = await getProfile();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.error("Error loading user:", err);
      navigate("/login");
    }
  }
  loadProfile();
}, []);

  // logout function
    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // image persisted
  const [image, setImage] = useState(() => {
    return localStorage.getItem("profileImg") || "";
  });
  useEffect(() => {
    if (image) localStorage.setItem("profileImg", image);
    else localStorage.removeItem("profileImg");
  }, [image]);




const handleUserChange = async (field, value) => {
  const updated = { ...user, [field]: value }; // optimistic UI
  setUser(updated);

  try {
    await updateProfile({ [field]: value });
  } catch (err) {
    console.error("Failed to update backend", err);
  }
};

// image upload
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

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white border border-pink-100 rounded-2xl shadow-md p-6 mt-10">
      
        {/* NAVIGATION */}
      <div className="flex justify-between items-center mb-6 text-sm font-medium">
        <button className="flex items-center gap-1 text-gray-600 hover:text-pink-500" onClick={() => navigate("/")}>
          <Home size={16}/> Home
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-pink-500" onClick={() => navigate("/projects")}>
          <Folder size={16}/> My Projects
        </button>
        <button className="flex items-center gap-1 text-red-500" onClick={logout}>
          <LogOut size={16}/> Logout
        </button>
      </div>
      
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
              onBlur={(e) => handleUserChange("name", e.currentTarget.textContent?.trim() || "")}
              className="text-xl font-semibold text-gray-800 flex items-center gap-2"
            >
              {user.name}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">Creative Builder ✨</p>
        </div>
      </div>

       <div className="my-5 border-t border-gray-200"></div>


      {/* Editable Profile Fields */}
      <div className="grid gap-3 text-sm">
        {/* Email */}
        <div className="flex items-center gap-2">
           <Mail size={16} className="text-pink-400"/>
          {isEditing ? (
           <input
            type="email"
            value={user.email}
            onBlur={(e) => handleUserChange("email", e.target.value)}
            autoFocus
            setIsEditing = {true}
            className="
              flex-1 bg-pink-50 border border-pink-300
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200
              text-gray-700 px-2 py-1 rounded-lg transition-all outline-none
            "
          />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleUserChange("email", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {user.email}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Phone size={16} className="text-pink-400" />
          {isEditing ? (
            <input
              type="tel"
              value={user.phone}
             onBlur={(e) => handleUserChange("phone", e.target.value)}
            autoFocus
            setIsEditing = {true}
            className="
              flex-1 bg-pink-50 border border-pink-300
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200
              text-gray-700 px-2 py-1 rounded-lg transition-all outline-none
            "
          />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleUserChange("phone", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {user.phone || "Add phone"}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-pink-400" />
          {isEditing ? (
            <input
              type="text"
              value={user.location}
              onBlur={(e) => handleUserChange("location", e.target.value)}
            autoFocus
            setIsEditing = {true}
            className="
              flex-1 bg-pink-50 border border-pink-300
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200
              text-gray-700 px-2 py-1 rounded-lg transition-all outline-none
            "
          />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleUserChange("location", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {user.location || "Add location"}
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Info size={16} className="text-pink-400 mt-1" />
          {isEditing ? (
            <textarea
              value={user.bio}
             onBlur={(e) => handleUserChange("bio", e.target.value)}
            autoFocus
            setIsEditing = {true}
            className="
              flex-1 bg-pink-50 border border-pink-300
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200
              text-gray-700 px-2 py-1 rounded-lg transition-all outline-none
            "
              rows={2}
            />
          ) : (
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleUserChange("bio", e.currentTarget.textContent?.trim() || "")}
              className="text-gray-700"
            >
              {user.bio || "Add a short bio"}
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

