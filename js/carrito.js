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

// Integración de PayPal
paypal.Buttons({
  createOrder: function (data, actions) {
    const total = parseFloat(document.getElementById('cartTotal').textContent) || 0;
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2) // Total del carrito
        }
      }]
    });
  },
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (details) {
      alert('Pago realizado con éxito por ' + details.payer.name.given_name);
      // Vaciar el carrito después del pago
      localStorage.removeItem('carrito');
      cargarCarrito(); // Recargar el carrito vacío
    });
  },
  onError: function (err) {
    console.error('Error en el pago: ', err);
    alert('Ocurrió un error al procesar el pago.');
  }
}).render('#paypal-button-container'); // Renderiza el botón en el div

// Cargar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);
