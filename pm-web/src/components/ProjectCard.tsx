import React from "react";
import { Project } from "../types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  handleEdit: (project: Project) => void;
  handleDelete: (project_id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return <div className={styles.ProjectItem}>{project.title}</div>;
};

export default ProjectCard;
