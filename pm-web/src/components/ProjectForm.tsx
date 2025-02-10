import { FormEvent, useState } from "react";
import styles from "./styles/ProjectForm.module.css";
import Modal from "./ui/Modal"; // Импортируем компонент модального окна
import CreateProjectForm from "./CreateProjectForm";
import EditProjectForm from "./EditProjectForm";
import { Project } from "../types";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Состояние для модального окна удаления

  // Обработчик открытия модального окна удаления
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // Обработчик закрытия модального окна удаления
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles.formContainer}>
      {/* Форма создания проекта */}
      <CreateProjectForm
        onSubmit={onSubmitCreate} 
        projectNewTitle={projectNewTitle}
        projectNewDescription={projectNewDescription}
        onNewTitleChange={onNewTitleChange}
        onNewDescriptionChange={onNewDescriptionChange}
      />

      {/* Форма редактирования проекта */}
      {editProjectId !== null && currentProject && (
        <EditProjectForm
          onSubmit={onSubmitUpdate} 
          projectTitle={projectTitle}
          projectDescription={projectDescription}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
          createdAt={currentProject.createdAt}
          updatedAt={currentProject.updatedAt}
          onDelete={handleOpenDeleteModal} 
          processes={currentProject.processes}
        />
      )}

      {/* Модальное окно для подтверждения удаления */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Подтвердите удаление"
        message={`Вы уверены, что хотите удалить проект "${currentProject?.title}"?`}
        onConfirm={() => {
          onDelete(editProjectId!);
          handleCloseDeleteModal();
        }}
        onCancel={handleCloseDeleteModal}
        confirmButtonText="Удалить"
        isDelete={true} 
      />
    </div>
  );
};

export default ProjectForm;
