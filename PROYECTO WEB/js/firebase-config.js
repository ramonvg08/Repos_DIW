// js/firebase-config.js

// Agrega el SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCMtuCG64hOrxhY6eHcWU8YOv2ELSlAEAA",
    authDomain: "proyectoformulario-ramon.firebaseapp.com",
    projectId: "proyectoformulario-ramon",
    storageBucket: "proyectoformulario-ramon.firebasestorage.app",
    messagingSenderId: "428212006493",
    appId: "1:428212006493:web:65f930cdd0ce53884467b4",
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
