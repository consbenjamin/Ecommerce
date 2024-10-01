const productosContainer = document.getElementById('productos-container');

// Función para generar las cards de los productos de una categoría específica
function cargarProductosPorCategoria(data, categoria) {
  const categoriaSeleccionada = data.find(categoriaObj => categoriaObj.categoria === categoria);

  if (!categoriaSeleccionada) {
    console.error(`No se encontró la categoría "${categoria}"`);
    return;
  }

  const cardsHTML = categoriaSeleccionada.productos.map(producto => {
    return `
      <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
              <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
              <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">${producto.descripcion}</p>
                  <p class="card-text"><strong>Precio: $${producto.precio}</strong></p>
                  <a href="#" class="btn btn-primary">Ver más</a>
              </div>
          </div>
      </div>
    `;
  }).join('');

  productosContainer.innerHTML = cardsHTML;
}

// Función para cargar productos según la categoría seleccionada al hacer clic
function configurarEnlacesCategoria(data) {
  document.querySelectorAll('.categoria-link').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const categoriaSeleccionada = this.getAttribute('data-categoria');
      cargarProductosPorCategoria(data, categoriaSeleccionada);
    });
  });
}

// Usamos fetch para obtener el archivo JSON
fetch('/data/products.json') 
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    // Obtener la categoría actual del atributo data-categoria en el <body>
    const categoriaActual = document.body.getAttribute('data-categoria');
    
    if (categoriaActual) {
      cargarProductosPorCategoria(data, categoriaActual);
    } else {
      console.error('No se encontró la categoría en el atributo data-categoria.');
    }

    // Configuramos los enlaces para cambiar de categoría
    configurarEnlacesCategoria(data);
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });
