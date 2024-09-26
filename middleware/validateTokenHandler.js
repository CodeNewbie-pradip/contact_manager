const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validationToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "User is not authorized" });
                return; // Ensure no further processing
            }
            req.user = decoded.user; // Attach decoded token to request object
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.status(401).json({ message: "Authorization header missing or invalid" });
    }
});

module.exports = validationToken;
