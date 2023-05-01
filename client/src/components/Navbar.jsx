import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/auth/auth";
import { toast } from "react-toastify";

const Navbar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
  const navigate = useNavigate()

    const logoutHandler = () => {
      dispatch(logout())
      window.localStorage.clear()
      toast('Вы вышли из системы')
      navigate('/login')    
    }
    const activeStyles = {
        color: "white",
    };
    return (
        <div className="flex py-4 justify-between items-center">
            <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-sm text-white rounded-sm">
                E
            </span>
            {isAuth && (
                <ul className="flex gap-8">
                    <li>
                        <NavLink
                            to="/"
                            className="text-sm text-gray-400  hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/e"
                            className="text-sm text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мои посты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/r"
                            className="text-sm text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Добавить пост
                        </NavLink>
                    </li>
                </ul>
            )}
            <div
                className="flex justify-center items-center bg-gray-600 text-xm text-white
                rounded-sm px-4 py-2"
            >
                {isAuth ? (
                    <button onClick={logoutHandler}>Выйти</button>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
