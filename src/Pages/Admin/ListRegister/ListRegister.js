import React, { useState, useEffect , useContext} from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './ListRegister.css'
import PageSwitcher from '../pageSwitcher/PageSwitcher'
import { DetailBtn, EventDetail } from './../detailBtn/DetailBtn'
import {getPendingEvents} from '../../../api/adminApi'
import {updateEventStatus} from '../../../api/adminApi'
import AuthContext from '../../../store/auth-context'

function AccountApproval() {


    const authContext = useContext(AuthContext);
    // only change the 'isAccept' value of real data
    const [data, setData] = useState([]);
    // whenever acp or decline remove the 'display' data from sceen

    const handleAccept = (id) => {
        (
            async () => {
                await updateEventStatus (authContext.token, id, 'accepted')
            }
        )();
        setData(data.filter((t)=>t.id!==id))

    }

    const formatDate = (str) => {
        const day = new Date(str)
        return moment(day).format('L')+' '+moment(day).format('LT')
    }

    const handleDecline = (id) => {
        (
            async () => {
                await updateEventStatus (authContext.token, id, 'rejected')
            }
        )();
        setData(data.filter((t)=>t.id!==id))
    }


    useEffect(() => {
        (
            async () => {
                const result = await getPendingEvents (authContext.token)
                setData(result.data);
            }
        )();
    },[])


    return (
        <div className="bigContainer" id="ADMIN-PAGE">
            <PageSwitcher page="listRegister" />
            <h2>DANH SÁCH ĐĂNG KÝ</h2>
            <div className="container my-5" id="LIST-REGISTER">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="col-1">STT</th>
                            <th className="col-3">Tên sự kiện</th>
                            <th className="col-3 text-center">Thời gian diễn ra sự kiện</th>
                            <th className="col-2"></th>
                            <th className="col-4"></th>
                        </tr>
                    </thead>
                    <TransitionGroup component="tbody">
                        {/* <tbody> */}
                            {data.map((e, index) => (
                                <CSSTransition key={index} timeout={0} classNames="infoRow">
                                    <tr>
                                        <th className="col-1 align-middle">{index + 1}</th>
                                        <td className="col-3 align-middle">{e.name}</td>
                                        <td className="col-3 align-middle text-center">{formatDate(e.end_date) +' - '+formatDate(e.end_date)}</td>
                                        <td className="col-2 text-end align-middle">
                                            <DetailBtn />
                                            <EventDetail data={e} />
                                        </td>
                                        <td className="col-4">
                                            <div className="button-group text-end">
                                                <button type="button"
                                                    className="accept"
                                                    onClick={() => handleAccept(e.id)}>
                                                    Đồng ý
                                                </button>
                                                <button type="button"
                                                    className="decline"
                                                    onClick={() => handleDecline(e.id)}>
                                                    Từ chối
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                </CSSTransition>
                            ))}
                        {/* </tbody> */}
                    </TransitionGroup>
                </table>
            </div>
        </div>
    );
}

export default AccountApproval;