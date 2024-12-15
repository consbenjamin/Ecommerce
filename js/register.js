// Redirigir si ya está logueado
window.addEventListener('DOMContentLoaded', () => {
  const userSession = sessionStorage.getItem('userSession');
  if (userSession) {
    window.location.href = '../../index.html';
  }
});

// Manejar el envío del formulario de registro
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const fechaNacimiento = document.getElementById('fecha_nacimiento').value;

  // Validaciones básicas
  if (!nombre || !apellido || !email || !password || !fechaNacimiento) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (password.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  // Simular guardado en localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Verificar si el correo ya está registrado
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    alert("El correo electrónico ya está registrado. Intenta con otro.");
    return;
  }

  // Guardar el nuevo usuario
  users.push({
    nombre,
    apellido,
    email,
    password,
    fechaNacimiento
  });
  localStorage.setItem('users', JSON.stringify(users));

  alert("¡Registro exitoso! Ahora puedes iniciar sesión.");

  // Redirigir al login
  window.location.href = "../pages/login.html";
});
