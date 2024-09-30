// Redirigir si ya está logueado
window.addEventListener('DOMContentLoaded', () => {
  const userSession = localStorage.getItem('userSession');
  if (userSession) {
    window.location.href = '/pages/index.html'; // Si ya está logueado, redirigir a la página principal
  }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de manera convencional

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simulación de validación (reemplazar con lógica real más adelante)
  const validEmail = "admin@hotmail.com"; 
  const validPassword = "admin123"; 
  if (email === validEmail && password === validPassword) {
      alert("¡Inicio de sesión exitoso!");

      // Guardar datos de sesión en localStorage
      localStorage.setItem('userSession', JSON.stringify({
        email: email, // Almacena el email u otros datos relevantes
        loggedIn: true
      }));

      // Redirigir al usuario a la página principal)
      window.location.href = "/pages/index.html"; // Cambia la URL según tu estructura
  } else {
      alert("Credenciales inválidas. Intenta nuevamente.");
  }
});
