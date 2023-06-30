
exports.redirectToDefaultHomePage = (req, res, next) => {
  return res.redirect('/admin/contacts');
};

exports.getLoginPage = (req, res, next) => {
  const errorMessage = req.session.errorMessage;
  delete req.session.errorMessage;

  res.status(200).render('back/login', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs',
    errorMessage: errorMessage
  });
};