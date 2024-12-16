// Agrega el SDK de Firebase
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjnAUv9UytmH6rJnR_sC1NClbIvBV1CTs",
  authDomain: "marketmaker-2a1cc.firebaseapp.com",
  projectId: "marketmaker-2a1cc",
  storageBucket: "marketmaker-2a1cc.firebasestorage.app",
  messagingSenderId: "640597170170",
  appId: "1:640597170170:web:f11765ee4fd28eacecf643",
};

// Inicializa Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta la autenticación y la base de datos
export { auth, db };