import React from 'react'
import Header from '../components/Header'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <>
             <Header
                heading="دنبلاب لصيانة السيارات"
                paragraph="فضلاً قم بتسجيل الدخول"
                // linkName="Signup"
                linkUrl="/signup"
                />
                <Login />
            
        </>
  )
}

export default LoginPage