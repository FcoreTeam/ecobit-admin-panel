import { AuthData, NewsData } from "@/components/types/types";
import Cookies from "js-cookie";
import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_DEV,
  timeout: 10000,
});

export const authAdmin = async (data: AuthData) => {
  return $api.post("/auth/creator/login/", data).catch((err) => {
    throw err;
  });
};

export const verifyToken = async (token: string) => {
  return $api
    .get("/auth/verify_token?token_type=creator", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      throw err;
    });
};

export const createNews = async (newsData: NewsData) => {
  const formData = new FormData();

  formData.append("title", newsData.title);
  formData.append("description", newsData.description);
  formData.append("image", newsData.image as File);

  console.log(typeof newsData.image);

  return $api
    .post("/news/", formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .catch((err) => {
      throw err;
    });
};
