import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
        return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    });
}
