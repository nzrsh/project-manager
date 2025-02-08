import { FormEvent, useState } from "react";
import { useProjectsQuery } from "../hooks/useProjectsQuery";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import styles from "./ProjectList.module.css";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

const ProjectsList = () => {
  const { data: projects, isLoading, error, isError } = useProjectsQuery();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для поиска
  const [isCreatingProject, setIsCreatingProject] = useState(false); // Состояние для создания проекта

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editProjectId !== null) {
      updateProjectMutation.mutate(
        {
          id: editProjectId,
          data: {
            title: projectTitle,
            description: projectDescription,
          },
        },
        {
          onSuccess: () => {
            setProjectTitle("");
            setProjectDescription("");
            setEditProjectId(null);
          },
        }
      );
    } else {
      createProjectMutation.mutate(
        {
          title: projectTitle,
          description: projectDescription,
        },
        {
          onSuccess: () => {
            setProjectTitle("");
            setProjectDescription("");
          },
        }
      );
    }
  };

  const handleEdit = (project: Project) => {
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setEditProjectId(project.id);
  };

  const handleDelete = (projectId: number) => {
    if (
      window.confirm(
        `Вы уверены, что хотите удалить проект "${
          projects?.find((p) => p.id === projectId)?.title
        }"?`
      )
    ) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  const handleProjectTitleChange = (newTitle: string) => {
    setProjectTitle(newTitle);
  };

  const handleProjectDescriptionChange = (newDescription: string) => {
    setProjectDescription(newDescription);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка! {(error as any)?.message}</p>;

  const currentProject =
    editProjectId !== null
      ? projects?.find((p) => p.id === editProjectId) || null
      : null;

  const filteredProjects = projects?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.projectList}>
          <div className={styles.searchAndCreateContainer}>
            <input
              type="text"
              placeholder="Поиск проектов..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          {/* Форма для создания/редактирования проекта
          {isCreatingProject && (
            <div className={styles.projectFormContainer}>
              <ProjectForm />
            </div>
          )} */}
          <ul>
            {filteredProjects?.map((project) => (
              <li key={project.id} className={styles.projectItem}>
                <ProjectCard
                  project={project}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
        </div>

        <ProjectForm />
      </div>
    </div>
  );
};

export default ProjectsList;

/*<ProjectForm
handleSubmit={handleSubmit}
project={currentProject}
handleProjectTitleChange={handleProjectTitleChange}
handleProjectDescriptionChange={handleProjectDescriptionChange}
editProjectId={editProjectId}
/>*/
