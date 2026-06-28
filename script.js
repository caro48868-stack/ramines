// 1. Inicializamos el lienzo
const canvas = new fabric.Canvas('jardin');

// Variable para controlar si el lazo ya se ha puesto
let lazoPuesto = false; 

// 2. Función para añadir una flor al hacer clic en el menú
document.querySelectorAll('.flor-item').forEach(img => {
  img.addEventListener('click', function() {
    const urlImagen = this.getAttribute('data-img');
    
    fabric.Image.fromURL(urlImagen, function(oImg) {
      oImg.scale(0.4); // Tamaño inicial de las flores
      oImg.set({
        left: 150,
        top: 150,
        cornerColor: '#ffffff',
        cornerStrokeColor: '#4a5d4e',
        borderColor: '#4a5d4e',
        cornerSize: 10,
        transparentCorners: false,
        cornerStyle: 'circle',
        tipo: 'flor' // Etiqueta para identificarlas
      });
      
      canvas.add(oImg);
      canvas.setActiveObject(oImg);
      
      // Comprobamos si hay que poner el lazo
      comprobarFloresParaLazo();
    });
  });
});

// Función que cuenta las flores y añade tu lazo
function comprobarFloresParaLazo() {
  const todosLosObjetos = canvas.getObjects();
  const numeroDeFlores = todosLosObjetos.filter(obj => obj.tipo === 'flor').length;
  
  // Si hay 4 o más flores y el lazo no está puesto...
  if (numeroDeFlores >= 4 && !lazoPuesto) {
    
    // Buscamos tu archivo "lazo.png" en la carpeta flores
    fabric.Image.fromURL('flores/lazo.png', function(oLazo) {
      oLazo.scale(0.5); // Ajusta este número si quieres el lazo más grande o pequeño
      oLazo.set({
        left: 160, 
        top: 220, // Posicionado estratégicamente abajo en el centro
        cornerColor: '#ffffff',
        cornerStrokeColor: '#4a5d4e',
        borderColor: '#4a5d4e',
        cornerSize: 10,
        transparentCorners: false,
        cornerStyle: 'circle',
        tipo: 'lazo'
      });
      
      canvas.add(oLazo);
      oLazo.bringToFront(); // Al frente de las flores
      canvas.renderAll();
      
      lazoPuesto = true; 
    });
  }
}

// 3. Botón "Borrar seleccionada"
document.getElementById('btn-borrar').addEventListener('click', function() {
  const objetoActivo = canvas.getActiveObject();
  if (objetoActive) {
    if (objetoActivo.tipo === 'lazo') {
      lazoPuesto = false;
    }
    canvas.remove(objetoActivo);
    setTimeout(comprobarFloresParaLazo, 100);
  } else {
    alert('Por favor, haz clic primero en la flor que quieras borrar.');
  }
});

// 4. Botón "Empezar de nuevo"
document.getElementById('btn-limpiar').addEventListener('click', function() {
  if (confirm('¿Seguro que quieres borrar todo tu ramo y empezar de nuevo?')) {
    canvas.clear();
    lazoPuesto = false; 
  }
});
