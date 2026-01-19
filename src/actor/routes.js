import express from 'express';
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActoresByPeliculaIdRequest,
    handleGetActorByIdRequest
} from './controlador.js';

const actorRoutes = express.Router();

// POST Agregar actor

actorRoutes.post('/actor', handleInsertActorRequest);

// GET Obtener todos los actores

actorRoutes.get('/actores', handleGetActoresRequest);

// GET Obtener actor por ID 

actorRoutes.get('/actor/:id', handleGetActorByIdRequest);

// GET Obtener a los actores por pelicula 

actorRoutes.get('/actores/:pelicula', handleGetActoresByPeliculaIdRequest);

export default actorRoutes;