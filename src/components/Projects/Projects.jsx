import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";

const Projects = () => {
  const param = useParams();
  const [project, setProject] = useState([]);

  useEffect(() => {
    const existingProjects = localStorage.getItem("projects");

    // Parse existing data (if any) into an array or initialize as an empty array
    const projectsArray = existingProjects ? JSON.parse(existingProjects) : [];

    const res = projectsArray.find((project) => {
      if (
        project.name.toLowerCase().replace(/\s+/g, "-") === param.projectName
      ) {
        setProject(project);
      }
    });

    return res;
  }, [param.projectName]);

  return (
    <div className="flex">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[1]">
        <ProjectDetails project={project} />
      </div>
    </div>
  );
};

export default Projects;
