// Importamos manejo de sesiones
import ExpressSession from 'express-session';
// Importando soporte para mensajes flash
import ConnectFlash from 'connect-flash';
// Importando soporte para almacenar sesiones en base de datos
import MongoStore from 'connect-mongo';
// Importando la URL de la base de datos
import configKeys from './configKeys.js';

// Configurando el manejo de sesiones
const options = {
  secret: 'awesome',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: configKeys.MONGO_URL,
    ttl: 1 * 24 * 60 * 60, // 1 día
  }),
};

// Exportando funcion de configuracion de sesiones
export default (app) => {
  // Creando el middleware de sesiones
  const sessionsMiddleware = ExpressSession(options);
  // Registrando el middleware de sesiones
  app.use(sessionsMiddleware);
  // Registrando el middleware de mensajes flash
  app.use(ConnectFlash());
  // Creando el middleware para resctatar los mensajes
  // de las sesiones
  app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.infoMessage = req.flash('infoMessage');
    // Esta linea de codigo servira para Passport
    res.locals.passportError = req.flash('error');
    next();
  });
  // Retorno la instancia de express
  return app;
};