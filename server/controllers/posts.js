import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);
        if (req.files) {
            let filename = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, "..", "uploads", filename));

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imageUrl: filename,
                author: req.userId,
            });
            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            });

            return res.json(newPostWithImage);
        }

        const newPost = new Post({
            username: user.username,
            title,
            text,
            imageUrl: "",
            author: req.userId,
        });

        await newPost.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPost },
        });

        res.json(newPost);
    } catch (error) {
        res.json({ message: "Что-то пошло не так" });
    }
};

// get all posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort("-createdAt");
        const popularPosts = await Post.find().limit(5).sort("-views");
        if (!posts) {
            return res.json({ message: "Постов нет" });
        }
        res.json({ posts, popularPosts });
    } catch (error) {
        res.json({ message: "Не удалось получить посты" });
    }
};

// get by id
export const getById = async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { views: 1 },
            },
            { returnDocument: "after" }
        );

        res.json(post);
    } catch (error) {
        res.json({ message: "Не удалось получить пост" });
    }
};

// get my posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id);
            })
        );

        res.json(list);
    } catch (error) {
        res.json({ message: "Что-то пошло не так." });
    }
};

// remove post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.json({ message: "Такого поста нет" });
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        });

        res.json({message: "Пост был удален", _id: req.param.id})
    } catch (error) {
        res.json({ message: "Что-то пошло не так." });
    }
};
