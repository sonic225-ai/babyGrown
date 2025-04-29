import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT_WJ0cUwzyZ_KPPMbabUhboDBT7WtF7o",
  authDomain: "babygrown-70ece.firebaseapp.com",
  projectId: "babygrown-70ece",
  storageBucket: "babygrown-70ece.appspot.com",
  messagingSenderId: "31259893897",
  appId: "1:31259893897:web:3d81ceec2cefec6d702658"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function initAuthStateListener() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Пользователь вошёл:", user.email);
    } else {
      console.log("Пользователь вышел");
    }
  });
}

export { auth };