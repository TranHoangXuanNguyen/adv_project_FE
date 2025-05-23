import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAfBw3vL0_k5DU2Ry2TeuHaIkx1dyo-cwg",
  authDomain: "concobebe-e342a.firebaseapp.com",
  projectId: "concobebe-e342a",
  messagingSenderId: "896415008950",
  appId: "1:896415008950:web:4569f6447e676980ad7e17",
  vapidKey:
    "BI1aTZlm7e2xNsB_OM8VTCx17KqqXvQm_qnNlgTUE-bKqXLXSc12fGlNKm2OHw9yW0T-zjevnJd-8j68GZMmOYc",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage, firebaseConfig };
