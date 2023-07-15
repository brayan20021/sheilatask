const jwt = require('jsonwebtoken');

// Generar un token
exports.generateToken = (userId) => {
  const payload = {
    userId: userId,
    // Otros datos que desees incluir en el token
  };

  const token = jwt.sign(payload, 'clave_secreta', { expiresIn: '1h' });

  return token;
};

// Validar un token
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'clave_secreta');
    const userId = decoded.userId;
    // Otros datos del payload

    return userId;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

exports.isLoggetIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/signin');
  }
};

exports.isNotLoggetIn = (req, res, next) => {
  if (!req.isAuthenticated) {
    return next();
  } else {
    return res.redirect('/profile');
  }
};
