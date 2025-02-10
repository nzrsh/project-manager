import { useEffect, useState } from "react";
import { Process, stages } from "../types";
import { useUpdateProcessStage } from "../hooks/useUpdateProcessStage";
import { useUpdateProcessState } from "../hooks/useUpdateProcessState";
import styles from "./styles/ProcessCard.module.css";

interface ProcessCardProps {
  process: Process;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ process }) => {
  const updateProcessStage = useUpdateProcessStage();
  const updateProcessState = useUpdateProcessState();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [processState, setProcessState] = useState<boolean>(process.is_active);


  const handleRadioChange = (index: number) => {
    setSelectedIndex(index);
    updateProcessStage.mutate({
      id: process.id,
      data: {
        state_stage: index,
      },
    });
  };


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

  useEffect(() => {
    setSelectedIndex(process.state_stage);
  }, [process.state_stage]);

  return (
    <div className={styles.ProcessItem}>

      <span className={styles.ProcessSwitch}>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={processState}
            onChange={handleProcessStateClick}
          />
          <span className={styles.slider}></span>
        </label>
      </span>


      <strong>{process.title}</strong>


      <ul className={styles.StageList}>
        {stages.map((stage, index) => {
          const uniqueId = `${process.id}-${index}`;
          return (
            <li
              key={index}
              className={selectedIndex === index ? styles.selected : ""}
              onClick={() => handleRadioChange(index)} 
            >
              <input
                type="radio"
                name={process.title}
                id={uniqueId}
                checked={selectedIndex === index}
                onChange={() => {}}
                style={{ display: "none" }} 
              />
              <label htmlFor={uniqueId}>{stage}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProcessCard;
