import log from '../../config/winston';
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
const addPost = (req, res) => {
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
  // Contestamos información al cliente de que se ha cargado el proyecto
  log.info('Se entrega al cliente la info del proyecto cargado');
  return res.status(200).json(project);
};

export default {
  showDashboard,
  addForm,
  addPost,
};