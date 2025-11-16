import React, { useEffect, useState } from "react";
import { getProjects , createProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./projectsCard";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    const newProject = await createProject({
      title: `Untitled Project ${projects.length + 1}`,
      data: {},
    });
    setProjects([...projects, newProject]);
  };

  const handleEdit = (id) => navigate(`/builder/${id}`);

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    // we’ll handle the delete API later
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Projects</h1>
         <Link to="/builder">
         <button
          onClick={handleCreate}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl"
        >
          + New Project
        </button>
        </Link>
      </header>

      {projects.length === 0 ? (
        <h1 className="text-gray-500 text-center">
            No projects yet 
        <Link to="/builder">
          <span className="ml-1 text-pink-400 bold">
            Start Building!
          </span>
        </Link>
        </h1> 
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
