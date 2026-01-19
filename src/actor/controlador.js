import { ObjectId } from 'mongodb';
import { getDatabase } from '../common/db.js';

const actorCollection = () => getDatabase().collection('actores');
const peliculasCollection = () => getDatabase().collection('peliculas');

// Agregar actor (con verificacion de pelicula)

export const handleInsertActorRequest = async (req, res) => {
  try {
    const { idPelicula, nombre, edad, estaRetirado, premios } = req.body;

    // Validar campos solicitados

    if (!idPelicula || !nombre || edad === undefined || estaRetirado === undefined) {
      return res.status(400).json({ error: 'Llenar campos solicitados' });
    }

    // Validar que idPelicula sea valido

    if (!ObjectId.isValid(idPelicula)) {
      return res.status(400).json({ error: 'ID de película mal escrito' });
    }

    // Verificar que la película existe
    const pelicula = await peliculasCollection().findOne({
      _id: new ObjectId(idPelicula)
    });

    if (!pelicula) {
      return res.status(404).json({ error: 'La película no existe' });
    }

    // Agregar actor

    const resultado = await actorCollection().insertOne({
      idPelicula: idPelicula,
      nombre,
      edad,
      estaRetirado,
      premios: premios || []
    });

    res.status(201).json({ _id: resultado.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Obtener todos los actores

export const handleGetActoresRequest = async (req, res) => {
  try {
    const actores = await actorCollection().find({}).toArray();
    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener actor por ID

export const handleGetActorByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar ID

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID mal esctrito' });
    }

    const actor = await actorCollection().findOne({
      _id: new ObjectId(id)
    });

    if (!actor) {
      return res.status(404).json({ error: 'Actor no encontrado' });
    }

    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Obtener actores por pelicula

export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
  try {
    const { pelicula } = req.params;

    // Validar que sea un ObjectId correcto
     
    if (!ObjectId.isValid(pelicula)) {
      return res.status(400).json({ error: 'ID de la película mal escrito' });
    }

    const actores = await actorCollection().find({
      idPelicula: pelicula
    }).toArray();

    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
