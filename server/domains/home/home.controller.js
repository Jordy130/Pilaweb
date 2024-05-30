// Action Methods for Home Domain
// Get "/"
// GET "/index"
const home = (req, res) => {
  const iconSet = ['⭐', '🤖', '🍉', '🐞', '🎄'];
  const icon = iconSet[Math.floor(Math.random() * iconSet.length)];
  res.render('home/homeView', { icon });
};

// GET "/about"
const about = (req, res) => {
  res.render('home/aboutView', { appVersion: process.env.npm_package_version });
};

export default {
  home,
  about,
};