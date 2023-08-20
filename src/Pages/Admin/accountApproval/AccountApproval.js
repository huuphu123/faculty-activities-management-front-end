import React, { useState, useContext , useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import './AccountApproval.css'
import PageSwitcher from '../pageSwitcher/PageSwitcher'
import {getPendingUsers} from '../../../api/adminApi'
import {updateUserStatus} from '../../../api/adminApi'
import AuthContext from '../../../store/auth-context'
import { DetailBtn, UserDetail } from './../detailBtn/DetailBtn'

function AccountApproval() {
    const authContext = useContext(AuthContext);
    const [data, setData] = useState([]);

    const [isListUsersChange, setIsListUsersChange] = useState(false);

    const handleAccept = (email) => {
        (
            async () => {
                await updateUserStatus (authContext.token, email, 'accepted')
            }
        )();
        setData(data.filter((t)=>t.email !== email))
    }

    const handleDecline = (email) => {
        (
            async () => {
                await updateUserStatus (authContext.token, email, 'rejected')
            }
        )();
        setData(data.filter((t)=>t.email !== email))
    }


    useEffect(() => {
        (
            async () => {
                const result = await getPendingUsers (authContext.token)
                setData(result.data);
            }
        )();
    },[])

    return (
        <div className="bigContainer" id="ADMIN-PAGE">
            <PageSwitcher page="accountApproval" />
            <h2>KIỂM DUYỆT TÀI KHOẢN</h2>

            <div className="container my-5" id="ACCOUNT-APPROVAL">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="col-1">STT</th>
                            <th className="col-2">MSSV</th>
                            <th className="col-3">Họ và tên</th>
                            <th className="col-2"></th>
                            <th className="col-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e, index) =>
                            <tr key={index}>
                                <th className="col-1 align-middle">{index + 1}</th>
                                <td className="col-2 align-middle">{e.id}</td>
                                <td className="col-4 align-middle">{e.fullName}</td>
                                <td className="col-2 text-center align-middle">
                                    <DetailBtn />
                                    <UserDetail data={e} page="aA" />
                                </td>
                                <td className="col-3">
                                    <div className="button-group text-end">
                                        <button type="button"
                                            className="accept"
                                            onClick={() => handleAccept(e.email)}>
                                            Đồng ý
                                        </button>
                                        <button type="button"
                                            className="decline"
                                            onClick={() => handleDecline(e.email)}>
                                            Từ chối
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AccountApproval;