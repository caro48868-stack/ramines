// 1. Inicializamos el lienzo de Fabric.js sobre nuestro elemento con id "jardin"
const canvas = new fabric.Canvas('jardin');

// 2. Función para añadir una flor al lienzo cuando se hace clic en el menú
document.querySelectorAll('.flor-item').forEach(img => {
  img.addEventListener('click', function() {
    const urlImagen = this.getAttribute('data-img');
    
    // Cargamos la imagen de la flor
    fabric.Image.fromURL(urlImagen, function(oImg) {
      // Ajustamos el tamaño inicial de la flor para que quepa bien
      oImg.scale(0.4);
      
      // La posicionamos en el centro del lienzo verde
      oImg.set({
        left: 150,
        top: 150,
        cornerColor: '#ffffff',
        cornerStrokeColor: '#4a5d4e',
        borderColor: '#4a5d4e',
        cornerSize: 10,
        transparentCorners: false,
        cornerStyle: 'circle' // Hace que los controles de las esquinas sean redondos y estéticos
      });
      
      // Añadimos la flor al lienzo y la dejamos seleccionada
      canvas.add(oImg);
      canvas.setActiveObject(oImg);
    });
  });
});

// 3. Botón "Borrar seleccionada"
document.getElementById('btn-borrar').addEventListener('click', function() {
  const objetoActivo = canvas.getActiveObject();
  if (objetoActivo) {
    canvas.remove(objetoActivo);
  } else {
    alert('Por favor, haz clic primero en la flor que quieras borrar.');
  }
});

// 4. Botón "Empezar de nuevo" (Limpia todo el lienzo)
document.getElementById('btn-limpiar').addEventListener('click', function() {
  if (confirm('¿Seguro que quieres borrar todo tu ramo y empezar de nuevo?')) {
    canvas.clear();
  }
});
