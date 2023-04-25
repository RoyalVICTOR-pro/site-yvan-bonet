exports.getLoginPage = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Yvan Bonet',
  });
};