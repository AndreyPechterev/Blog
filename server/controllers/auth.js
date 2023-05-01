import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const candidat = await User.findOne({ username });

        if (candidat) {
            return res.status(200).json({ message: "Логин уже занят!" });
        }

        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );
        await newUser.save();

        res.json({ newUser, token, message: "Регистрация прошла успешно" });
    } catch (error) {
        res.json({ message: "Ошибка при создании пользователя" });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "Неправильный логин или пароль",
            });
        }

        const isGoodPassword = await bcrypt.compare(password, user.password);

        if (!isGoodPassword) {
            return res.status(400).json({
                message: "Неправильный логин или пароль",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({ user, token, message: "Вы вошли в систему" });
    } catch (error) {
        res.json({ message: "Ошибка авторизации" });
    }
};

// Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res
                .status(400)
                .json({ message: "Такого пользователя не существует" });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({
            user,
            token,
        });
    } catch (error) {
        res.json({ message: "Нет доступа." });
    }
};
