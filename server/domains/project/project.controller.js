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

// POST "/project/add"
const addPost = (req, res) => {
  res.status(200).json(req.body);
};

export default {
  showDashboard,
  addForm,
  addPost,
};