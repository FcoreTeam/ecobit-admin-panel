import { useState, useRef, useEffect } from "react";
import Input from "@/components/@ui/input/Input";
import { NewsData } from "@/components/types/types";
import clsx from "clsx";
import styles from "./text-uplodaer.module.scss";
import { DataHandler } from "@/helpers/helpers";

interface Props {
  title: string;
  description: string;
  setNewsData: (title: React.SetStateAction<NewsData>) => void;
}
const TextUplodaer = ({ title, description, setNewsData }: Props) => {
  const [focusIndex, setFocus] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && focusIndex === 1) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [focusIndex]);

  return (
    <div className={styles.text__uplodaer}>
      <p
        className={clsx(styles.text__input, focusIndex === 0 && styles.active)}
      >
        заголовок
      </p>
      <Input
        className={styles.uplodaer__input}
        type="text"
        value={title}
        onChange={(e) => {
          DataHandler("title", e.target.value, setNewsData);
        }}
        onFocus={() => setFocus(0)}
        onBlur={() => setFocus(null)}
      />

      <p
        className={clsx(styles.text__input, focusIndex === 1 && styles.active)}
      >
        основной текст
      </p>
      <Input
        value={description}
        className={styles.uplodaer__input}
        type="text"
        onChange={(e) => {
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }
          DataHandler("description", e.target.value, setNewsData);
        }}
        isTextArea
        textareaRef={textareaRef as React.RefObject<HTMLTextAreaElement>}
        onFocus={() => setFocus(1)}
        onBlur={() => setFocus(null)}
      />
    </div>
  );
};

export default TextUplodaer;
