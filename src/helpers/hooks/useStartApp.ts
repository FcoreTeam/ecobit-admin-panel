import { verifyToken } from "@/api/requests";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useStartApp = () => {
  const [access, setAccess] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const accessToken = Cookies.get("accessToken");
      const response = await verifyToken(accessToken as string);

      if (response) {
        setAccess(true);
      }
    })();
    try {
    } catch (err) {
      throw err;
    }
  }, []);

  return { access };
};
