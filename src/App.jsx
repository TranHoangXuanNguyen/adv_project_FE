import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { onMessage } from "firebase/messaging";
import { messaging } from "./services/FireBaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Thông báo đến khi đang mở:", payload);

      const { title, body } = payload.notification || {};
      toast.info(
        `${title ? title + ": " : ""}${body || "Bạn có thông báo mới"}`
      );
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const element = useRoutes(routes);

  return (
    <>
      {element}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
}
