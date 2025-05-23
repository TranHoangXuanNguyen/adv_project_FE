importScripts(
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAfBw3vL0_k5DU2Ry2TeuHaIkx1dyo-cwg",
  authDomain: "concobebe-e342a.firebaseapp.com",
  projectId: "concobebe-e342a",
  messagingSenderId: "896415008950",
  appId: "1:896415008950:web:4569f6447e676980ad7e17",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
