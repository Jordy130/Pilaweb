// Importando la funcionalidad de log
import log from '../../config/winston';
// Action Methods

// GET /user/login
const login = (req, res) => {
  // Loggear la solicitud
  log.info('Se entrega formulario de login');
  // Servir la vista de login
  res.render('user/login');
};

// GET "/user/logout"
const logout = (req, res) => {
  res.send('⚠️ UNDER CONSTRUCTION: GET /user/logout ⚠️');
};

// GET "/user/register"
const register = (req, res) => {
  log.info('Se entrega formulario de registro');
  res.render('user/register');
};

export default { login, logout, register };