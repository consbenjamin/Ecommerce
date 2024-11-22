const navElements = [
  {
    title: 'Inicio',
    link: '../index.html',
    icon: 'bi-house'
  },
  {
    title: 'Calzado',
    link: '/pages/calzado.html'
  },
  {
    title: 'Remeras',
    link: '/pages/remeras.html'
  },
  {
    title: 'Pantalones',
    link: '/pages/pantalones.html'
  },
  {
    title: 'Carrito',
    link: '/pages/carrito.html',
    icon: 'bi-cart'
  },
  {
    title: 'Login',
    link: '/pages/login.html',
    icon: 'bi-person',
    action: 'login'
  },
  {
    title: 'Logout',
    link: '#',
    icon: 'bi-box-arrow-right',
    action: 'logout'
  }
]

// Generar el navbar
const generateNavBar = (isLoggedIn) => {
  return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="../index.html">
                <img src="/assets/images/logo-tienda.webp" alt="Logo de la tienda" style="height: 60px;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    ${navElements.map(element => {
                      // Mostrar login solo si el usuario no está logueado, y logout solo si está logueado
                      if ((element.action === 'login' && isLoggedIn) || (element.action === 'logout' && !isLoggedIn)) {
                        return '';
                      }
                      return `
                        <li class="nav-item">
                          <a class="nav-link ${element.action ? 'nav-action' : ''}" href="${element.link}" ${element.action ? `data-action="${element.action}"` : ''}>
                            ${element.icon ? `<i class="bi ${element.icon} me-1"></i>` : ''}
                            ${element.title}
                          </a>
                        </li>
                      `;
                    }).join('')}
                </ul>
            </div>
        </div>
    </nav>
  `;
};


const isLoggedIn = !!sessionStorage.getItem('userSession'); // Si hay sesión activa

// Insertar el navbar en el DOM
let navContainer = document.querySelector('header');
window.addEventListener('DOMContentLoaded', () => {
  navContainer.innerHTML = generateNavBar(isLoggedIn);


  const logoutBtn = document.querySelector('a[data-action="logout"]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Eliminar datos de sesión
      sessionStorage.removeItem('userSession'); 
      window.location.href = '/pages/login.html';
    });
  }
});
