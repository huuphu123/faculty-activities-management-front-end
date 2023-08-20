import React, { useState, useEffect, useContext} from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'

import './EventManage.css'
import PageSwitcher from './../pageSwitcher/PageSwitcher'
import {DetailBtn, EventDetail} from './../detailBtn/DetailBtn'
import {getCheckedEvents} from '../../../api/adminApi'
import AuthContext from '../../../store/auth-context'
import { JsonToExcel } from '../../../Components/JsonToExcel/JsonToExcel'
function EventManage() {
    const authContext = useContext(AuthContext);
    const [event, setEvent] = useState([]);
    const formatDate = (str) => {
        const day = new Date(str)
        return moment(day).format('L')+' '+moment(day).format('LT')
    }
    useEffect(() => {
        (
            async () => {
                const result = await getCheckedEvents (authContext.token)
                setEvent(result.data);
            }
        )();
    },[])

    return (
        <div className="bigContainer" id="ADMIN-PAGE">
            <PageSwitcher page="eventManage" />
            <h2>QUẢN LÝ SỰ KIỆN</h2>

            <div className="container my-5" id="EVENT-MANAGE">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="col-1">STT</th>
                            <th className="col-3">Tên sự kiện</th>
                            <th className="col-4 text-center">Thời gian diễn ra sự kiện</th>
                            <th className="col-2"></th>
                            <th className="col-2"></th>
                        </tr>
                    </thead>
                    <tbody >
                        {event.map((e, index) =>
                            <tr key={index}
                                className={e.status === "accepted" ? "" : "declined"}>
                                <th className="col-1 align-middle">{index+1}</th>
                                <td className="col-3 align-middle">{e.name}</td>
                                <td className="col-4 align-middle text-center">{formatDate(e.end_date) + ' - '+ formatDate(e.end_date)}</td>
                                <td className="col-2 align-middle text-center">
                                    <DetailBtn data={e} />
                                    <EventDetail data={e} page="eM"/>
                                    <div className='result'>
                                    {e.status === "accepted"&&
                                        <JsonToExcel
                                            fileName="KQ_DiemDanh"
                                            text="Kết quả"
                                            id={e.id}
                                        />
                                    }
                                    </div>
                                </td>
                                <td className="col-2 align-middle">
                                    {e.status === "accepted" ?
                                        "Đã duyệt" : "Không duyệt"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EventManage;