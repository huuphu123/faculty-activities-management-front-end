import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom"
import AuthContext from '../../store/auth-context';
import { getEventDetails, checkin, checkout } from '../../api/userApi'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import './Check-in-out.css';

const Check_in_out = () => {
    const [value_in, setValue_in] = useState('');
    const [value_out, setValue_out] = useState('');
    const [array_in, setArray_in] = useState([]);
    const [array_out, setArray_out] = useState([]);
    const [eventName, setEventName] = useState('');

    const authContext = useContext(AuthContext);
    const params = useParams();

    useEffect(() => {
        const result = getEventDetails(params.eid , authContext.token)
            .then(result => {
                setEventName(result.name)
            })
        
    }, [])


    const element_out = (
        <div className="item_check_out">
            <div className="name_check_out">{value_out}</div>
            <div className="confirm_check_out">Đã check-out</div>
        </div>
    )

    const prependData_in = async () => { 
        const result = await checkin(value_in, params.eid, authContext.token)
        if(result.msg === 'success') {
            const fullName = result.data.lname + ' ' + result.data.fname
            setArray_in(
                preArray_in => [{name:fullName, msg: 'Đã check-in'}, ...preArray_in]
            );
        } else {
            setArray_in(
                preArray_in => [{name:value_in, msg: result.msg}, ...preArray_in]
            );
        }  
        setValue_in('')   
    }


    const prependData_out = async() => {   
        const result = await checkout(value_out, params.eid, authContext.token)
        console.log(result)
        if(result.msg === 'success') {
            const fullName = result.data.lname + ' ' + result.data.fname
            setArray_out(
                preArray_out => [{name:fullName, msg: 'Đã check-out'}, ...preArray_out]
            );
        } else {
            setArray_out(
                preArray_out => [{name:value_out, msg: result.msg}, ...preArray_out]
            );
        }  
        setValue_out('')   
    }

    return (
        <div id = "Check_in_out">
            <div className='title'>
                <div>
                    ĐIỂM DANH SỰ KIỆN:
                </div>
                <div style={{textTransform: "uppercase"}}>
                    {eventName}
                </div>
            </div>
            <div className="container_check_in_out">                
                <Tabs defaultActiveKey="Check-in" transition={true} id="tab" className="mb-3">
                    <Tab eventKey="Check-in" title="Check-in">
                        <div className="form_check_in">
                            <div className="text_check_in">CHECK-IN</div>
                            <input value={value_in} onChange={e => setValue_in(e.target.value)} className="input_check_in" type="text" placeholder="Nhập mã số sinh viên..."/>
                            <div className="button_check_in">
                                <button onClick={prependData_in} type="submit" className="btn btn_submit_check_in">Nhập</button>
                            </div>
                        </div>
                        <div className="list_check_in">
                                {array_in && array_in.map((e,index)=> 
                                    (
                                        <div className="item_check_in" key={index}>
                                            <div className="name_check_in">{e.name}</div>
                                            <div className="confirm_check_in">{e.msg}</div>
                                        </div>
                                    )
                                )}
                        </div>
                    </Tab>
                    <Tab eventKey="Check-out" title="Check-out">
                        <div className="form_check_out">
                            <div className="text_check_out">CHECK-OUT</div>
                            <input value={value_out} onChange={e => setValue_out(e.target.value)} className="input_check_out" type="text" placeholder="Nhập mã số sinh viên..."/>
                            <div className="button_check_out">
                                <button onClick={prependData_out} type="submit" className="btn btn_submit_check_out">Nhập</button>
                            </div>
                        </div>
                        <div className="list_check_out">
                                {array_out && array_out.map((e,index)=> 
                                    (
                                        <div className="item_check_out" key={index}>
                                            <div className="name_check_out">{e.name}</div>
                                            <div className="confirm_check_out">{e.msg}</div>
                                        </div>
                                    )
                                )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
export default Check_in_out;