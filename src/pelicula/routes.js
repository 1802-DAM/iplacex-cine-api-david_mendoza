import express from 'express';

import {
    handleDeletePeliculaByIdRequest,
    handleGetPeliculaByIdRequest,
    handleGetPeliculasRequest,
    handleInsertPeliculaRequest,
    handleUpdatePeliculaByIdRequest
} from './controlador.js';

const peliculaRoutes = express.Router();

// POST Agregar peliculas

peliculaRoutes.post('/pelicula', handleInsertPeliculaRequest);

// GET Obtener todas las peliculas

peliculaRoutes.get('/peliculas', handleGetPeliculasRequest);

// GET Obtener peliculas por ID 

peliculaRoutes.get('/pelicula/:id', handleGetPeliculaByIdRequest);

// PUT Actualizar las peliculas

peliculaRoutes.put('/pelicula/:id', handleUpdatePeliculaByIdRequest);

// DELETE Eliminar las peliculas

peliculaRoutes.delete('/pelicula/:id', handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
