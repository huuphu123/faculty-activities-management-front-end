import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './sideBar'
import AuthContext from '../../store/auth-context';
import { userInfo, changePassword } from '../../api/userApi';
import './info.css';

function PasswordChange() {
    const authContext = useContext(AuthContext);
    const [data, setData] = useState({
        password: '',
        newPassword: '',
    })

    useEffect(() => {
        (
            async () => {
                const res = await changePassword(authContext.token);
                setData({
                    ...data,
                    password: res.data,
                });
            }
        )();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('hihi');
    };

    return (
        <div className="page">
            <div className="container fr" id="INFO-PASS">
                <div className="row">
                    <SideBar tab={2} />
                    <div className="col-8">
                        <form className="info-panel" onSubmit={handleSubmit.bind(this)}>
                            <h4 className="tab__password text-center">Đổi mật khẩu</h4>
                            <div className="form-group form-group-sm">
                                <label htmlFor="old-pass">Mật khẩu cũ</label>
                                <input type="password" pattern={data.password}
                                    name="oldPassword"
                                    className="form-control form-control-sm"
                                    placeholder="Nhập mật khẩu cũ"
                                    onInvalid={(e) => e.target.setCustomValidity("Mật khẩu chưa chính xác")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                    onChange={handleChange.bind(this)}
                                />

                                <label htmlFor="new-pass">Mật khẩu mới</label>
                                <input type="password"
                                    name="newPassword"
                                    className="form-control form-control-sm"
                                    placeholder="Nhập mật khẩu mới"
                                    onChange={handleChange.bind(this)} />

                                <label htmlFor="old-pass">Xác nhận mật khẩu mới</label>
                                <input type="password" pattern={data.newPassword}
                                    name="confirmPass"
                                    className="form-control form-control-sm"
                                    placeholder="Nhập lại mật khẩu mới"
                                    onInvalid={(e) => e.target.setCustomValidity("Mật khẩu xác nhận chưa khớp")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                    onChange={handleChange.bind(this)} />
                            </div>
                            <button type="submit" className="btn btn-success btn-sm">Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordChange;