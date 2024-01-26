function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    // Se o usuário estiver logado, continue com a próxima função no pipeline
    return next();
  }
  // Se o usuário não estiver logado, redirecione para a página de login
  res.redirect("/login");
}

module.exports = isAuthenticated;
