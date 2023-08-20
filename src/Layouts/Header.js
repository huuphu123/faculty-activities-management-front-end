import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from 'react-router-dom'
import AuthContext from '../store/auth-context';
import './Header.css';
import { userInfo } from '../api/userApi';

const AdminUser = () => {
    const authContext = useContext(AuthContext);
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const res = await userInfo(authContext.token);
                setName(res.data.fullName);
            }
        )();
    }, []);


    const handleClick = async () => {
        authContext.logout();
        window.location.href = "../";
    }

    return (
        <React.Fragment>
            <li className="nav-item">
                {
                    authContext.role === '1' ?
                        <Link className="nav-link admin" to="/admin/eventManage">{name}{` (Admin)`}</Link> :
                        <Link className="nav-link user" to="/info">{name}</Link>
                }
            </li>
            <li className="nav-item">
                {
                    authContext.role === '0' ?
                        <Link className="nav-link events" to="/userevent">SỰ KIỆN</Link> : ""
                }
            </li>
            <li className="nav-item">
                <button type="button" className="btn btn-success" onClick={handleClick}>ĐĂNG XUẤT</button>
            </li>
        </React.Fragment>
    );
}

const Visitor = () => {
    return (
        <React.Fragment>
            <li className="nav-item align-middle">
                <Link to="/register" className="nav-link signup align-text-top">Đăng ký</Link>
            </li>
            <li className="nav-item align-middle">
                <Link to="/login" className="nav-link login align-text-top">Đăng nhập</Link>
            </li>
        </React.Fragment>);
}

function Header() {
    const authContext = useContext(AuthContext);

    const [header, setHeader] = useState(() => {
        return authContext.role === undefined ? <Visitor /> : <AdminUser />
    })

    const handleChange = async () => {
        setHeader(() => (authContext.role === undefined ? <Visitor /> : <AdminUser />))
    }

    useEffect(() => handleChange, []);

    return (
        <nav id="mainNavbar" className="navbar navbar-expand-md navbar-light sticky-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src=".././hcmut.png" width="45" height="42" className="d-inline-block align-top logo" alt=""></img>
                    <div className="brand-name d-inline-block">
                        <div>TRƯỜNG ĐẠI HỌC BÁCH KHOA - ĐHQG-HCM</div>
                        <div>KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH</div>
                    </div>
                </Link>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#responsive"
                    aria-controls="responsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="responsive">
                    <ul className="justify-content-end">
                        {header}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Header;