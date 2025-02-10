import { FormEvent, useState } from "react";
import { useProjectsQuery } from "../hooks/useProjectsQuery";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import styles from "./styles/ProjectList.module.css";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import Modal from "./ui/Modal"; // Импортируем компонент модального окна
import Spinner from "./ui/Spinner";

const ProjectsList = () => {
  // Работа с query
  const { data: projects, isLoading, error, isError } = useProjectsQuery();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  // Состояния для управления формами
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectNewTitle, setNewProjectTitle] = useState("");
  const [projectNewDescription, setNewProjectDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Состояния для модальных окон
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Обработчик редактирования проекта
  const handleEdit = (project: Project) => {
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setEditProjectId(project.id);
  };

  // Обработчик удаления проекта
  const handleDelete = (projectId: number) => {
    deleteProjectMutation.mutate(projectId, {
      onSuccess: () => {
        setEditProjectId(null);
        setProjectDescription("");
        setProjectTitle("");
      },
    });
  };

  // Обработка изменения заголовка и описания
  const handleProjectTitleChange = (newTitle: string) => {
    setProjectTitle(newTitle);
  };
  const handleProjectDescriptionChange = (newDescription: string) => {
    setProjectDescription(newDescription);
  };

  // Обработка ввода в строку поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleNewProjectTitleChange = (newTitle: string) => {
    setNewProjectTitle(newTitle);
  };
  const handleNewProjectDescriptionChange = (newDescription: string) => {
    setNewProjectDescription(newDescription);
  };

  // Обработчик создания проекта
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
          setNotificationMessage("Проект успешно создан!");
          setIsNotificationModalOpen(true); // Показываем уведомление
        },
      }
    );
  };

  // Обработчик обновления проекта
  const handleUpdateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editProjectId === null) return;
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
          setNotificationMessage("Проект успешно обновлен!");
          setIsNotificationModalOpen(true); // Показываем уведомление
        },
      }
    );
  };

  // Загрузка или ошибка
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
        <p>Загрузка проектов...</p>
      </div>
    );
  }
  if (isError) return <p>Ошибка! {(error as any)?.message}</p>;

  // Текущий проект и фильтрация
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
      {/* Модальное окно уведомлений */}
      <Modal
        isOpen={isNotificationModalOpen}
        title="Успешно!"
        message={notificationMessage}
        onCancel={() => setIsNotificationModalOpen(false)}
        showConfirmButton={false} 
      />

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
                className={`${styles.projectItem} ${
                  editProjectId === project.id ? styles.active : ""
                }`}
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
