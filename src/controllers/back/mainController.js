
exports.redirectToDefaultHomePage = (req, res) => {
  return res.redirect('/admin/contacts');
};

exports.getLoginPage = (req, res) => {
  const errorMessage = req.session.errorMessage;
  delete req.session.errorMessage;

  res.status(200).render('back/login', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs',
    errorMessage: errorMessage
  });
};

exports.setCurrentPageInfo = (sendedCurrentPage) => {
  return (req, res, next) => {
    req.body.currentPage = sendedCurrentPage;
    next();
  };
};