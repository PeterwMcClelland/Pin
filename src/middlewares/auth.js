const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Check if the authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    
    // Verify and decode the token
    const decodedToken = jwt.verify(token, 'your-secret-key');
    
    // Attach the decoded token to the request object
    req.userData = { userId: decodedToken.userId };

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  authenticateUser,
};