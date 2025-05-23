import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { onMessage } from "firebase/messaging";
import { messaging } from "./services/FireBaseConfig";

export default function App() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Thông báo đến khi đang mở:", payload);
    });
    return () => {
      unsubscribe?.();
    };
  }, []);

  const element = useRoutes(routes);
  return element;
}
