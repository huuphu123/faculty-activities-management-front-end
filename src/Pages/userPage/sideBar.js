import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sideBar.css'
import { userInfo } from '../../api/userApi';
import AuthContext from '../../store/auth-context';


function SideBar(props) {
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
    
    return (
        <div className="col-4 sidebar" id="sideBar">
            <div className="d-flex justify-content-center">
                <a href="#">
                    <div className="rounded-circle ava-wrapper">
                        {/* <img src="./sucy2.png" alt=""></img> */}
                    </div>
                </a>
            </div>
            <h6 className="text-center">{name}</h6>
            <div className="navbar side-bar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/info"
                            className={props.tab === 0 ?
                                "nav-link text-center focused" : "nav-link text-center"}
                        >Thông tin</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/userevent"
                            className={props.tab === 1 ?
                                "nav-link text-center focused" : "nav-link text-center"}>
                            Sự kiện
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/password"
                            className={props.tab === 2 ?
                                "nav-link pw text-center focused" : "nav-link pw text-center"}>
                            Đổi mật khẩu
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;