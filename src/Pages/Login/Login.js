import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'
import validateLogin from '../../Components/ValidateLogin';
import {useState, useContext} from 'react'
import { login } from '../../api/userApi'
import AuthContext from '../../store/auth-context';



const Login = () => {
    const authContext = useContext(AuthContext);
    const [values, setValues] = useState ({
        email: '',
        password: ''    
    })

    // const [msg, setMsg] = useState('')
    
    const [errors, setErrors] = useState({})
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
       e.preventDefault()
        setErrors(validateLogin(values))
        setIsSubmitting(true)
        if(validateLogin(values)) {
            const result = await login(values);
            if(result.status){
                    setValues({
                        email: '',
                        password: ''  
                    })
                    setErrors({password:result.msg})
                    return;
            }
            console.log(result)
            authContext.login(result.token,result.msg.fullName,result.msg.role);
            window.location.href = "../";
        }
    }   
    return (
        <React.Fragment>
            
            <div className={styles.formLogin}>
            <form action="" method="POST" className={styles.form} id="form-1" onSubmit={handleSubmit}>
            <h3 className={styles.heading}>Đăng nhập</h3>
            <div className={`${styles.formGroup} ${styles.groupLogin}`}>
                <label  htmlFor="email" className={styles.formLabel}>Email</label>
                <div> 
                    <input id="email" type="email" name="email" placeholder="email@hcmut.edu.com" className={styles.formInput} value={values.email} onChange = {handleChange}/>
                </div>
                {errors.email &&  <span className={styles.formMessage}>{errors.email}</span>}
            </div>
            <div className={`${styles.formGroup} ${styles.groupLogin}`}>
                <label  htmlFor="password" className={styles.formLabel}>Mật khẩu</label>
                <input id="password" type="password" name="password" placeholder="Nhập mật khẩu" className={styles.formInput} value={values.password} onChange = {handleChange}/>
                {errors.password &&  <span className={styles.formMessage}>{errors.password}</span>}
            </div>
            <div className={`${styles.formGroupGrid1} `}>
                <div className={styles.item1Grid}>
                    <div  className={styles.formAside}>
                        <p>Bạn chưa có tài khoản?</p><Link to="/register" className={styles.registerLink}>Đăng kí</Link>
                        <Link to="#" className={styles.forgotLink}>Quên mật khẩu</Link>
                    </div> 
                </div>
                <div className={styles.item2Grid}>
                    <button className={styles.formSubmit}>Đăng nhập</button>
                </div>
            </div>
            </form>
        </div> 
      </React.Fragment>
    )
}

export default Login;