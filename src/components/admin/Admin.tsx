"use client";

import { useState } from "react";

import AdminUplodaer from "./admin-uplodaer/Admin-uplodaer";
import styles from "./admin.module.scss";
import { NewsData } from "../types/types";
import { useStartApp } from "@/helpers/hooks/useStartApp";

const Admin = () => {
  const { access } = useStartApp();
  const [newsData, setNewsData] = useState<NewsData>({
    image: null,
    title: "",
    description: "",
  });

  return (
    <>
      {access ? (
        <div className={styles.admin}>
          <AdminUplodaer
            setNewsData={setNewsData}
            image={newsData.image}
            title={newsData.title}
            description={newsData.description}
            newsData={newsData}
          />
        </div>
      ) : (
        <div>
          <p>Нет доступа</p>
        </div>
      )}
    </>
  );
};
export default Admin;
