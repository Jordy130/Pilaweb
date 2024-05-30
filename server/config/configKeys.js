// Importando el DotEnv
import dotenv from 'dotenv';

// Invocacion a la funcion config de
// la instancia dotenv
dotenv.config();

// Creando un objeto de configuracion por defecto
const defaultConfig = {
  PORT: process.env.PORT || 3000,
  IP: process.env.IP || '0.0.0.0',
};

// Creando un objeto de configuracion para el modo desarrollo
const devConfig = {
  MONGO_URL: process.env.DEV_DATABASE_URL,
};

// Creando un objeto de configuracion para el modo Testing
const testConfig = {
  MONGO_URL: process.env.TEST_DATABASE_URL,
};

// Creando un objeto de configuracion para el modo Produccion
const prodConfig = {
  MONGO_URL: process.env.PROD_DATABASE_URL,
};

// Creando una función selectora
function getEnvConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

// Exportando un objeto de configuracion
export default {
  ...defaultConfig,
  ...getEnvConfig(process.env.NODE_ENV),
};