import { useEffect, useState } from "react";
import { Process, stages } from "../types";
import { useUpdateProcessStage } from "../hooks/useUpdateProcessStage";
import { useUpdateProcessState } from "../hooks/useUpdateProcessState";
import styles from "./ProcessCard.module.css";

interface ProcessCardProps {
  process: Process;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ process }) => {
  const updateProcessStage = useUpdateProcessStage();
  const updateProcessState = useUpdateProcessState();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [processState, setProcessState] = useState<boolean>(process.is_active);

  // Обработчик изменения этапа
  const handleRadioChange = (index: number) => {
    setSelectedIndex(index);
    updateProcessStage.mutate({
      id: process.id,
      data: {
        state_stage: index,
      },
    });
  };

  // Обработчик изменения состояния процесса
  const handleProcessStateClick = () => {
    const newState = !processState;
    setProcessState(newState);
    updateProcessState.mutate({
      id: process.id,
      data: {
        is_active: newState,
      },
    });
  };

  // Устанавливаем начальный этап при монтировании
  useEffect(() => {
    setSelectedIndex(process.state_stage);
  }, [process.state_stage]);

  return (
    <div className={styles.ProcessItem}>
      <span>
        {process.title}{" "}
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={processState}
            onChange={handleProcessStateClick}
          />
          <span className={styles.slider}></span>
        </label>
      </span>

      <ul className={styles.StageList}>
        {stages.map((stage, index) => (
          <li key={index}>
            <input
              type="radio"
              name={process.title}
              id={stages[index]}
              checked={selectedIndex === index}
              onChange={() => handleRadioChange(index)}
            />
            <label
              htmlFor={stages[index]}
              style={{
                textDecoration:
                  selectedIndex !== null && index < selectedIndex
                    ? "line-through"
                    : "none",
              }}
            >
              {stage}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessCard;
