import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './sideBar'
import './eventList.css';
import { getUserEvents, getAttendanceResult } from '../../api/userApi';
import AuthContext from '../../store/auth-context';
import { JsonToExcel } from '../../Components/JsonToExcel/JsonToExcel'

function CreateRow(props) {
    const event = props.event;

    const eventStatus = {
        accepted: "Đã duyệt",
        pending: "Chưa duyệt",
    }

    return (
        <tr>
            <th className={`col-1 ${event.status}`}>{props.ind}</th>
            <td className={`col-4 ${event.status}`}>
                {event.status === 'accepted' ?
                    <Link to={`/check-in-out/${event.id}`}
                        style={{ textDecoration: 'none', color: 'black', fontWeight: '600' }}>
                        {event.name}
                    </Link> : event.name}
            </td>
            <td className={`col-3 ${event.status}`}>
                {event.start_date.substring(4, 15)}
            </td>
            <td className={`col-1 ${event.status}`}>
                <JsonToExcel
                    fileName="KQ_DiemDanh"
                    text="KQ"
                    id={event.id}
                />
            </td>
            <td className={`col-3 ${event.status}`}>{eventStatus[event.status]}</td>
        </tr>
    );
}

function UserEventList() {
    const authContext = useContext(AuthContext);
    const [data, setData] = useState({});

    useEffect(() => {
        (
            async () => {
                const res = await getUserEvents(authContext.token);
                setData(res.data);
                console.log(res.data);
            }
        )();
    }, [])

    const numOfEvents = data.length;
    const trList = [];
    for (let i = 1; i <= numOfEvents; i++) {
        trList.push(<CreateRow ind={i} event={data[i - 1]} key={i} />);
    }

    return (
        <div className="page">
            <div className="container fr">
                <div className="row">
                    <SideBar tab={1} />
                    <div className="col-8">
                        <h4 className="tab__event text-center">Sự kiện</h4>
                        <div className="border">
                            <div className="mini-container">
                                <h6 className="table-name">Các sự kiện đã đăng ký</h6>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="col-1">STT</th>
                                            <th className="col-4">Tên sự kiện</th>
                                            <th className="col-3">Thời gian</th>
                                            <th className="col-1"></th>
                                            <th className="col-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>{trList}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default UserEventList;
