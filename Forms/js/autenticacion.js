// js/autenticacion.js

import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { doc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Registro de usuarios
document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registro-form");
    if (registroForm) {
        registroForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;
            const nombre = document.getElementById("nombre").value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
                const user = userCredential.user;

                await setDoc(doc(db, "usuarios", user.uid), {
                    nombre: nombre,
                    correo: correo,
                    registro: serverTimestamp()
                });

                alert("Registro exitoso");
                window.location.href = "login.html";
            } catch (error) {
                console.error("Error en el registro:", error);
                alert("Error: " + error.message);
            }
        });
    }

    const loginForm = document.getElementById("form-login");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
                const user = userCredential.user;

                await updateDoc(doc(db, "usuarios", user.uid), {
                    ultimaSesion: serverTimestamp()
                });

                alert("Inicio de sesión exitoso");
            } catch (error) {
                console.error("Error en inicio de sesión:", error);
                alert("Error: " + error.message);
            }
        });
    }
});