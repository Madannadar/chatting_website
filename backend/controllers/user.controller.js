import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
    // console.log("Registering user:", req.body);
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already exists", status: false });
        }
        const emailCheck = await User.find({ email });
        if (emailCheck.length) { // Using length to check if any email exists
            return res.json({ msg: "Email already exists", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        console.log("User created:", user);
        delete user.password; // Remove password from the response
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
        return res.status(500).json({ msg: "Internal server error", status: false });
    }

}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }
        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (!ispasswordValid) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }
        console.log("User found:", user);
        delete user.password; // Remove password from the response
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
        return res.status(500).json({ msg: "Internal server error", status: false });
    }
}

export const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    } catch (error) {
        next(error);
        return res.status(500).json({ msg: "Internal server error", status: false });
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        // select all user excluding our user
        const user = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(user);
    } catch (error) {
        next(error)
        return res.status(500).json({ msg: "internal server error", status: false })
    }

}
