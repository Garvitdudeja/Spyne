import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthSelector } from "@/redux/selector/auth";

export default function withAuth(Component, type) {
  return function WithAuth(props) {
    const authSelector = useAuthSelector();
    const { userInfo, isLoggedIn } = authSelector;
    const userData = window.localStorage.getItem("adminAuthToken");

    const router = useRouter();

    useEffect(() => {
      if (!userInfo || !isLoggedIn || !userData) {
        router.push("/");
      }
    }, [userInfo, isLoggedIn, userData]);

    if (!userInfo || !isLoggedIn || !userData) {
      return null;
    }

    return <Component {...props} />;
  };
}
