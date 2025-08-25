const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'No token provided' });
	}
	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
		req.user = decoded;
		return next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

const signToken = (payload, expiresIn = '7d') => {
	return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn });
};

module.exports = { auth, signToken };
