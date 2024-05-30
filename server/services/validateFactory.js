// Usando el patron factory para
// crear un middleware de validacion
const Validator =
  ({ schema, getObject }) =>
  async (req, res, next) => {
    // Extrayendo datos de la peticion
    const dataObject = getObject(req);
    // Validando datos de la peticion
    try {
      // Validando datos de la peticion
      const validData = await schema.validate(dataObject, {
        abortEarly: false,
      });
      req.validData = validData;
    } catch (error) {
      // Retornando errores de validacion
      req.errorData = error;
    }
    // Pasando al siguiente middleware
    return next();
  };

// Exportando funcion de validacion
export default Validator;