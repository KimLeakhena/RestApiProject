const jwt = require("jsonwebtoken");

// Middleware to verify JWT 
function verifyOrdinaryUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token." });
        }

        req.user = decoded;
        next();
    });
}

// Middleware to check admin 
function verifyAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        res.status(403).json({
            message: "You are not authorized to perform this operation!"
        });
    }
}

module.exports = {
    verifyOrdinaryUser,
    verifyAdmin
};
