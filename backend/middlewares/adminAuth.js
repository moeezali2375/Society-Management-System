module.exports.adminAuth = (req, res, next) => {
	if (req.isAuthenticated() && req.user.isAdmin) {
		return next();
	} else res.status(403).send("Login!");
};
