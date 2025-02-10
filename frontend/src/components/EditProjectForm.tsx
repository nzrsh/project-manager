import { FormEvent } from "react";
import styles from "./styles/ProjectForm.module.css";
import { Process } from "../types";
import ProcessCard from "./ProcessCard";

interface EditProjectFormProps {
  onSubmit: (e: FormEvent) => void;
  projectTitle: string;
  projectDescription: string;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  createdAt: string;
  updatedAt: string;
  onDelete: () => void;
  processes: Process[];
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  onSubmit,
  projectTitle,
  projectDescription,
  onTitleChange,
  onDescriptionChange,
  createdAt,
  updatedAt,
  onDelete,
  processes,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Изменённое название проекта"
        value={projectTitle}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <textarea
        placeholder="Изменённое описание проекта"
        value={projectDescription}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />

      <div className={styles.projectTimestamp}>
        <span>
          Создан: <strong>{createdAt}</strong>
        </span>
        <span>
          Обновлён в: <strong>{updatedAt}</strong>
        </span>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.saveButton} type="submit">
          Обновить
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
        >
          Удалить
        </button>
      </div>

      <div className={styles.processContainer}>
        {processes.map((process) => (
          <ProcessCard key={process.id} process={process} />
        ))}
      </div>
    </form>
  );
};

export default EditProjectForm;
