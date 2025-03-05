import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({message:"Invalid token"});
        }

        req.user = decoded;
        next();
    });
};

export default authenticate;
