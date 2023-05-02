import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import axios from "../utils/axios";
import {
    AiFillDelete,
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneAlert,
    AiTwotoneEdit,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "../redux/features/post/post";
import { toast } from "react-toastify";

const Post = () => {
    const [post, setPost] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fetchPost = async () => {
        const { data } = await axios.get(`/posts/${id}`);
        setPost(data);
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const removePostHandler = () => {
        try {
            dispatch(removePost(id));
            toast("Пост был удален");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (!post) {
        return (
            <div className="text-xl text-center text-white py-10">
                Загрузка...
            </div>
        );
    }

    return (
        <div>
            <button className="flex justify-center items-center bg-gray-600 text-sm text-white rounded-sm py-2 px-4">
                Назад
            </button>

            <div className="flex gap-10 py-8">
                <div className="w-2/3">
                    <div className="flex flex-col basis-1/4 flex-grow">
                        <div
                            className={
                                post?.imageUrl
                                    ? "flex rouded-sm h-80"
                                    : "flex rounded-sm"
                            }
                        >
                            {post?.imageUrl && (
                                <img
                                    className="object-cover w-full"
                                    alt="img"
                                    src={`http://localhost:3005/${post?.imageUrl}`}
                                />
                            )}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <div className="text-sm text-white opacity-50">
                                {post?.username}
                            </div>
                            <div className="text-sm text-white opacity-50">
                                <Moment
                                    date={post?.createdAt}
                                    format="D MMM Y"
                                />
                            </div>
                        </div>
                        <div className="text-white text-xl">{post?.title}</div>
                        <p className="text-white opacity-60 text-sm pt-4">
                            {post?.text}
                        </p>
                        <div className="flex gap-3 items-center mt-2 justify-between">
                            <div className="flex gap-3 mt-4">
                                <div className="flex items-center justify-center gap-2 text-sm text-white opacity-50">
                                    <AiFillEye /> <span>{post?.views}</span>{" "}
                                </div>
                                <button className="flex items-center justify-center gap-2 text-sm text-white opacity-50">
                                    <AiOutlineMessage />{" "}
                                    <span>{post?.comments?.length || 0}</span>{" "}
                                </button>
                            </div>
                            {user?._id === post.author && (
                                <div className="flex gap-3 mt-4">
                                    <button className="flex items-center justify-center gap-2 text-lg text-white opacity-50">
                                        <AiTwotoneEdit />
                                    </button>
                                    <button
                                        onClick={removePostHandler}
                                        className="flex items-center justify-center gap-2 text-lg text-white opacity-50"
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-1/3"></div>
            </div>
        </div>
    );
};

export default Post;
