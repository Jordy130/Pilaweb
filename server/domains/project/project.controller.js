// Imporntando winston logger
import log from '../../config/winston';
// Importando el modelo de Project
import ProjectModel from './project.model';

// Actions methods

// GET "/project"
const showDashboard = (req, res) => {
  res.send('⚠️ UNDER CONSTRUCTION: GET /project ⚠️');
};

// GET "/project/add"
// GET "/project/add-form"
const addForm = (req, res) => {
  res.render('project/addView');
};

// POST "/project/add"
const addPost = async (req, res) => {
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // Si hay errores de validacion
  // Se le informa al cliente
  if (validationError) {
    log.info('Error al validar Project');
    // Desestructurando los datos de validacion
    const { value: project } = validationError;
    // Se extraen los campos que fallaron en la validacion
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Crea una variable temporal para
      // almacenar el objeto anterior
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('project/addView', { project, errorModel });
  }
  // Si no hay error de validacion
  const { validData: project } = req;
  // Se guarda el documento en la base de datos
  try {
    // Se crea la instancia de un documento de tipo Project
    const savedProject = await ProjectModel.create(project);
    // Se guarda el documento en la base de datos
    log.info('Proyecto guardado en la base de datos');
    return res.status(201).json(savedProject);
  } catch (error) {
    log.error(
      'LN49 server/domains/project/project.controller.js Error al guardar el proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

export default {
  showDashboard,
  addForm,
  addPost,
};