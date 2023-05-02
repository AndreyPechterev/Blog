import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/features/post/post";
import { useNavigate } from "react-router-dom";
const AddPost = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        try {
            if (text && title) {
                const data = new FormData();
                data.append("text", text);
                data.append("title", title);
                data.append("image", image);
                dispatch(createPost(data));
                navigate("/");
            } 
        } catch (error) {
            console.log(error);
        }
    };

    const clearFormData = () => {
        setText("");
        setTitle("");
        setImage("");
    };

    return (
        <form
            className="w-1/3 mx-auto py-10"
            onSubmit={(e) => e.preventDefault()}
        >
            <label className="text-gray-300 py-2 bg-gray-600 text-sm mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                Прикрепить изображение:
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            <div className="flex object-cover py-2">
                {image && <img src={URL.createObjectURL(image)} alt="image" />}
            </div>
            <label className="text-sm text-white opacity-70">
                Заголовок поста:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Заголовок"
                    className="mt-1 text-black w-full rounded-sm bg-gray-600 border py-1 px-2 text-sm outline-none placeholder:text-gray-900"
                />
            </label>
            <label className="text-sm text-white opacity-70">
                Текст поста:
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Текст поста"
                    className="mt-1 text-black w-full rounded-sm resize-none h-40 bg-gray-600 border py-1 px-2 text-sm outline-none placeholder:text-gray-900"
                />
            </label>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button
                    onClick={submitHandler}
                    className="flex justify-center items-center bg-gray-600 text0sm text-white rounded-sm py-2 px-4"
                >
                    Добавить
                </button>
                <button
                    onClick={clearFormData}
                    className="flex justify-center items-center bg-red-600 text0sm text-white rounded-sm py-2 px-4"
                >
                    Отменить
                </button>
            </div>
        </form>
    );
};

export default AddPost;
