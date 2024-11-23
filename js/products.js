const productosContainer = document.getElementById('productos-container');

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  const productoParaAgregar = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,  
    cantidad: producto.cantidad || 1 
  };

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(productoParaAgregar);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

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
              <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 320px; object-fit: cover;">
              <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">${producto.descripcion}</p>
                  <p class="card-text"><strong>Precio: $${producto.precio}</strong></p>

                  <div class="d-flex align-items-center mb-3">
                      <button class="btn btn-outline-secondary btn-sm" type="button" id="btn-disminuir-${producto.id}">-</button>
                      <input type="number" id="cantidad-${producto.id}" class="form-control form-control-sm mx-1" value="1" min="1" aria-label="Cantidad" style="width: 50px;">
                      <button class="btn btn-outline-secondary btn-sm" type="button" id="btn-aumentar-${producto.id}">+</button>
                  </div>

                  <button class="btn btn-primary" id="btn-agregar-${producto.id}">Agregar al Carrito</button>
              </div>
          </div>
      </div>
    `;
  }).join('');

  productosContainer.innerHTML = cardsHTML;

  // Agregar eventos para los botones de cantidad
  categoriaSeleccionada.productos.forEach(producto => {
    document.getElementById(`btn-aumentar-${producto.id}`).addEventListener('click', function() {
      const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
      inputCantidad.value = parseInt(inputCantidad.value) + 1; // Aumentar la cantidad
    });

    document.getElementById(`btn-disminuir-${producto.id}`).addEventListener('click', function() {
      const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
      const nuevaCantidad = parseInt(inputCantidad.value) - 1;
      inputCantidad.value = nuevaCantidad > 0 ? nuevaCantidad : 1; // Mantener al menos 1
    });

    document.getElementById(`btn-agregar-${producto.id}`).addEventListener('click', function() {
      const cantidadInput = document.getElementById(`cantidad-${producto.id}`);
      const cantidad = parseInt(cantidadInput.value);

      const productoAAgregar = {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: cantidad,
      };

      agregarAlCarrito(productoAAgregar);
      alert(`${producto.nombre} agregado al carrito`);
    });
  });
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
    const categoriaActual = document.body.getAttribute('data-categoria');
    
    if (categoriaActual) {
      cargarProductosPorCategoria(data, categoriaActual);
    } else {
      console.error('No se encontró la categoría en el atributo data-categoria.');
    }
    configurarEnlacesCategoria(data);
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });
