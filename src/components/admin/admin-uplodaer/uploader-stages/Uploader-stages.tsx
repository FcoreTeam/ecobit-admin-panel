import clsx from "clsx";
import styles from "./uplodaer-stages.module.scss";

interface Props {
  stages: boolean[];
}

const UplodaerStages = ({ stages }: Props) => {
  return (
    <div className={styles.stages}>
      {stages.map((item, index) => (
        <div key={index} className={clsx(styles.stage, item && styles.active)}>
          0{index + 1}
          {index < 2 && (
            <div
              className={clsx(
                styles.line,
                index === 0 && stages[0] && !stages[1] && styles.active__line,
                index === 0 && (stages[1] || stages[2]) && styles.full__line,
                index === 1 && stages[1] && !stages[2] && styles.active__line,
                index === 1 && stages[2] && styles.full__line
              )}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UplodaerStages;
