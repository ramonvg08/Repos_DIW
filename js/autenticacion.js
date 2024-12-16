// js/autenticacion.js

import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { doc, setDoc, updateDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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
                // Iniciar sesión con Firebase Auth
                const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
                const user = userCredential.user;

                // Referencia al documento del usuario
                const docRef = doc(db, "usuarios", user.uid);

                // Verificar si el documento existe
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Si existe, actualiza el campo 'ultimaSesion'
                    await updateDoc(docRef, {
                        ultimaSesion: serverTimestamp()
                    });
                    console.log("Última sesión actualizada.");
                } else {
                    // Si no existe, crea un nuevo documento
                    console.warn("Documento de usuario no encontrado. Creando uno nuevo.");
                    await setDoc(docRef, {
                        correo: user.email,
                        ultimaSesion: serverTimestamp()
                    });
                    console.log("Nuevo documento de usuario creado.");
                }

                // Redirigir al usuario a la página principal
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
                <a href="index.html" class="logo"><i id="logoLetra" style="font-family: 'Modak', cursive; font-size: 3rem">!M</i></a>
                <div class="user-menu">
                    <i class="fas fa-user" id="user-icon"></i>
                    <div class="user-dropdown">
                        <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>
                    </div>
                </div>
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
                <a href="index.html" class="logo"><i id="logoLetra" style="font-family: 'Modak', cursive; font-size: 3rem">!M</i></a>
                <div class="user-menu">
                    <i class="fas fa-user" id="user-icon"></i>
                    <div class="user-dropdown">
                        <a href="pages/login.html">Iniciar sesión</a>
                        <a href="pages/registro.html">Registrarse</a>
                    </div>
                </div>
            `;
            }
        });
    } else {
        console.error("El elemento con id 'menu' no se encontró en el DOM.");
    }
});
