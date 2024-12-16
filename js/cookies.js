// Crear una cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Leer una cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Mostrar el aviso de cookies si no se ha aceptado
function checkCookieConsent() {
    const consent = getCookie("cookiesAccepted");
    if (!consent) {
        document.getElementById("cookieConsent").showModal();
    }
}

// Manejar la aceptación de cookies
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("acceptCookies").addEventListener("click", function() {
        setCookie("cookiesAccepted", "true", 30); // La cookie expira en 30 días
        document.getElementById("cookieConsent").close();
    });

    // Verificar el consentimiento de cookies al cargar la página
    checkCookieConsent();
}); 