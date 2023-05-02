import React from "react";
import Moment from "react-moment";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
const PostItem = ({ post }) => {
    if (!post) {
        return (
            <div className="text-xl text-center text-white py-10">
                Загрузка...
            </div>
        );
    }
    return (
        <div className="flex flex-col basis-1/4 flex-grow">
            <Link to={`/${post._id}`}>
                <div
                    className={
                        post.imageUrl
                            ? "flex rouded-sm h-80"
                            : "flex rounded-sm"
                    }
                >
                    {post.imageUrl && (
                        <img
                            className="object-cover w-full"
                            alt="img"
                            src={`http://localhost:3005/${post.imageUrl}`}
                        />
                    )}
                </div>
            </Link>
            <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-white opacity-50">
                    {post.username}
                </div>
                <div className="text-sm text-white opacity-50">
                    <Moment date={post.createdAt} format="D MMM Y" />
                </div>
            </div>
            <Link to={post._id} className="text-white text-xl">
                {post.title}
            </Link>
            <p className="text-white opacity-60 text-sm pt-4">{post.text}</p>
            <div className="flex gap-3 items-center mt-2">
                <div className="flex items-center justify-center gap-2 text-sm text-white opacity-50">
                    <AiFillEye /> <span>{post.views}</span>{" "}
                </div>
                <button className="flex items-center justify-center gap-2 text-sm text-white opacity-50">
                    <AiOutlineMessage />{" "}
                    <span>{post.comments?.length || 0}</span>{" "}
                </button>
            </div>
        </div>
    );
};

export default PostItem;
