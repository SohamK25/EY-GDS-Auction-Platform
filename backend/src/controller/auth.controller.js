import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please enter all the details" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })


        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            await newUser.save();
            return res.status(201).json({ message: "User registered successfully." })

        } else {
            return res.staus(400).json({ message: "Inavalid user data" })
        }
    
    } catch (error) {
        console.log("Error in signup", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all the details" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development", 
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        // console.log(token)
        return res.status(200).json({ message: "Signin Successful", token,
            user: { _id: user._id, email: user.email, username: user.username }
         });
    } catch (error) {
        console.error("Error in signin:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// export const logout = (req, res) => {
//     try {
//         res.cookie("jwt", "", {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "development", 
//             sameSite: "strict",
//             expires: new Date(0), 
//         });
//         return res.status(200).json({ message: "Logged Out Successfully" });
//     } catch (error) {
//         console.error("Error in Logging Out:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        return res.status(200).json({message: "Logged Out Successfully"})
    } catch (error) {
        console.log("Error in Signing Out", error.message)
        res.status(500).json({message: "Internal server error"});
    }
}; 


export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user)
    }catch(error){
        console.log("Error in chekAuth Controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}