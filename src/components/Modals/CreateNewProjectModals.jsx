import React from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { useAuth } from "../../context/useAuth";

const CreateNewProjectModals = ({
  setShowCreateNewProjectModal,
  setMockdata,
}) => {
  const { user } = useAuth();

  const form = useForm({
    initialValues: {
      projectName: "",
      projectStartDate: new Date(),
      projectEndDate: new Date(),
      projectShare: [],
    },
  });

  const handleCloseButton = () => {
    setShowCreateNewProjectModal(false);
  };

  const handleSubmit = (e) => {
    // Retrieve existing projects from local storage
    const existingProjects = localStorage.getItem("projects");

    // Parse existing data (if any) into an array or initialize as an empty array
    const projectsArray = existingProjects ? JSON.parse(existingProjects) : [];

    const newProject = {
      name: form.values.projectName,
      owner: user.email,
      startDate: form.values.projectStartDate,
      endDate: form.values.projectEndDate,
      shareWithOthers: form.values.projectShare,
    };

    projectsArray.push(newProject);

    // Store the updated array as a JSON string in local storage
    localStorage.setItem("projects", JSON.stringify(projectsArray));

    setMockdata((prevMockdata) => {
      const newProjectLabel = {
        label: newProject.name,
        link: `/project-${newProject.name.toLowerCase().replace(/\s+/g, "-")}`,
      };

      // Return the updated mockdata
      return [
        ...prevMockdata.slice(0, prevMockdata.length - 1), // Remove the last item (Projects)
        {
          ...prevMockdata[prevMockdata.length - 1], // Copy the last item (Projects)
          links: [
            ...prevMockdata[prevMockdata.length - 1].links,
            newProjectLabel,
          ], // Add the new project label
        },
      ];
    });

    setShowCreateNewProjectModal(false);
  };

  return (
    <div className="absolute z-10 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
      <div className="w-[800px] p-5  shadow-sm rounded-lg border-2">
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl">Create Project</h1>
          <Button onClick={handleCloseButton} variant="outline">
            X
          </Button>
        </div>
        <form
          onSubmit={form.onSubmit((e) => handleSubmit(e))}
          className="flex flex-col gap-2"
        >
          <div>
            <TextInput
              required
              label="Project Name"
              placeholder="Enter project name"
              value={form.values.projectName}
              onChange={(e) =>
                form.setFieldValue("projectName", e.currentTarget.value)
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Project Owner</p>
            <Button variant="outline" className="w-fit">
              {user.email}
            </Button>
          </div>
          <div>
            <DateInput
              required
              label="Start Date"
              value={form.values.projectStartDate}
              onChange={(value) =>
                form.setFieldValue("projectStartDate", value)
              }
            />
          </div>
          <div>
            <DateInput
              required
              label="End Date"
              value={form.values.projectEndDate}
              onChange={(value) => form.setFieldValue("projectEndDate", value)}
            />
          </div>
          <div>
            <TextInput
              required
              label="Share with: (Comma-separated emails) "
              placeholder="Enter emails to share with"
              value={form.values.projectShare.join(",")}
              onChange={(e) =>
                form.setFieldValue("projectShare", e.target.value.split(","))
              }
            />
          </div>

          <div>
            <Button type="submit" variant="outline" radius="xl">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProjectModals;
