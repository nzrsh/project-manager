import React from "react";
import styles from "./styles/Modal.module.css";

interface ModalProps {
  isOpen: boolean; // Флаг для отображения модального окна
  title: string; // Заголовок модального окна
  message: string; // Сообщение
  onConfirm?: () => void; // Действие при подтверждении (опционально)
  onCancel: () => void; // Действие при отмене
  confirmButtonText?: string; // Текст кнопки подтверждения (опционально)
  showConfirmButton?: boolean; // Флаг для отображения кнопки подтверждения
  isDelete?: boolean; // Флаг для окна удаления
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonText = "Подтвердить",
  showConfirmButton = true,
  isDelete = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          {showConfirmButton && (
            <button
              className={`${styles.modalButton} ${
                isDelete ? styles.deleteButton : styles.confirm
              }`}
              onClick={onConfirm}
            >
              {confirmButtonText}
            </button>
          )}
          {!isDelete && (
            <button className={styles.modalButton} onClick={onCancel}>
              {showConfirmButton ? "Отмена" : "ОК"}
            </button>
          )}
          {isDelete && (
            <button className={styles.cancelButton} onClick={onCancel}>
              Отмена
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
