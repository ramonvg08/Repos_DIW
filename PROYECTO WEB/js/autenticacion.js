// js/autenticacion.js

import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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

    // Inicio de sesión
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
                window.location.href = "../index.html";
            } catch (error) {
                console.error("Error en inicio de sesión:", error);
                alert("Error: " + error.message);
            }
        });
    }

    const menu = document.getElementById('menu'); // Asegúrate de que el menú tenga este id

    if (menu) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuario conectado
                menu.innerHTML = `
                <nav>
                    <ul>
                        <li><a href="../index.html"><i class="fas fa-home"></i> Inicio</a></li>
                        <li><a href="../pages/perfil.html"><i class="fas fa-user"></i> Perfil</a></li>
                        <li><a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a></li>
                    </ul>
                </nav>
            `;

                // Botón de cerrar sesión
                document.getElementById('logout-btn').addEventListener('click', () => {
                    auth.signOut().then(() => {
                        console.log("Cierre de sesión exitoso.");
                        window.location.href = "../index.html";
                    }).catch((error) => {
                        console.error("Error al cerrar sesión:", error.message);
                    });
                });
            } else {
                // Usuario no conectado
                menu.innerHTML = `
                <nav>
                    <ul>
                        <li><a href="../index.html"><i class="fas fa-home"></i> Inicio</a></li>
                        <li><a href="../pages/login.html"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                        <li><a href="../pages/registro.html"><i class="fas fa-user-plus"></i> Registro</a></li>
                    </ul>
                </nav>
            `;
            }
        });
    } else {
        console.error("El elemento con id 'menu' no se encontró en el DOM.");
    }
});
