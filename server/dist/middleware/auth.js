import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header in "Bearer <token>" format
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return;
    }
    // Verify the token using the secret key from environment variables
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        // Attach the decoded payload to the request object for further use
        req.user = decoded;
        next();
    });
};
export default authenticateToken;
