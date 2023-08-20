import React from 'react';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import validate from '../../Components/ValidateForm';
import styles from './Register.module.css'
import { register, login } from '../../api/userApi'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Register = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [values, setValues] = useState ({
        fullname: '',
        id: '',
        birthday: '',
        email: '',
        phone: '',
        password: ''    
    })

    const [msg, setMsg] = useState('')
    
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
        setErrors(validate(values))
        setIsSubmitting(true)
        if(Object.keys(errors).length === 0 && isSubmitting) {
            const result = await register({...values, passwordConfirm: values.password })
            console.log(result)
            if(result.status) {
                setMsg(result.msg)
            } else {
                setMsg('')
                handleShow()
            }

            // navigate('../')
        }
    }   
    return (
        <div className={styles.container}>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Đăng ký thành công!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tài khoản đang chờ xét duyệt</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className={styles.formRegister}>
                <form className={styles.form} id="form-1">
                    <h3 className={styles.heading}>ĐĂNG KÝ TÀI KHOẢN</h3>       
                    <div className={styles.formGroup}>
                        <div>
                            <label htmlFor="fullname" className={styles.formLabel}>Tên đầy đủ</label>
                            <input id="fullname" type="text" name="fullname" placeholder="Nguyễn Văn A" className={styles.formInput} value={values.fullname} onChange = {handleChange}
                            />
                            {errors.fullname &&  <span className={styles.formMessage}>{errors.fullname}</span>}
                        </div>
                    </div>
                    
                    <div className={styles.formGroupGrid}>
                        <div className={styles.formGroup2}>
                            <label  htmlFor="id" className={styles.formLabel}>Mã số sinh viên</label>
                            <input id="id" type="text" name="id" placeholder="xxxxx" className={styles.formInput}  value={values.id} onChange = {handleChange}/>
                            {errors.id &&  <span className={styles.formMessage}>{errors.id}</span>}        
                        </div>
                            
                        <div className={`${styles.formGroup2} ${styles.formDate}`} >
                            <label  htmlFor="birthday" className={styles.formLabel}>Ngày sinh</label>
                            <input id="birthday" type="date" name="birthday"  className={styles.formInput} value={values.birthday} onChange = {handleChange}/>
                            {errors.birthday &&  <span className={styles.formMessage}>{errors.birthday}</span>}
                        </div>
                    </div>        
                    <div className={styles.formGroup}>
                        <div>
                            <label  htmlFor="email" className={styles.formLabel}>Email</label>
                            <input id="email" type="email" name="email" placeholder="email@hcmut.edu.com" className={styles.formInput} value={values.email} onChange = {handleChange}/>
                            {errors.email &&  <span className={styles.formMessage}>{errors.email}</span>}
                        </div>  
                    </div>
                    <div className={styles.formGroup}>
                        <div>
                            <label  htmlFor="phone" className={styles.formLabel}>Số điện thoại</label>
                            <input id="phone" type="text" name="phone" placeholder="0xxxxxxxxx" className={styles.formInput} value={values.phone} onChange = {handleChange}/>
                            {errors.phone &&  <span className={styles.formMessage}>{errors.phone}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div>
                            <label  htmlFor="password" className={styles.formLabel}>Mật khẩu</label>
                            <input id="password" type="password" name="password" placeholder="Tạo mật khẩu" className={styles.formInput} value={values.password} onChange = {handleChange}/>
                            {errors.password &&  <span className={styles.formMessage}>{errors.password}</span>}
                        </div>
                    </div>
                    
                    <span className={styles.formMessages}>{msg}</span>

                    <div className={styles.formGroupGrid1}>
                        <div className={styles.item1Grid}>
                            <div className={styles.formAside}>
                                <p>Bạn đã có tài khoản?</p><Link to="/login" className={styles.loginLink}>Đăng nhập</Link>
                            </div>
                        </div>
                        <div className={styles.item2Grid}>
                            <button className={styles.formSubmit} onClick={handleSubmit}>Đăng ký</button>
                        </div>
                    </div>
        
                </form>
            </div>
        </div>
    )
}

export default Register;