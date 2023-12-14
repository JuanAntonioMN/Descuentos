const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;
const validTokens = new Set();

const CLIENT_ID = '2268949912448074';
const CLIENT_SECRET = '71HPjCABWCAqZNLeysteQm0WHlonpoLq';
const ACCESS_TOKEN = 'APP_USR-2268949912448074-120514-cf9acd378da6c3e0c1d5fc0c5f882d62-1578043937';
const dataFilePath = '/home/servidor2/compartido2/usuarios.txt';
app.use(express.json());

// Agrega el middleware cors
app.use(cors({ origin: '*' }));


const axiosInstance = axios.create({
    baseURL: 'https://api.mercadolibre.com',
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
});

const roundToTwoDecimals = (value) => {
    return value !== null ? Math.round(value * 100) / 100 : null;
};

const handleErrors = (res, error, status = 500) => {
    console.error(error);
    res.status(status).json({ error: 'Internal Server Error' });
};

const formatProduct = (product) => {
    const price = roundToTwoDecimals(product.price);
    const originalPrice = roundToTwoDecimals(product.original_price);

    if (price !== null && originalPrice !== null) {
        const discountPercentage = calculateDiscountPercentage(originalPrice, price);
        
        return {
            ...product,
            price,
            original_price: originalPrice,
            discount_percentage: discountPercentage,
        };
    }

    return null; // No se incluirá en la lista final si falta algún precio
};

const calculateDiscountPercentage = (originalPrice, salePrice) => {
    const discount = originalPrice - salePrice;
    const discountPercentage = (discount / originalPrice) * 100;
    return roundToTwoDecimals(discountPercentage);
};

const filterProducts = (results) => {
    // Filtra los productos que tienen tanto precio actual como precio original
    return results.filter(product => product.price !== null && product.original_price !== null);
};

app.get('/productos-ropa', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=ropa');

        const filteredProducts = filterProducts(response.data.results);
        const formattedProducts = filteredProducts.map(formatProduct).filter(Boolean); // Elimina elementos nulos

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-tenis', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=tenis');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-zapatos', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=zapatos');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});
app.get('/productos-peliculas', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=peliculas');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-joyas', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=joyas');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-libros', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=libros');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Instrumentos', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Instrumentos');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Salud', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Salud');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Fiestas', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Fiestas');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Servicios', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Servicios');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Otras-categorias', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Otras categorias');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});


app.get('/productos-Motos', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Motos');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Belleza', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Belleza');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});
app.get('/productos-Camaras', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Camaras');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Celulares', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Celulares');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Consolas', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Consolas');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

app.get('/productos-Video-juegos', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Video Juegos');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});
app.get('/productos-Deportes', async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites/MLM/search?q=Deportes');

        const formattedProducts = response.data.results.map(formatProduct);

        res.json(formattedProducts);
    } catch (error) {
        handleErrors(res, error);
    }
});

// En el servidor, dentro de la ruta '/iniciar-sesion'
app.post('/iniciar-sesion', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (correo && contrasena) {
            // Aquí debes verificar las credenciales (reemplaza con tu lógica de autenticación)
            const credencialesValidas = verificarCredenciales(correo, contrasena);

            if (credencialesValidas) {
                // Credenciales válidas, enviar un token de autenticación
                res.json({ token: 'tu_token' });
            } else {
                // Credenciales incorrectas, enviar un código de estado 401
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } else {
            // Faltan credenciales, enviar un código de estado 400
            res.status(400).json({ error: 'Faltan credenciales' });
        }
    } catch (error) {
        // Manejo de otros errores
        handleErrors(res, error);
    }
});
async function verificarCredenciales(correo, contrasena) {
    try {
        // Lee el contenido del archivo
        const contenido = await fs.readFile(dataFilePath, 'utf8');

        // Divide el contenido en líneas
        const lineas = contenido.split('\n');

        // Busca el usuario con el correo y contraseña proporcionados
        const usuarioEncontrado = lineas.find(linea => {
            const [correoGuardado, contrasenaGuardada] = linea.split('\n'); 

            // Comparación de credenciales
            return correoGuardado === correo && contrasenaGuardada === contrasena;
        });

        return !!usuarioEncontrado; // Devuelve true si se encontraron las credenciales
    } catch (error) {
        console.error(error);
        return false; // Devuelve false en caso de error
    }
}

// Endpoint para guardar información en el archivo de texto
app.post('/guardar-informacion', async (req, res) => {
    try {
      // Ejemplo de cómo podrías recibir datos desde el formulario
      const { nombre, edad, correo, contrasena } = req.body;
  
      // Crea una cadena de texto con los nuevos datos
      const newDataString = `Nombre: ${nombre}\nEdad: ${edad}\nCorreo: ${correo}\nContraseña: ${contrasena}\n`;
  
      // Añade los nuevos datos al final del archivo con appendFile
      await fs.appendFile(dataFilePath, newDataString + '\n', 'utf8');
  
      // Envía un objeto JSON con un mensaje
      res.json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      handleErrors(res, error);
    }
  });

 

// Endpoint para cerrar sesión y cambiar la clave secreta
app.post('/cerrar-sesion', (req, res) => {
    // Cambia la clave secreta utilizada para firmar los tokens
    // Genera una nueva clave secreta y úsala para firmar los tokens futuros
    const nuevaClaveSecreta = generarNuevaClaveSecreta(); // Implementa la lógica para generar una nueva clave
    claveSecreta = nuevaClaveSecreta;
  
    res.json({ message: 'Sesión cerrada exitosamente' });
  });
  
  const crypto = require('crypto');

  function generarNuevaClaveSecreta() {
    const nuevaClave = crypto.randomBytes(32).toString('hex'); // Genera una cadena hexadecimal de 32 bytes
    return nuevaClave;
  }
  
  
  
  
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en http://0.0.0.0:${PORT}`);
});

