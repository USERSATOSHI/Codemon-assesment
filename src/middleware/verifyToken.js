import { decrypt } from "../util.js";

export default function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        const decoded = decrypt(bearerToken, process.env.SECURITY_KEY);
        if (decoded !== process.env.ADMIN_KEY)
            return res.status(403).json({
                message: "Unauthorized Access",
                error: "You are not authorized to access this resource",
            });
        next();
    } else {
        return res.status(403).json({
            message: "Unauthorized Access",
            error: "You are not authorized to access this resource",
        });
    }
}
