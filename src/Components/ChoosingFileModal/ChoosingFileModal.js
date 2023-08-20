import React,{useEffect, useState, useContext} from 'react'
import classes from './ChoosingFileModal.module.css'
import Card from '../Card/Card'
import Button from '../Button/Button'
import { BsFolder2, BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import { getAvailableAttendanceList} from '../../api/userApi'
import AuthContext from '../../store/auth-context';

const ChoosingFileModal = props => {
    const authContext = useContext(AuthContext);
    const [data, setData] = useState({selected:""})
    const [list, setList] = useState([]);
    useEffect(()=>{
        (async ()=>{
            const l = await getAvailableAttendanceList(authContext.token);
            if (!l.status){
                setList(l.data);
            }
        })()
    },[])

    const clickDownloadHanlder = (fileName) => {
        var win = window.open(`http://localhost:5000/avail_list/${fileName}`, '_blank');
        win.focus();
    } 

    const fileChangeHandler = (e)=>{
        props.onChangeFile(e.target.files[0]);
        props.onConfirm();
    }
    return (
        <div>
            <div className={classes.backdrop} onClick={props.onConfirm}/>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <p>Chọn tập dữ liệu <BsFolder2/></p>
                </header>
                <div className={classes.content}>
                    <div >
                        <div className={classes.uploadContainer}>
                            <input type="file" name="file" id="file" onChange={fileChangeHandler} className={classes.inputfile} />
                            <label htmlFor="file">
                                
                                {props.selectedFileName || (<><BsFillFileEarmarkArrowUpFill/> Tải lên tệp</>)}
                                {/* {file && (<>{file.name}</>)} */}
                            </label>
                        </div>
                    </div>
                    <div >
                        <p className={classes.instructText}>
                           <div>YÊU CẦU LÀ FILE EXCEL BAO GỒM CÁC CỘT:</div> 
                           - SID (Mã số sinh viên). <br/>
                           - lname (Họ). <br/>
                           - fname (Tên). <br/>
                        </p>
                        <p className={classes.orText}>
                           -- TẬP DỮ LIỆU CÓ SẴN -- 
                        </p>
                    </div>
                    <div >
                        <ul>
                            {list.map((data) => {
                                return (
                                    <li key={data.name} className="row">
                                        <p className={`col-md-8 ${classes.dataName}`}>{data.name}</p>
                                        <div className='col-md-4'>
                                            {/* <button 
                                                className={classes.button1} 
                                                onClick = {props.onClick1}
                                                style={props.style}
                                            >
                                                Chọn
                                            </button> */}
                                            <button 
                                                className={classes.button2} 
                                                onClick = {clickDownloadHanlder.bind(null,data.fileName)}
                                                style={props.style}
                                            >
                                                Tải xuống
                                            </button>
                                        </div>

                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <footer className={classes.actions}>
                    <Button onClick={props.onConfirm} style={{fontSize: '1rem'}}>Thoát</Button>
                </footer>
            </Card>
        </div>
    )
}

export default ChoosingFileModal;
