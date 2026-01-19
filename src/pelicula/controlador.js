import { ObjectId } from 'mongodb';
import { getDatabase } from '../common/db.js';

const peliculaCollection = () => getDatabase().collection('peliculas');

//  Agregar peliculas
export const handleInsertPeliculaRequest = async (req, res) => {
  try {
    const { nombre, generos, anioEstreno } = req.body;

    // Validar campos solicitados
    if (!nombre || !generos || !anioEstreno) {
      return res.status(400).json({ error: 'Llenar campos solicitados' });
    }

    // Insertar en base de datos
    const resultado = await peliculaCollection().insertOne({
      nombre,
      generos,
      anioEstreno
    });

    res.status(201).json({ _id: resultado.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las peliculas
export const handleGetPeliculasRequest = async (req, res) => {
  try {
    const peliculas = await peliculaCollection().find({}).toArray();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener pelicula por ID
export const handleGetPeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Confirmar que el ID sea correcto
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID mal escrito' });
    }

    const pelicula = await peliculaCollection().findOne({
      _id: new ObjectId(id)
    });

    if (!pelicula) {
      return res.status(404).json({ error: 'Tu pelicula no pudo ser encontrada' });
    }

    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar pelicula
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizaciones = req.body;

    // Validar ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID mal escrito' });
    }

    const resultado = await peliculaCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: actualizaciones }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ error: 'Tu pelicula no pudo ser encontrada' });
    }

    res.status(200).json({ modificados: resultado.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar película
export const handleDeletePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID mal escrito' });
    }

    const resultado = await peliculaCollection().deleteOne({
      _id: new ObjectId(id)
    });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: 'Tu pelicula no pudo ser encontrada' });
    }

    res.status(200).json({ eliminados: resultado.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
