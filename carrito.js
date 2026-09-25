// =========================================================
// SISTEMA DE CARRITO MENCHO'S
// =========================================================


// =========================================================
// CARGAR CARRITO
// =========================================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// =========================================================
// FORMATO DE PRECIO
// =========================================================

function formatoPrecio(precio) {

    return "$" + Number(precio).toLocaleString("es-CO");

}


// =========================================================
// GUARDAR CARRITO
// =========================================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// =========================================================
// AGREGAR PRODUCTO
// =========================================================

function agregarAlCarrito(nombre, precio) {

    // Buscar producto existente
    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );


    if (productoExistente) {

        // Si existe, aumentar cantidad
        productoExistente.cantidad++;

    } else {

        // Si no existe, agregarlo
        carrito.push({

            nombre: nombre,
            precio: Number(precio),
            cantidad: 1

        });

    }


    // Guardar cambios
    guardarCarrito();


    // Actualizar contador
    actualizarContador();


    // Mostrar mensaje
    mostrarMensaje(
        `${nombre} agregado al carrito`
    );

}


// =========================================================
// ACTUALIZAR CONTADOR DEL CARRITO
// =========================================================

function actualizarContador() {

    const contador =
        document.getElementById("cart-count");


    if (!contador) {

        return;

    }


    const cantidadTotal =
        carrito.reduce(
            (total, producto) =>
                total + Number(producto.cantidad),
            0
        );


    contador.textContent =
        cantidadTotal;

}


// =========================================================
// MOSTRAR MENSAJE
// =========================================================

function mostrarMensaje(mensaje) {

    const alerta =
        document.createElement("div");


    alerta.className =
        "alert alert-success position-fixed shadow";


    alerta.style.top =
        "90px";

    alerta.style.right =
        "20px";

    alerta.style.zIndex =
        "9999";

    alerta.style.borderRadius =
        "15px";

    alerta.style.fontWeight =
        "600";


    alerta.innerHTML = `

        <i class="bi bi-check-circle-fill me-2"></i>

        ${mensaje}

    `;


    document.body.appendChild(
        alerta
    );


    setTimeout(() => {

        alerta.remove();

    }, 2000);

}


// =========================================================
// MOSTRAR CARRITO
// =========================================================

function mostrarCarrito() {

    const container =
        document.getElementById("cart-items");


    const emptyCart =
        document.getElementById("empty-cart");


    // Si estamos en una página que no es carrito.html
    if (!container || !emptyCart) {

        return;

    }


    // Limpiar productos anteriores
    container.innerHTML = "";


    // =====================================================
    // CARRITO VACÍO
    // =====================================================

    if (carrito.length === 0) {

        emptyCart.classList.remove(
            "d-none"
        );


        actualizarResumen();

        return;

    }


    // Ocultar mensaje de carrito vacío
    emptyCart.classList.add(
        "d-none"
    );


    // =====================================================
    // MOSTRAR PRODUCTOS
    // =====================================================

    carrito.forEach(
        (producto, index) => {


            const item =
                document.createElement("div");


            item.className =
                "cart-card";


            item.innerHTML = `

                <div class="row align-items-center g-3">


                    <!-- PRODUCTO -->

                    <div class="col-md-6">

                        <div class="d-flex align-items-center">


                            <div class="cart-product-icon">

                                <i class="bi bi-pie-chart-fill"></i>

                            </div>


                            <div class="ms-3">


                                <h5 class="cart-product-name">

                                    ${producto.nombre}

                                </h5>


                                <div class="cart-product-price">

                                    ${formatoPrecio(producto.precio)}
                                    cada uno

                                </div>

                            </div>

                        </div>

                    </div>


                    <!-- CANTIDAD -->

                    <div class="col-md-4">

                        <div class="quantity-control justify-content-center">


                            <button
                                type="button"
                                class="quantity-btn"
                                onclick="cambiarCantidad(${index}, -1)"
                                aria-label="Disminuir cantidad">

                                <i class="bi bi-dash"></i>

                            </button>


                            <span class="quantity-number">

                                ${producto.cantidad}

                            </span>


                            <button
                                type="button"
                                class="quantity-btn"
                                onclick="cambiarCantidad(${index}, 1)"
                                aria-label="Aumentar cantidad">

                                <i class="bi bi-plus"></i>

                            </button>

                        </div>

                    </div>


                    <!-- ELIMINAR -->

                    <div class="col-md-2 text-end">


                        <button
                            type="button"
                            class="delete-btn"
                            onclick="eliminarProducto(${index})"
                            title="Eliminar producto"
                            aria-label="Eliminar producto">

                            <i class="bi bi-trash3"></i>

                        </button>

                    </div>


                    <!-- SUBTOTAL -->

                    <div class="col-12">


                        <div class="text-end">


                            <strong
                                style="
                                    color: var(--color-beige-claro);
                                    font-size: 1.2rem;
                                ">

                                ${formatoPrecio(
                                    producto.precio *
                                    producto.cantidad
                                )}

                            </strong>


                        </div>

                    </div>


                </div>

            `;


            container.appendChild(
                item
            );

        }
    );


    // Actualizar resumen
    actualizarResumen();

}


// =========================================================
// CAMBIAR CANTIDAD
// =========================================================

function cambiarCantidad(index, cambio) {

    // Comprobar que existe el producto
    if (!carrito[index]) {

        return;

    }


    carrito[index].cantidad =
        Number(carrito[index].cantidad) +
        cambio;


    // Si llega a cero, eliminar
    if (carrito[index].cantidad <= 0) {

        carrito.splice(
            index,
            1
        );

    }


    // Guardar
    guardarCarrito();


    // Actualizar pantalla
    mostrarCarrito();


    // Actualizar contador
    actualizarContador();

}


// =========================================================
// ELIMINAR PRODUCTO
// =========================================================

function eliminarProducto(index) {

    // Comprobar que existe
    if (!carrito[index]) {

        return;

    }


    const nombre =
        carrito[index].nombre;


    // Eliminar
    carrito.splice(
        index,
        1
    );


    // Guardar
    guardarCarrito();


    // Actualizar carrito
    mostrarCarrito();


    // Actualizar contador
    actualizarContador();


    // Mostrar mensaje
    mostrarMensaje(
        `${nombre} eliminado del carrito`
    );

}


// =========================================================
// ACTUALIZAR RESUMEN
// =========================================================

function actualizarResumen() {

    const resumenProductos =
        document.getElementById(
            "summary-items"
        );


    const resumenSubtotal =
        document.getElementById(
            "summary-subtotal"
        );


    const resumenTotal =
        document.getElementById(
            "summary-total"
        );


    let cantidadTotal = 0;

    let subtotal = 0;


    // =====================================================
    // CALCULAR
    // =====================================================

    carrito.forEach(
        producto => {

            const cantidad =
                Number(producto.cantidad);


            const precio =
                Number(producto.precio);


            cantidadTotal +=
                cantidad;


            subtotal +=
                precio * cantidad;

        }
    );


    // =====================================================
    // MOSTRAR
    // =====================================================

    if (resumenProductos) {

        resumenProductos.textContent =
            cantidadTotal;

    }


    if (resumenSubtotal) {

        resumenSubtotal.textContent =
            formatoPrecio(subtotal);

    }


    if (resumenTotal) {

        resumenTotal.textContent =
            formatoPrecio(subtotal);

    }


    // Actualizar botón de WhatsApp
    actualizarBotonWhatsApp();

}


// =========================================================
// BOTÓN WHATSAPP
// =========================================================

function actualizarBotonWhatsApp() {

    const boton =
        document.getElementById(
            "whatsapp-btn"
        );


    if (!boton) {

        return;

    }


    if (carrito.length === 0) {

        boton.disabled = true;

        boton.innerHTML = `

            <i class="bi bi-cart-x me-2"></i>

            Carrito vacío

        `;

    } else {

        boton.disabled = false;

        boton.innerHTML = `

            <i class="bi bi-whatsapp me-2"></i>

            Pedir por WhatsApp

        `;

    }

}


// =========================================================
// PEDIDO POR WHATSAPP
// =========================================================

function realizarPedido() {

    // Comprobar carrito vacío
    if (carrito.length === 0) {

        mostrarMensaje(
            "Tu carrito está vacío"
        );

        return;

    }


    // =====================================================
    // NÚMERO DE WHATSAPP
    // =====================================================

    const telefono =
        "573228446603";


    // =====================================================
    // MENSAJE
    // =====================================================

    let mensaje =
        "Hola, Mencho's 👋\n\n";


    mensaje +=
        "Quiero realizar el siguiente pedido:\n\n";


    let total = 0;


    // =====================================================
    // PRODUCTOS
    // =====================================================

    carrito.forEach(
        producto => {


            const cantidad =
                Number(producto.cantidad);


            const precio =
                Number(producto.precio);


            const subtotal =
                precio * cantidad;


            total +=
                subtotal;


            mensaje +=
                `🍽️ ${producto.nombre}\n`;


            mensaje +=
                `Cantidad: ${cantidad}\n`;


            mensaje +=
                `Precio: ${formatoPrecio(precio)}\n`;


            mensaje +=
                `Subtotal: ${formatoPrecio(subtotal)}\n\n`;

        }
    );


    // =====================================================
    // TOTAL
    // =====================================================

    mensaje +=
        "────────────────────\n";


    mensaje +=
        `TOTAL: ${formatoPrecio(total)}\n\n`;


    mensaje +=
        "Quedo atento a la confirmación del pedido.\n";


    mensaje +=
        "¡Gracias! 😊";


    // =====================================================
    // CREAR URL
    // =====================================================

    const url =
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;


    // Abrir WhatsApp
    window.open(
        url,
        "_blank"
    );

}


// =========================================================
// INICIAR SISTEMA
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // Actualizar contador
        actualizarContador();


        // Mostrar carrito si estamos en carrito.html
        mostrarCarrito();


    }
);