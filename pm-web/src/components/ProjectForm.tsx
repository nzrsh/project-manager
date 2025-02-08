import styles from "./ProjectForm.module.css";

const ProjectForm: React.FC = ({}) => {
  return (
    <>
      <div className={styles.formContainer}>
        <form>
          <input type="text" name="project-name" placeholder="Текущий проект" />

          <textarea
            name="project-desc"
            placeholder="Описание текущего проекта"
          />

          <input type="submit" value="Сохранить" />
        </form>

        <form>
          <input type="text" name="project-name" placeholder="Текущий проект" />
          <textarea
            name="project-desc"
            placeholder="Описание текущего проекта"
          />
          <div className={styles.projectTimestamp}>
            <span>
              {" "}
              Создан
              <strong> 24-03-2003</strong> в <strong>14:59</strong>
            </span>
            <span>
              Обновлён
              <strong> 24-03-2003</strong> в <strong>17:59</strong>
            </span>
          </div>
          <input type="submit" value="Сохранить" />
          <div className={styles.processContainer}>
            <div className={styles.ProcessItem}>
              Разработка
              <ul className={styles.StageList}>
                <li>
                  <input type="radio" id="radio1" />
                  <label htmlFor="radio1">Этап 1</label>
                </li>
                <li>
                  <input type="radio" id="radio2" />
                  <label htmlFor="radio2">Этап 2</label>
                </li>
                <li>
                  <input type="radio" id="radio3" />
                  <label htmlFor="radio3">Этап 3</label>
                </li>
                <li>
                  <input type="radio" id="radio4" />
                  <label htmlFor="radio4">Этап 4</label>
                </li>
              </ul>
            </div>
            <div className={styles.ProcessItem}>
              Процесс 2
              <ul className={styles.StageList}>
                <li>
                  <input type="radio" id="radio5" />
                  <label htmlFor="radio5">Этап 1</label>
                </li>
                <li>
                  <input type="radio" id="radio6" />
                  <label htmlFor="radio6">Этап 2</label>
                </li>
                <li>
                  <input type="radio" id="radio7" />
                  <label htmlFor="radio7">Этап 3</label>
                </li>
                <li>
                  <input type="radio" id="radio8" />
                  <label htmlFor="radio8">Этап 4</label>
                </li>
              </ul>
            </div>
            <div className={styles.ProcessItem}>
              Процесс 3
              <ul className={styles.StageList}>
                <li>
                  <input type="radio" id="radio9" />
                  <label htmlFor="radio9">Этап 1</label>
                </li>
                <li>
                  <input type="radio" id="radio10" />
                  <label htmlFor="radio10">Этап 2</label>
                </li>
                <li>
                  <input type="radio" id="radio11" />
                  <label htmlFor="radio11">Этап 3</label>
                </li>
                <li>
                  <input type="radio" id="radio12" />
                  <label htmlFor="radio12">Этап 4</label>
                </li>
              </ul>
            </div>
            <div className={styles.ProcessItem}>
              Процесс 4
              <ul className={styles.StageList}>
                <li>
                  <input type="radio" id="radio13" />
                  <label htmlFor="radio13">Этап 1</label>
                </li>
                <li>
                  <input type="radio" id="radio14" />
                  <label htmlFor="radio14">Этап 2</label>
                </li>
                <li>
                  <input type="radio" id="radio15" />
                  <label htmlFor="radio15">Этап 3</label>
                </li>
                <li>
                  <input type="radio" id="radio16" />
                  <label htmlFor="radio16">Этап 4</label>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
