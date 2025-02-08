import React from "react";
import { Process, Project } from "../types";
import ProcessCard from "./ProcessCard";
import styles from "./ProjectCard.module.css";

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
  const handleProcessUpdate = (updatedProcess: Process) => {
    const updatedProcesses = project.processes.map((p) =>
      p.id === updatedProcess.id ? updatedProcess : p
    );
    handleEdit({ ...project, processes: updatedProcesses });
  };

  return (
    <div className={styles.ProjectItem}>
      {project.title}
      {/* <h5>{project.description}</h5> */}
      {/* {project.processes.map((process) => (
        <ProcessCard
          key={process.id}
          process={process}
          onUpdate={handleProcessUpdate}
        />
      ))} */}
      {/* <p>
        Создано: {project.createdAt} <br /> Изменено: {project.updatedAt}
      </p>
      <button onClick={() => handleEdit(project)}>Редактировать</button>
      <button onClick={() => handleDelete(project.id)}>Удалить</button> */}
    </div>
  );
};

export default ProjectCard;
