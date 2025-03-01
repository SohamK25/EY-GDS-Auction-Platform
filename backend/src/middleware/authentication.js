import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(400).json({message: "Unauthorized"});
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.status(400).json({message: "Inavalid token"});
        req.user = user;
        next();
    })
}

export default authenticate;
