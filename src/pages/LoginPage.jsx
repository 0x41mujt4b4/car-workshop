import React from 'react'
import Header from '../components/Header'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div className='pt-24'>
             <Header
                heading="دنبلاب لصيانة السيارات"
                paragraph="فضلاً قم بتسجيل الدخول"
                // linkName="Signup"
                // linkUrl="/signup"
                />
                <Login />
            
        </div>
  )
}

export default LoginPage