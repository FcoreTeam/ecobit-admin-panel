import { NewsData } from "@/components/types/types";

import styles from "./news-preview.module.scss";
import Image from "next/image";

interface Props extends Omit<NewsData, "image"> {
  image: string;
}

const NewsPreview = ({ title, description, image }: Props) => {
  const nowDate = new Date();
  const formattedDate = `${nowDate.getDate().toString().padStart(2, "0")}.${(
    nowDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${nowDate.getFullYear()}`;
  return (
    <div className={styles.news__preview}>
      <section className={styles.vertical}>
        <Image
          src={image as string}
          alt={title}
          width={1920}
          height={1080}
          className={styles.preview__image}
        />
        <p className={styles.preview__title}>{title}</p>
        <p className={styles.preview__description}>{description}</p>
      </section>
      <section className={styles.horizontal}>
        <div className={styles.horizontal__wrap}>
          <p className={styles.preview__title}>{title}</p>
          <p className={styles.preview__description}>{description}</p>
          <p className={styles.preview__date}>{formattedDate}</p>
        </div>
        <Image
          src={image}
          alt={title}
          width={1920}
          height={1080}
          className={styles.preview__image}
        />
      </section>
    </div>
  );
};
export default NewsPreview;
