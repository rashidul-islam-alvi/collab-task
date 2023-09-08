import {
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  rem,
  Button,
} from "@mantine/core";
import { IconNotes, IconGauge } from "@tabler/icons-react";
import { LinksGroup } from "./LinksGroup";
import { UserButton } from "./UserButton";
import { useAuth } from "../../context/useAuth";
import { useState } from "react";
import CreateNewProjectModals from "../Modals/CreateNewProjectModals";
import { getProjectsFromLocalStorage } from "../../data/sidebar";

const useStyles = createStyles((theme) => ({
  navbar: {
    zIndex: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const Sidebar = () => {
  const { logout } = useAuth();
  const [mockdata, setMockdata] = useState(() => {
    const projectsFromLocalStorage = getProjectsFromLocalStorage();
    const projectLabels = projectsFromLocalStorage.map((project) => ({
      label: project.name,
      link: `/project-${project.name.toLowerCase().replace(/\s+/g, "-")}`,
    }));

    return [
      { label: "Dashboard", icon: IconGauge },
      { label: "My-todo", icon: IconNotes },
      {
        label: "Projects",
        icon: IconNotes,
        initiallyopened: "true",
        links: projectLabels,
      },
    ];
  });
  const [showCreateNewProjectModal, setShowCreateNewProjectModal] =
    useState(false);
  const { user } = useAuth();
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const handleCreateNewProject = () => {
    setShowCreateNewProjectModal((prev) => !prev);
  };

  const handleLogOutBtn = () => {
    logout();
  };

  return (
    <>
      {showCreateNewProjectModal && (
        <CreateNewProjectModals
          setShowCreateNewProjectModal={setShowCreateNewProjectModal}
          setMockdata={setMockdata}
        />
      )}
      <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">Task.io</Group>
          <Button onClick={handleLogOutBtn} variant="outline">
            Log Out
          </Button>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section
          grow
          className={classes.links}
          p="md"
          component={ScrollArea}
        >
          <div className={`${classes.linksInner} flex justify-center w-full`}>
            <Button
              variant="outline"
              className="w-full text-md"
              onClick={handleCreateNewProject}
            >
              Create new project +
            </Button>
          </div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton image="" name={user.name} email={user.email} />
        </Navbar.Section>
      </Navbar>
    </>
  );
};

export default Sidebar;
