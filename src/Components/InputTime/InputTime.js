import classes from "./InputTime.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const InputTime = (props) => {
    const timeChangeHandler = (e) =>{
        props.onChangeTime(e.target.value);
    }
    const dateChangeHandler = (e) =>{
        props.onChangeDate(e.target.value);
    }
    return (
        
            <div className={`row ${classes['inputRow']}`}>
                <div className="col-sm-2">
                    <label style={{fontWeight:"bold"}}>{props.children}</label>
                </div>
                <div className="col-sm-5">
                    <input onChange={timeChangeHandler} value={props.time} type="time" className={`${classes['time-input']} ${classes['short-input']}`}/>
                </div>
                <div className="col-sm-5">
                    <input onChange={dateChangeHandler} value={props.date} type="date" className={`${classes['date-input']} ${classes['short-input']}`}/>
                </div>
            </div>
    )
}

export default InputTime