// Imporntando winston logger
import log from '../../config/winston';
// Importando el modelo de Project
import ProjectModel from './project.model';

// Actions methods

// GET "/project"
// GET "/project/dashboard"
const showDashboard = async (req, res) => {
  try {
    // Consultando todos los proyectos
    const projects = await ProjectModel.find({}).lean().exec();
    // Respondiendo con la lista de proyectos al cliente
    log.info('Proyectos consultados correctamente');
    return res.render('project/dashboardView', { projects });
  } catch (error) {
    log.error(
      'LN16 server/domains/project/project.controller.js Error al consultar todos los proyectos',
    );
    return res.status(500).json(error);
  }
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
    log.info(`Proyecto guardado en la base de datos: ${savedProject}`);
    // Generando un mensaje flash
    req.flash('successMessage', 'Proyecto creado exitosamente');
    // Se redirige al cliente a la vista de dashboard
    log.info('Redirigiendo al cliente a la vista de dashboard');
    return res.redirect('/project/dashboard');
  } catch (error) {
    log.error(
      'LN49 server/domains/project/project.controller.js Error al guardar el proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

// GET "/project/edit/:id"
const edit = async (req, res) => {
  // Extraer los parametros de la URL
  const { id } = req.params;
  // Consultar el proyecto por su id
  try {
    log.info(`Consultando proyecto con id: ${id}`);
    const project = await ProjectModel.findOne({ _id: id }).lean().exec();
    if (project === null) {
      log.info(`Proyecto con id: ${id} no encontrado`);
      return res
        .status(404)
        .json({ fail: `Proyecto no encontrado con el id ${id}` });
    }
    // Se manda a renderizar la vista de edicion
    log.info(`Proyecto con id: ${id} encontrado`);
    return res.render('project/editView', { project });
  } catch (error) {
    log.error('Error al consultar el proyecto por su id en la base de datos');
    return res.status(500).json(error);
  }
};

// PUT "/project/edit/:id"
const editPut = async (req, res) => {
  const { id } = req.params;
  // Rescatando la informacion del formulario
  const { errorData: validationError } = req;
  // Si hay errores de validacion
  if (validationError) {
    log.info(`Error al validar Project con id: ${id}`);
    // Extrayendo los datos de validacion
    const { value: project } = validationError;
    // Extrayendo los campos que fallaron en la validacion
    const errorModel = validationError.inner.reduce((prev, curr) => {
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('project/editView', { project, errorModel });
  }
  // Si no hay errores de validacion
  const project = await ProjectModel.findOne({ _id: id });
  const { validData: newProject } = req;
  project.name = newProject.name;
  project.description = newProject.description;
  try {
    // Salvando los cambios del proyecto
    log.info(`Guardando cambios del proyecto con id: ${id}`);
    await project.save();
    // Generando un mensaje flash
    req.flash('successMessage', 'Proyecto editado exitosamente');
    return res.redirect(`/project/edit/${id}`);
  } catch (error) {
    log.error(`Error al guardar los cambios del proyecto con id: ${id}`);
    return res.status(500).json(error);
  }
};

// DELETE "/project/:id"
const deleteProject = async (req, res) => {
  // Extraer el parametro id de la peticion
  const { id } = req.params;
  // Borrar el proyecto por su id
  try {
    const result = await ProjectModel.findByIdAndDelete(id);
    // Generando un mensaje flash
    req.flash('successMessage', 'Proyecto borrado exitosamente');
    // TODO: Redireccionar al dashboard
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  showDashboard,
  addForm,
  addPost,
  edit,
  editPut,
  deleteProject,
};