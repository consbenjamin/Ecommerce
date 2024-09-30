const productosContainer = document.getElementById('productos-container');

// Función para generar las cards de los productos
function cargarProductos(data) {
  // Verificamos que 'data' es un array antes de intentar usar .find()
  if (!Array.isArray(data)) {
    console.error('El formato de los datos no es correcto.');
    return;
  }

  // Buscamos la categoría "pantalones"
  const categoriaPantalones = data.find(categoria => categoria.categoria === 'pantalones');

  // Verificamos si la categoría fue encontrada
  if (!categoriaPantalones) {
    console.error('No se encontró la categoría "pantalones" en el archivo JSON');
    return;
  }

  // Verificamos si tiene productos
  if (!Array.isArray(categoriaPantalones.productos) || categoriaPantalones.productos.length === 0) {
    console.error('No hay productos en la categoría "pantalones"');
    return;
  }

  // Generamos las cards de los productos
  const cardsHTML = categoriaPantalones.productos.map(producto => {
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

  // Insertamos las cards en el contenedor
  productosContainer.innerHTML = cardsHTML;
}

// Usamos fetch para obtener el archivo JSON
fetch('/data/products.json') 
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json(); // Convertimos la respuesta a JSON
  })
  .then(data => {
    cargarProductos(data); // Cargamos los productos desde el JSON
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });