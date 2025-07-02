import jwt from 'jsonwebtoken';

// Middleware to protect routes
// TO BE USED IN THE CART ROUTE OR CHECKOUT ROUTE
export const verifyToken = (req, res, next) => {
  try {
    // Get token from the "Authorization" header
    const authHeader = req.headers.authorization;

    // Check if token is present and in the correct format: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided!" });
    }

    // Extract the actual token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from token payload to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};