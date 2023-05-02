import { Router } from "express";
import { checkAuth } from "../utils/checkauth.js";
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removePost,
} from "../controllers/posts.js";
const router = new Router();

// Create post
router.post("/", checkAuth, createPost);

// Login
router.get("/", getAll);

// Get by id
router.get("/:id", getById);

// Get my posts
router.get("/user/me", checkAuth, getMyPosts);

// remove post
router.delete("/:id", checkAuth, removePost);


export default router;
