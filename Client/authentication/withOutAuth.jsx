import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthSelector } from "@/redux/selector/auth";

export default function withOutAuth(Component) {
  return function WithAuth(props) {
    const authSelector = useAuthSelector();
    const { userInfo, isLoggedIn } = authSelector;
    const router = useRouter();

    useEffect(() => {
      const userData = window.localStorage.getItem("adminAuthToken");
      if (isLoggedIn && userInfo && userData) {
        router.push("/dashboard");
      }
    }, [isLoggedIn, userInfo]);

    return isLoggedIn && userInfo ? null : <Component {...props} />;
  };
}
