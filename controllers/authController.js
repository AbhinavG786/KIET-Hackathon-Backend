import {User} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const register=async (req, res) => {
    const {username, name, age, gender, role} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({message: 'Username already exists'});
        }
        const newUser = new User({username, profile: {name, age, gender}, role});
        await newUser.save();
        const token = jwt.sign({id: newUser._id, role: newUser.role}, process.env.JWT_SECRET, {expiresIn: '3d'});
        res.status(201).json({message: 'User registered successfully', token});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

const login=async (req, res) => {
    const {username} = req.body;
try{
    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).json({message: 'Invalid credentials'});
    }   
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3d'});
    res.json({token, role: user.role});
}catch(error){
    res.status(500).json({message: 'Server error'});
}
}

export {register, login};