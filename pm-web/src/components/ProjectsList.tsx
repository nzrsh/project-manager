import { FormEvent, useState } from "react";
import { useProjectsQuery } from "../hooks/useProjectsQuery";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
  const { data: projects, isLoading, error, isError } = useProjectsQuery();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState<number | null>(null); // ID проекта для редактирования

  // Обработка отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editProjectId !== null) {
      // Если редактируем проект
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
            setProjectTitle(""); // Очищаем поля
            setProjectDescription("");
            setEditProjectId(null); // Выходим из режима редактирования
          },
        }
      );
    } else {
      // Если создаём новый проект
      createProjectMutation.mutate(
        {
          title: projectTitle,
          description: projectDescription,
        },
        {
          onSuccess: () => {
            setProjectTitle(""); // Очищаем поля
            setProjectDescription("");
          },
        }
      );
    }
  };

  // Обработка редактирования проекта
  const handleEdit = (project: Project) => {
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setEditProjectId(project.id); // Устанавливаем ID проекта для редактирования
  };

  // Обработка удаления проекта
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

  // Состояния загрузки и ошибок
  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка! {(error as any)?.message}</p>;

  return (
    <div>
      <h2>Список проектов</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название проекта"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Описание"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <button type="submit">{editProjectId ? "Обновить" : "Создать"}</button>
      </form>
      <ul>
        {projects?.map((project) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
