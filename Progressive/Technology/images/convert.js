const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directorio actual (donde está guardado este script)
const directorio = './';

// Leemos todos los archivos de la carpeta
fs.readdir(directorio, (err, archivos) => {
    if (err) {
        return console.error('Error al leer la carpeta:', err);
    }

    // Filtramos para procesar solo imágenes conocidas
    const imagenes = archivos.filter(archivo => {
        const extension = path.extname(archivo).toLowerCase();
        return extension === '.jpg' || extension === '.jpeg' || extension === '.png';
    });

    if (imagenes.length === 0) {
        return console.log('No se encontraron imágenes JPG o PNG en esta carpeta.');
    }

    console.log(`Se encontraron ${imagenes.length} imágenes. Iniciando conversión por lotes...`);

    // Procesamos cada imagen encontrada
    imagenes.forEach(archivo => {
        // Obtenemos el nombre original sin la extensión (ej. de "foto1.jpg" saca "foto1")
        const nombreOriginal = path.parse(archivo).name;
        const nombreSalida = `${nombreOriginal}.webp`;

        sharp(archivo)
            .webp({ quality: 80 })
            .toFile(nombreSalida)
            .then(() => console.log(`✅ Éxito: ${archivo} -> ${nombreSalida}`))
            .catch(err => console.error(`❌ Error procesando ${archivo}:`, err));
    });
});