import { FormEvent } from "react";
import styles from "./styles/ProjectForm.module.css";

interface CreateProjectFormProps {
  onSubmit: (e: FormEvent) => void;
  projectNewTitle: string;
  projectNewDescription: string;
  onNewTitleChange: (newTitle: string) => void;
  onNewDescriptionChange: (newDescription: string) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onSubmit,
  projectNewTitle,
  projectNewDescription,
  onNewTitleChange,
  onNewDescriptionChange,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.createForm}>
      <input
        type="text"
        placeholder="Новый проект"
        value={projectNewTitle}
        onChange={(e) => onNewTitleChange(e.target.value)}
      />
      <textarea
        placeholder="Описание нового проекта"
        value={projectNewDescription}
        onChange={(e) => onNewDescriptionChange(e.target.value)}
      />
      <button type="submit" className={styles.createButton}>
        Создать новый проект
      </button>
    </form>
  );
};

export default CreateProjectForm;
