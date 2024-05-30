// Importando el Router de express
import { Router } from 'express';

// Importando el controlador de usuario
import UserController from './user.controller';

// Imporntando el validador del usuario
import userValidator from './user.validator';
// Importando el factory de validacion
import ValidateFactory from '../../services/validateFactory';

// Creando la instancia del enrutador
const router = new Router();

// Definiendo las rutas

// GET /user/login
router.get('/login', UserController.login);

// Get /user/logout
router.get('/logout', UserController.logout);

// GET /user/register
router.get('/register', UserController.register);

// POST /user/register
router.post(
  '/register',
  ValidateFactory(userValidator.signUp),
  UserController.registerPost,
);

// Exportando el enrutador
export default router;