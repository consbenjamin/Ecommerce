const footerTemplate = `
<footer class="bg-light text-dark text-center py-4 mt-5 border-top shadow-sm">
  <div class="container">
      <div class="row">
          <!-- Sección Información -->
          <div class="col-md-4 mb-3">
              <h5 class="fw-bold">Sobre Nosotros</h5>
              <p class="small">Somos una tienda de ropa dedicada a ofrecer productos de calidad con diseños exclusivos, al alcance de todos.</p>
          </div>
          <!-- Sección Enlaces -->
          <div class="col-md-4 mb-3">
              <h5 class="fw-bold">Enlaces</h5>
              <ul class="list-unstyled">
                  <li><a href="../index.html" class="text-dark text-decoration-none">Inicio</a></li>
                  <li><a href="/pages/calzado.html" class="text-dark text-decoration-none">Calzado</a></li>
                  <li><a href="/pages/remeras.html" class="text-dark text-decoration-none">Remeras</a></li>
                  <li><a href="/pages/pantalones.html" class="text-dark text-decoration-none">Pantalones</a></li>
              </ul>
          </div>
          <!-- Sección Redes Sociales -->
          <div class="col-md-4 mb-3">
              <h5 class="fw-bold">Síguenos</h5>
              <a href="#" class="text-dark me-3"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-dark me-3"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-dark me-3"><i class="bi bi-twitter"></i></a>
              <a href="#" class="text-dark"><i class="bi bi-github"></i></a>
          </div>
      </div>
      <hr class="bg-dark">
      <p class="mb-0 small">© 2024 Nombre de tu tienda. Todos los derechos reservados.</p>
  </div>
</footer>
`;

window.addEventListener('DOMContentLoaded', () => {
  const footerContainer = document.querySelector('footer');
  if (footerContainer) {
    footerContainer.innerHTML = footerTemplate;
  }
});
