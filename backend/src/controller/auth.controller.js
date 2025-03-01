import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password){
            return res.status(400).json({message: "Please enter all the details"});
        }
        // to hash password package bcrypt is used
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })

       
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            await newUser.save();
            return res.status(201).json({message: "User registered successfully."})

        } else {
            return res.staus(400).json({ message: "Inavalid user data" })
        }

    }catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
}
};

export default signin = async (req, res) => {
    const {username, password} = res.body;
    const user = await User.findOne({username, password});

    if(user){
        const token = jwt.sign({userId: user._id, username}, process.env.SECRET_KEY, {expiresIn: '1h'});
        return res.status(201).json({message: "Signin Successful", token})
    }else{
        return res.status(400).json({message: "Invalid credentials"});
    }
}