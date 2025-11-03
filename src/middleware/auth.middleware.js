import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1] || req.cookies.accessToken
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export const isAdmin = (req, res, next) => {
    try {
        req.user.role === "admin" && next()
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
}

export  const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!req.user ||!roles.includes(req.user.role)) {
			return res.status(403).json({ message: `Access denied. Required roles: ${roles.join(", ")}` });
		}
		next();
	}
};