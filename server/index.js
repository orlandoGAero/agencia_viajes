import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

const app = express();

// conectar a bd
db.authenticate()
    .then( () => console.log('Conectado a la bd') )
    .catch( error => console.log(error) )

// Habilitar pug - Engine Template
app.set('view engine', 'pug');
app.set('views','./server/views');

app.use((req,res,next) => {
    const date = new Date();

    res.locals.actualYear = date.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// Definir host y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});