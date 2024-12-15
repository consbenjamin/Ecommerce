// Redirigir si ya está logueado
window.addEventListener('DOMContentLoaded', () => {
  const userSession = sessionStorage.getItem('userSession');
  if (userSession) {
    window.location.href = '../index.html';
  }
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Obtener usuarios desde localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Buscar un usuario con el email y password proporcionados
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    alert(`¡Bienvenido, ${user.nombre}!`);

    // Guardar datos de sesión en sessionStorage
    sessionStorage.setItem('userSession', JSON.stringify({
      email: user.email,
      nombre: user.nombre,
      loggedIn: true
    }));

    // Redirigir a la página principal
    window.location.href = "../index.html";
  } else {
    alert("Credenciales inválidas. Intenta nuevamente.");
  }
});
