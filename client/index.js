// Cargando estilos
import './styles/style.css';
import './styles/navbar.css';
// Importando estilos de Materialize CSS
import 'materialize-css/dist/css/materialize.css';
// Importando scripts de Materialize
import 'materialize-css/dist/js/materialize';

// Importando script del dominio project
import deleteProject from './domains/project.dashboard';

// Inicializando Scripts de Materialize para interactividad
M.AutoInit();

// Cargando el script en caso de que la URL sea '/project/showDashboard'
if (
  window.location.pathname === '/project' ||
  window.location.pathname === '/project/dashboard'
) {
  window.deleteProject = deleteProject;
}

console.log('🎉 Client Server Working powered by webpack 🎉');