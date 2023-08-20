import React, {useState} from 'react'
import Register from '../Pages/Register/Register'
import FormSuccess from './FormSuccess'

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm () {
        setIsSubmitted(true)
    }
    return (
        <div>
            {!isSubmitted ? 
            (<Register submitForm = {submitForm}/>):
             (<FormSuccess/>)}
        </div>
    )
}

export default Form