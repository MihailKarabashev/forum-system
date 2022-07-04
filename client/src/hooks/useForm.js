import { useState } from "react";

const initialValues = {
    email: '',
    password: ''
}

const useForm = (callback) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});


    const validate = (event, name, value) => {
        switch (name) {
            case 'username':
                if (value.length <= 4) {
                    setErrors({
                        ...errors,
                        username: 'Username atleast have 5 letters'
                    })
                } else {
                    let { username, ...newObj } = errors;
                    console.log(newObj);
                    setErrors(newObj);

                }
                break;

            case 'email':
                if (
                    !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                } else {
                    let { email, ...newObj } = errors;
                    setErrors(newObj);

                }
                break;

            case 'password':
                if (value.length < 4) {
                    setErrors({
                        ...errors,
                        password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                } else {
                    let { password, ...newObj } = errors;
                    setErrors(newObj);

                }
                break;

            default:
                break;
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        validate(e, name, value);

        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
            callback();
        } else {
            console.log('error');
        }
    }


    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
}


export default useForm;