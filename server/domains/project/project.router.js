// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Importando el factory de validacion
import ValidateFactory from '../../services/validateFactory';
// Importando el esquema de validacion
import projectValidator from './project.validator';

// Creando una isntancia del enrutador
const router = new Router();

// Definiendo las rutas

// GET /project
router.get('/', projectController.showDashboard);

// GET /project/add
// GET /project/add-form
router.get('/add', projectController.addForm);

// POST /project/add
router.post(
  '/add',
  ValidateFactory({
    schema: projectValidator.projectSchema,
    getObject: projectValidator.getProject,
  }),
  projectController.addPost,
);

// Exportando el enrutador
export default router;