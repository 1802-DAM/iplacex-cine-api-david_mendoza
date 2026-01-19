
import express, { urlencoded } from 'express'
import cors from 'cors'
import { connectDatabase } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const port = 3000 || 4000;

app.use(express.json());
app.use(express.urlencoded({ extende: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al cine Iplacex');
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

const initServer = async () => {
    try {
        await connectDatabase();
        console.log('Conexion exitosa a MongoDB Atlas');

        app.listen(port, () => {
            console.log(`Servidor Express ejecutandose en puerto ${port}`);
        });
    } catch (error) {
        console.error('Error al conectarse a MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

initServer();



