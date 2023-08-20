import React from 'react'
import { Link } from 'react-router-dom'

const FormSuccess = () => {
  return (
    <React.Fragment>
    <h1>Đăng ký thành công</h1>
    <Link to='/form-login'>Đăng nhập</Link>
    </React.Fragment>
  )
}

export default FormSuccess




