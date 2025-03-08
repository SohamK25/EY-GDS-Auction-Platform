import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ message: "Unauthorized - No token Provided" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Token Invalid" })
        }


        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in middleware", error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

export default authenticate;