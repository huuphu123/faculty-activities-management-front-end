import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './info.css';
import SideBar from './sideBar'
import AuthContext from '../../store/auth-context';
import { userInfo, updateUserInfo } from '../../api/userApi';

function InfoPanel() {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState({
        fullName: authContext.fullName,
        birthday: null,
        id: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        (
            async () => {
                const res = await userInfo(authContext.token);
                setData(res.data);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await updateUserInfo(authContext.token, data.fullName, data.birthday, data.phone);

        if (res.status !== 200) console.log(res.msg);
        // alert('Form submitted (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧');
        console.log(data);
        console.log(authContext);
    };

    return (
        <div className="page">
            <div className="container fr">
                <div className="row">
                    <SideBar tab={0} />
                    <div className="col-8" id="INFO-PASS">
                        <form className="info-panel" onSubmit={handleSubmit.bind(this)}>
                            <h4 className="tab__info text-center">Thông tin</h4>
                            <div className="form-group form-group-sm">
                                <label htmlFor="name" className="name">Tên</label>
                                <input type="text"
                                    name="fullName"
                                    className="form-control form-control-sm"
                                    value={data.fullName}
                                    placeholder="Nhập tên..."
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Xin đừng bỏ trống")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                    onChange={handleChange.bind(this)} />
                            </div>
                            <div className="form-group row">
                                <div className="col-md-6">
                                    <label htmlFor="birthday" className="birthday">Ngày sinh</label>
                                    <input type="date"
                                        name="birthday"
                                        className="form-control form-control-sm"
                                        defaultValue={data.birthday}
                                        placeholder="Nhập ngày sinh..."
                                        onInput={(e) => e.target.setCustomValidity("")}
                                        onChange={handleChange.bind(this)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="id" className="studentID">Mã số sinh viên</label>
                                    <input type="text" pattern="[1-2]([0-9]{6})"
                                        name="id"
                                        className="form-control form-control-sm"
                                        value={data.id}
                                        placeholder="Nhập ID..."
                                        required
                                        onInvalid={(e) => e.target.setCustomValidity("Hãy nhập đúng dạng của mã số sinh viên")}
                                        onInput={(e) => e.target.setCustomValidity("")}
                                        onChange={handleChange.bind(this)} />
                                </div>
                            </div>
                            <div className="form-group form-group-sm">
                                <label htmlFor="email" className="email">Email</label>
                                <input type="text" pattern="[a-z0-9._]+@hcmut.edu.vn"
                                    name="email"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    value={data.email}
                                    placeholder="Nhập email..."
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Hãy nhập email có đuôi hcmut.edu.vn")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                    onChange={handleChange.bind(this)} />

                                <label htmlFor="phone" className="phone">Số điện thoại</label>
                                <input type="text" pattern="[0-9]{10,11}"
                                    name="phone"
                                    className="form-control form-control-sm"
                                    value={data.phone}
                                    placeholder="Nhập số điện thoại..."
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Hãy nhập đúng dạng số điện thoại")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                    onChange={handleChange.bind(this)} />
                            </div>

                            <button type="submit" className="btn btn-success btn-sm">Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default InfoPanel;