const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');

// Función para cargar los productos del carrito desde localStorage
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('cartItems');

  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<tr><td colspan="5" class="text-center">Tu carrito está vacío.</td></tr>';
    return;
  }

  let total = 0;
  const carritoHTML = carrito.map(producto => {

    total += producto.precio * producto.cantidad;
    return `
      <tr>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td>${producto.cantidad}</td>
        <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button></td>
      </tr>
    `;
  }).join('');

  carritoContainer.innerHTML = carritoHTML;
  document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function eliminarDelCarrito(productId) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(producto => producto.id !== productId);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

// Cargar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);
