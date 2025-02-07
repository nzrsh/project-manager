import { Process, Project } from "../types";

interface ProjectCardProps {
  project: Project;
  handleEdit: (project: Project) => void;
  handleDelete: (project_id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div>
      <h1>
        {project.id} {project.title}
      </h1>
      <h2>{project.description}</h2>
      <h3>Процессы:</h3>
      <ol>
        {project.processes.map((process) => (
          <li key={process.id}>
            {process.title} Активен: {process.is_active}
          </li>
        ))}
      </ol>

      <button onClick={() => handleEdit(project)}>Редактировать</button>
      <button onClick={() => handleDelete(project.id)}>Удалить</button>
    </div>
  );
};

interface ProcessCardProps {
  process: Process;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ process }) => {
  return <></>;
};

export default ProjectCard;
