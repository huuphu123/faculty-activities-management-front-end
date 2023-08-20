function validate(values) {
    const regID = /^\d+$/
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    
    const regexEmail = value => {
        var result = false;
        result = !value.includes('@hcmut.edu.vn')
        return result
    }
    
    let errors = {}
    
    if(!values.fullname.trim()) {
       errors.fullname = "Cần nhập thông tin này"
    }
    
    if(!values.id.trim()) {
        errors.id = "Cần nhập thông tin này"
    } else if (!regID.test(values.id) || values.id.length !==7) {
        errors.id = "MSSV không hợp lệ"
    }
    
    if(!values.birthday) {
        errors.birthday = "Cần nhập thông tin này"
    }
    
    if(!values.email.trim()) {
        errors.email = "Cần nhập thông tin này"
    } else if(!regEmail.test(values.email)) errors.email = "Email không hợp lệ"
    else if (regexEmail(values.email)) {
        errors.email = "email@hcmut.edu.vn"
    }
    
    if(!values.phone.trim()) {
        errors.phone = "Cần nhập thông tin này"
    } else if (!regPhone.test(values.phone) ) {
        errors.phone = "Số điện thoại không hợp lệ"
    }
    
    if(!values.password.trim()) {
        errors.password = "Cần nhập thông tin này"
    }else if (values.password.length < 8) errors.password = "Mật khẩu cần ít nhất 8 kí tự"

    return errors
}

export default validate;