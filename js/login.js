// Redirigir si ya está logueado
window.addEventListener('DOMContentLoaded', () => {
  const userSession = sessionStorage.getItem('userSession');
  if (userSession) {
    window.location.href = '../index.html';
  }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simulación de validación
  const validEmail = "admin@hotmail.com"; 
  const validPassword = "admin123"; 
  if (email === validEmail && password === validPassword) {
      alert("¡Inicio de sesión exitoso!");

      // Guardar datos de sesión en sessionStorage
      sessionStorage.setItem('userSession', JSON.stringify({
        email: email,
        loggedIn: true
      }));

      window.location.href = "../index.html";
  } else {
      alert("Credenciales inválidas. Intenta nuevamente.");
  }
});
