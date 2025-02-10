import { FormEvent } from "react";
import styles from "./styles/ProjectForm.module.css";
import { Project } from "../types";
import ProcessCard from "./ProcessCard";

interface ProjectFormProps {
  onSubmitCreate: (e: FormEvent) => void;
  onSubmitUpdate: (e: FormEvent) => void;
  projectTitle: string;
  projectDescription: string;
  projectNewTitle: string;
  projectNewDescription: string;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  onNewTitleChange: (newTitle: string) => void;
  onNewDescriptionChange: (newDescription: string) => void;
  editProjectId: number | null;
  currentProject: Project | null;
  onDelete: (projectId: number) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmitCreate,
  onSubmitUpdate,
  projectTitle,
  projectDescription,
  projectNewTitle,
  projectNewDescription,
  onTitleChange,
  onDescriptionChange,
  onNewTitleChange,
  onNewDescriptionChange,
  editProjectId,
  currentProject,
  onDelete,
}) => {
  return (
    <div className={styles.formContainer}>
      {/* Форма создания проекта */}
      <form onSubmit={onSubmitCreate} className={styles.createForm}>
        <input
          type="text"
          placeholder="Название проекта"
          value={projectNewTitle}
          onChange={(e) => onNewTitleChange(e.target.value)}
        />
        <textarea
          placeholder="Описание проекта"
          value={projectNewDescription}
          onChange={(e) => onNewDescriptionChange(e.target.value)}
        />
        <button type="submit" className={styles.createButton}>
          Создать
        </button>
      </form>

      {/* Форма редактирования проекта */}
      {editProjectId !== null && (
        <form onSubmit={onSubmitUpdate}>
          <input
            type="text"
            placeholder="Название проекта"
            value={projectTitle}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <textarea
            placeholder="Описание проекта"
            value={projectDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />

          <div className={styles.projectTimestamp}>
            <span>
              Создан: <strong>{currentProject?.createdAt}</strong>
            </span>
            <span>
              Обновлён в: <strong>{currentProject?.updatedAt}</strong>
            </span>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.saveButton} type="submit">
              Обновить
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => onDelete(editProjectId)}
            >
              Удалить
            </button>
          </div>

          <div className={styles.processContainer}>
            {currentProject?.processes.map((process) => (
              <ProcessCard key={process.id} process={process} />
            ))}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectForm;
