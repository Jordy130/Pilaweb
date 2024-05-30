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
    res.status(422).json(validationError);
  } else {
    // Si no hay errores de validacion
    // se desestructura la informacion valida
    const { validData: project } = req;
    // Se le informa al cliente
    res.status(200).json(project);
  }
};

export default {
  showDashboard,
  addForm,
  addPost,
};