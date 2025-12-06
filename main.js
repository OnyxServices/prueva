import { supabase } from './supabase.js';

let saldoActual = 0;

const saldoEl = document.getElementById('saldo');
const setSaldoBtn = document.getElementById('setSaldo');
const saldoRestanteEl = document.getElementById('saldoRestante');
const listaComprasEl = document.getElementById('listaCompras');

const nombreProductoEl = document.getElementById('nombreProducto');
const cantidadProductoEl = document.getElementById('cantidadProducto');
const precioProductoEl = document.getElementById('precioProducto');
const agregarProductoBtn = document.getElementById('agregarProducto');

// Establecer saldo inicial
setSaldoBtn.addEventListener('click', async () => {
    saldoActual = parseFloat(saldoEl.value);
    saldoRestanteEl.textContent = saldoActual;

    // Guardar saldo en la base de datos (solo un registro)
    const { data, error } = await supabase
        .from('wallet')
        .upsert({ id: 'unique_wallet_id', monto: saldoActual });
    
    if (error) console.error(error);
});

// Agregar producto
agregarProductoBtn.addEventListener('click', async () => {
    const nombre = nombreProductoEl.value;
    const cantidad = parseInt(cantidadProductoEl.value);
    const precio = parseFloat(precioProductoEl.value);
    const totalProducto = cantidad * precio;

    if (totalProducto > saldoActual) {
        alert('Error: el producto excede el saldo disponible!');
        return;
    }

    saldoActual -= totalProducto;
    saldoRestanteEl.textContent = saldoActual.toFixed(2);

    // Guardar producto en la base de datos
    const { data, error } = await supabase
        .from('productos')
        .insert([{ nombre, cantidad, precio, total: totalProducto }]);
    
    if (error) console.error(error);

    // Mostrar en la lista
    const li = document.createElement('li');
    li.textContent = `${nombre} - Cant: ${cantidad}, Precio: ${precio}, Total: ${totalProducto}`;
    listaComprasEl.appendChild(li);

    // Limpiar inputs
    nombreProductoEl.value = '';
    cantidadProductoEl.value = '';
    precioProductoEl.value = '';
});
