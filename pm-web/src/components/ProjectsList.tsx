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
  //Работа с query
  const { data: projects, isLoading, error, isError } = useProjectsQuery();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  //Стейт для редактирования проекта
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  //Стейт для создания проекта
  const [projectNewTitle, setNewProjectTitle] = useState("");
  const [projectNewDescription, setNewProjectDescription] = useState("");

  //Стейт айди редактируемого проекта
  const [editProjectId, setEditProjectId] = useState<number | null>(null);

  //Стейт инпута для поиска
  const [searchQuery, setSearchQuery] = useState("");

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
      deleteProjectMutation.mutate(projectId, {
        onSuccess: () => {
          setEditProjectId(null);
          setProjectDescription("");
          setProjectTitle("");
        },
      });
    }
  };

  //Обработка изменения редактирования
  const handleProjectTitleChange = (newTitle: string) => {
    setProjectTitle(newTitle);
  };

  //Обработка изменения описания
  const handleProjectDescriptionChange = (newDescription: string) => {
    setProjectDescription(newDescription);
  };

  //Обработка ввода в строку поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleNewProjectTitleChange = (newTitle: string) => {
    setNewProjectTitle(newTitle);
  };

  const handleNewProjectDescriptionChange = (newDescription: string) => {
    setNewProjectDescription(newDescription);
  };

  // Отдельные обработчики для форм
  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    createProjectMutation.mutate(
      {
        title: projectNewTitle,
        description: projectNewDescription,
      },
      {
        onSuccess: () => {
          setNewProjectTitle("");
          setNewProjectDescription("");
        },
      }
    );
  };

  const handleUpdateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editProjectId === null) return;
    updateProjectMutation.mutate({
      id: editProjectId,
      data: {
        title: projectTitle,
        description: projectDescription,
      },
    });
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка! {(error as any)?.message}</p>;

  const currentProject =
    editProjectId !== null
      ? projects?.find((p) => p.id === editProjectId) || null
      : null;

  const filteredProjects = projects
    ?.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .reverse();
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
          <ul>
            {filteredProjects?.map((project) => (
              <li
                key={project.id}
                onClick={() => handleEdit(project)}
                className={styles.projectItem}
              >
                <ProjectCard
                  project={project}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
        </div>

        <ProjectForm
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          projectTitle={projectTitle}
          projectDescription={projectDescription}
          projectNewTitle={projectNewTitle}
          projectNewDescription={projectNewDescription}
          onTitleChange={handleProjectTitleChange}
          onDescriptionChange={handleProjectDescriptionChange}
          onNewTitleChange={handleNewProjectTitleChange}
          onNewDescriptionChange={handleNewProjectDescriptionChange}
          editProjectId={editProjectId}
          currentProject={currentProject}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ProjectsList;
