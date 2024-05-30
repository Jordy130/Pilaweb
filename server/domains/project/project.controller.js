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
  
  export default {
    showDashboard,
    addForm,
  };