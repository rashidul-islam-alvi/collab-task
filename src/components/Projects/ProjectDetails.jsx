import { Divider } from "@mantine/core";
import React from "react";

const ProjectDetails = ({ project }) => {
  return (
    <div className="flex flex-col w-full h-screen p-5 border-2 ">
      <div>
        <h1 className="text-2xl font-semibold">{project.name}</h1>
      </div>
      <Divider my={10} className="w-full" />
    </div>
  );
};

export default ProjectDetails;
