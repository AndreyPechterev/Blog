import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/features/auth/auth";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    return (
        <Layout>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route  path="/posts" element={<Posts />} />
                <Route path="/:id" element={<Post />} />
                <Route path="/:id/edit" element={<EditPost />} />
                <Route exact path="/post/new" element={<AddPost />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>

            <ToastContainer position="bottom-right" />
        </Layout>
    );
}

export default App;
