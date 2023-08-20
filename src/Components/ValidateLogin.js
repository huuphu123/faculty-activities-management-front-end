function validateLogin (values) {

    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   
    
    const regexEmail = value => {
        var result = false;
        result = !value.includes('@hcmut.edu.vn')
        return result
    }
    
    let errors = {}
   
    if(!values.email.trim()) {
        errors.email = "Cần nhập thông tin này"
    } else if(!regEmail.test(values.email)) errors.email = "Email không hợp lệ"
    else if (regexEmail(values.email)) {
        errors.email = "email@hcmut.edu.vn"
    }
    
  
    
    if(!values.password.trim()) {
        errors.password = "Cần nhập thông tin này"
    }else if (values.password.length < 8) errors.password = "Mật khẩu cần ít nhất 8 kí tự"

    return errors
}

export default validateLogin;