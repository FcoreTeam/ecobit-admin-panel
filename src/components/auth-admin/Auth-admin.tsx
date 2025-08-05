"use client";
import Input from "../@ui/input/Input";
import { useEffect, useState } from "react";
import styles from "./auth-admin.module.scss";
import { DataHandler } from "@/helpers/helpers";
import { AuthData } from "../types/types";
import Button from "../@ui/button/Button";
import Image from "next/image";
import Cookies from "js-cookie";
import { authAdmin } from "@/api/requests";
import { useRouter } from "next/navigation";

const AuthAdmin = () => {
  const router = useRouter();
  const [authData, setAuthData] = useState<AuthData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }, []);

  const loginAdmin = async () => {
    try {
      const response = await authAdmin(authData);
      Cookies.set("accessToken", response.data.access_token);
      Cookies.set("refreshToken", response.data.refresh_token);
      router.push("/admin");
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__inputs}>
        <div className={styles.auth__header}>
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo"
            className={styles.auth__logo}
          />
          <p className={styles.auth__title}>Вход</p>
        </div>

        <section className={styles.inputs}>
          <p className={styles.auth__subtitle}>почта</p>
          <Input
            type="email"
            className={styles.auth__input}
            value={authData.email}
            onChange={(e) => {
              DataHandler("email", e.target.value, setAuthData);
            }}
          />
          <p className={styles.auth__subtitle}>пароль</p>
          <Input
            className={styles.auth__input}
            type="password"
            value={authData.password}
            onChange={(e) => {
              DataHandler("password", e.target.value, setAuthData);
            }}
          />
        </section>
        <Button
          text="Войти"
          onClick={loginAdmin}
          className={styles.auth__btn}
          image="/arrow.png"
        />
      </div>
    </div>
  );
};
export default AuthAdmin;
