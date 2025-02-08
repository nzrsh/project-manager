import { useEffect, useState } from "react";
import { Process, stages } from "../types";
import { useUpdateProcessStage } from "../hooks/useUpdateProcessStage";
import { useUpdateProcessState } from "../hooks/useUpdateProcessState";

interface ProcessCardProps {
  process: Process;
  onUpdate: (updatedProcess: Process) => void;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ process }) => {
  const updateProcessStage = useUpdateProcessStage();
  const updateProcessState = useUpdateProcessState();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [processState, setProcessState] = useState<boolean>(process.is_active);
  const handleRadioChange = (index: number) => {
    setSelectedIndex(index);
    updateProcessStage.mutate(
      {
        id: process.id,
        data: {
          state_stage: index,
        },
      },
      {
        onSuccess: () => {
          console.log("Успешно поменян этап");
        },
      }
    );
  };

  const handleProcessStateClick = () => {
    const newState = !processState; // Переключаем состояние
    setProcessState(newState); // Обновляем локальное состояние
    console.log("Кликнуто", newState);

    // Вызываем мутацию для обновления состояния на сервере
    updateProcessState.mutate({
      id: process.id,
      data: {
        is_active: newState,
      },
    });
  };

  const setInitialIndex = () => {
    console.log("cмонтирован процесс ", process.title);
    setSelectedIndex(process.state_stage);
  };

  useEffect(setInitialIndex, []);

  return (
    <div>
      {process.title}
      <button onClick={handleProcessStateClick}>
        {processState ? "Выключить" : "Включить"}
      </button>
      <ol>
        {stages.map((stage, index) => (
          <li key={index}>
            <input
              type="radio"
              name={process.title}
              checked={selectedIndex === index}
              onChange={() => handleRadioChange(index)}
            />
            <span
              style={{
                textDecoration:
                  selectedIndex !== null && index < selectedIndex
                    ? "line-through"
                    : "none",
              }}
            >
              {stage}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProcessCard;
