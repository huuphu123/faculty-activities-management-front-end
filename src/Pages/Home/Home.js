import {useState, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "./Home.module.css"
import { BsFolderPlus } from "react-icons/bs";
import Button from '../../Components/Button/Button';
import InputTime from '../../Components/InputTime/InputTime';
import ChoosingFileModal from '../../Components/ChoosingFileModal/ChoosingFileModal';
import { addEvent, postEventAttendances } from '../../api/userApi'
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Error = props => {
    return (
        <p className={classes['error']}>
            {props.children}
        </p>
    )
}
const Success = props => {
    return (
        <p className={classes['success']}>
            {props.children}
        </p>
    )
}
const Home = props => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext);
    const [formInput, setFormInput] = useState({
        name: "",
        startTime: "",
        startDate: "",
        endTime: "",
        endDate: "",
        location: ""
    })
    const [file, setFile] = useState();
    const [isSuccessful,setIsSuccessful] = useState(false);
    const [error,setError] = useState("");

    const [isChoosingData, setIsChoosingData] = useState(false)
    const hideModalHandler = ()=>{
        setIsChoosingData(false)
    }
    const openModalHandler = ()=>{
        if (!authContext.token){
            navigate("/login");
        }
        setIsChoosingData(true)
    }
    const nameChangeHandler = (e) => {
        setFormInput(prev => {
            return {...prev,name:e.target.value}
        })
    }
    const timeStartChangeHandler = (value) => {
        setFormInput(prev => {
            return {...prev,startTime:value}
        })       
    }
    const dateStartChangeHandler = (value) => {
        setFormInput(prev => {
            return {...prev,startDate:value}
        })        
    }
    const timeEndChangeHandler = (value) => {
        setFormInput(prev => {
            return {...prev,endTime:value}
        })       
    }
    const dateEndChangeHandler = (value) => {
        setFormInput(prev => {
            return {...prev,endDate:value}
        })       
    }
    const locationChangeHandler = (e) => {
        setFormInput(prev => {
            return {...prev,location:e.target.value}
        })       
    }
    const submitHandler = async()=>{
        if (!authContext.token){
            navigate("/login");
        }
        setIsSuccessful(false);
        if (Object.values(formInput).some(value => value == false) || !file) 
        {
            setError("Cần điền đầy đủ thông tin để đăng ký")
            return;
        }
        const startTime = formInput.startTime.split(':').map(Number);
        const startDate = formInput.startDate.split('-').map(Number);
        const endTime = formInput.endTime.split(':').map(Number);
        const endDate = formInput.endDate.split('-').map(Number);
        const start = new Date(startDate[0],startDate[1],startDate[2],startTime[0],startTime[1],0);
        const end = new Date(endDate[0],endDate[1],endDate[2],endTime[0],endTime[1],0);
        if (start.getTime() > end.getTime()){
            setError("Thời gian chưa hợp lệ")
            return;            
        }

        const result = await addEvent({
            name: formInput.name,
            location: formInput.location,
            start_date: start.toString(),
            end_date: end.toString(),
        },authContext.token);
        if(result.status){
                setError(result.msg)
                return;
        }
        const filePost = await postEventAttendances(file,result.data.id,authContext.token);
        if(filePost.status){
            setError(filePost.msg)
            return;
        }         
        setFormInput({
            name: "",
            startTime: "",
            startDate: "",
            endTime: "",
            endDate: "",
            location: ""
        })
        setError("")
        setIsSuccessful(true);
    }
    const changeFile = (f)=>{
        setFile(f);
    }
    return (
        <div className={`row ${classes['row-container']}`}>
            {isChoosingData && <ChoosingFileModal selectedFileName={(file)?file.name : ""} onChangeFile={changeFile} onConfirm = {hideModalHandler} />}
            <div className={`col-md-7 ${classes['container-col-7']}`}>
                <div>
                    CSE Students Attendance <br/> Website
                </div>
                <p>
                Website dùng để đăng ký điểm danh các sự kiện <br/>
                 của khoa Khoa học và Kỹ thuật Máy tính
                </p>
            </div>
            <div className={`col-md-4 ${classes['container-col-4']}`}>
                <div className={`${classes['form-name']}`}>
                    ĐĂNG KÝ SỰ KIỆN
                </div>
                <form className={`${classes['form-event']}`}>
                    <div className="form-group">
                        <label htmlFor="eventName" style={{padding:'0.4rem'}}>Tên sự kiện</label>
                        <input type="text" className={`form-control ${classes['long-input']}`} 
                            id="eventNameInput" placeholder="Nhập tên sự kiện" style={{padding:'0.4rem'}}
                            onChange={nameChangeHandler} value={formInput.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="time" style={{padding:'0.4rem'}}>Thời gian</label> <br/>
                        <InputTime onChangeTime={timeStartChangeHandler}
                                   onChangeDate={dateStartChangeHandler}
                                   time={formInput.startTime} date={formInput.startDate}
                        >
                            Từ
                        </InputTime>
                        <InputTime onChangeTime={timeEndChangeHandler}
                                   onChangeDate={dateEndChangeHandler}
                                   time={formInput.endTime} date={formInput.endDate}
                        >
                            Đến
                        </InputTime>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="place" style={{padding:'0.4rem'}}>Địa điểm</label>
                        <input type="text" className={`form-control ${classes['long-input']}`} id="eventNameInput" 
                        placeholder="Nhập địa điểm" style={{padding:'0.4rem'}} onChange={locationChangeHandler}
                        value={formInput.location}/>
                    </div>
                    <div onClick={openModalHandler} className={classes.fileContainer}>
                        <div className='row'>
                           <p> {!file && (<><BsFolderPlus/>  Chọn tập dữ liệu</>)}
                                {file && (<>{file.name}</>)}
                           </p>
                        </div>
                    </div>
                    {!isSuccessful && <Error>{error}</Error>}
                    {isSuccessful && <Success>Đã gửi thành công đăng ký</Success>}
                    <Button style={{marginBotton: '2rem', float: 'right'}}  onClick={submitHandler}>Đăng ký</Button>
                </form>               
            </div>
        </div>
    )
}
export default Home;