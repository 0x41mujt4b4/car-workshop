import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import {useNavigate} from "react-router-dom"

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate()

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate('/home')
        console.log('logged in!')
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{

    }

    return(
        <div className='flex items-center justify-center'>
            <form className="space-y-6 max-w-md w-full" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>

            <FormExtra/>
            <FormAction handleSubmit={handleSubmit} text="تسجيل الدخول"/>

            </form>
        </div>
    )
}