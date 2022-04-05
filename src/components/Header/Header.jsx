import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login/Login";
import UserMenu from './UserMenu';
import { useSelector } from "react-redux";

const Header = (props) => {
    const {user, session_id, showLoginModal} = props.authInfo;

    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">Home</Link>
                    </li>
                </ul>
                { user || session_id ? 
                    <UserMenu user={user}/> : 
                    <Login showModal={showLoginModal}/>
                }
            </div>
        </nav>
    )
};

export default Header;