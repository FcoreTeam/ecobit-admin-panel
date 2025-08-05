"use client";
import { useEffect, useState, useCallback } from "react";
import { NewsData } from "@/components/types/types";
import UplodaerStages from "./uploader-stages/Uploader-stages";
import styles from "./admin-uplodaer.module.scss";
import { steps } from "./steps";
import Button from "@/components/@ui/button/Button";
import Input from "@/components/@ui/input/Input";
import Image from "next/image";
import TextUplodaer from "./text-uploader/Text-uplodaer";
import NewsPreview from "./news-preview/News-preview";
import { createNews } from "@/api/requests";

interface Props {
  image: File | null;
  title: string;
  description: string;
  setNewsData: (image: React.SetStateAction<NewsData>) => void;
  newsData: NewsData;
}

const AdminUplodaer = ({
  image,
  setNewsData,
  title,
  description,
  newsData,
}: Props) => {
  const [stages, setStages] = useState<boolean[]>([true, false, false]);
  const [step, setStep] = useState<number>(0);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setUrl] = useState<string>("");

  useEffect(() => {
    const step = stages.reduce((acc, item, index) => (item ? index : acc), -1);
    setStep(step);
  }, [stages]);

  const handleFile = useCallback(
    (file: File) => {
      console.log("Загружен файл:", file.name);
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUrl(result);

        setNewsData((prev) => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    },
    [setNewsData]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      if ("files" in e.target && e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleStep = async () => {
    if (image) {
      setStages([true, true, false]);
    } else {
      alert("Картинка отсутсвует");
    }
    if (title && description) {
      setStages([true, true, true]);
    }
    if (step === 2) {
      try {
        const response = await createNews(newsData);

        if (response) {
          console.log(response);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <div className={styles.admin__uplodaer}>
      <UplodaerStages stages={stages} />
      <p className={styles.uploader__title}>
        {steps.find((item) => item.id === step)?.name}
      </p>
      {stages[1] && stages[2] ? (
        <NewsPreview image={fileUrl} title={title} description={description} />
      ) : stages[1] ? (
        <TextUplodaer
          title={title}
          description={description}
          setNewsData={setNewsData}
        />
      ) : (
        <section
          className={`${styles.uplodaer} ${
            dragActive ? styles.dragActive : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className={styles.uplodaer__text}>
            <Image src="/upload.png" width={75} height={75} alt="upload" />
            <p>Выберите фото или перетащите его сюда</p>
            {fileName && (
              <p className={styles.file__name}>Выбран файл: {fileName}</p>
            )}
          </div>
          <Input
            type="file"
            className={styles.upload__input}
            onChange={handleInputChange}
            value=""
          />
          <p className={styles.uplodaer__subtitle}>
            Рекомендуем использовать фото высокого качества в формате 1920:1080.
          </p>
        </section>
      )}

      <Button
        image={step === 2 ? null : "/arrow.png"}
        text="Загрузить"
        className={styles.auth__btn}
        onClick={handleStep}
      />
    </div>
  );
};

export default AdminUplodaer;
