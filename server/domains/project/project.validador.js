// Importando biblioteca de validacion YUP
import * as Yup from 'yup';

// Creando esquema de validacion para el proyecto
const projectSchema = Yup.object().shape({
  name: Yup.string().required('El nombre del proyecto es necesario'),
  description: Yup.string()
    .max(500, 'No escribir mas de 500 caracteres')
    .required('Se requiere una descripcion del proyecto'),
});

// Creando el extractor de datos de la peticion
const getProject = (req) => {
  // Desestructurando datos de la peticion
  const { name, description } = req.body;
  // Retornando los datos en un objeto
  return { name, description };
};

// Exportando funciones para validacion
export default {
  projectSchema,
  getProject,
};