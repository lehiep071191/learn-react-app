import React from 'react'
import { Formik, FormikHelpers, FormikValues, FormikProps } from 'formik';
import TextInputFieldFormik from '../../components/forms/TextInput';
import 'bootstrap/dist/css/bootstrap.css';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { httpPostRequest } from '../../https/api';
import { useRouter } from 'next/router';
import { backEndUrl } from '../../commons/url.constant';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const initialLoginValue = {
  email: '',
  password: '',
}

const stlForm: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '50%'
}

export default function Login() {
  const router = useRouter()
  const url = backEndUrl.loginUrl
  const cookies = new Cookies();
  useEffect(() => {
    const token = localStorage.getItem('token') 
      if(token) {
        router.replace('/')
        alert('you logined')
      }  
  },[])
  const handleOnSubmit = (value: any) => {
    const date = new Date()
    const expiresAt = date.getTime() + 60*1000*60*24*30 
    httpPostRequest(url, value).then(res => {
      if(res) {
        cookies.set('refresh', res?.data?.refreshToken, {
          expires: new Date(expiresAt)
        })
        cookies.set('token',res?.data?.access_token, )
        console.log(cookies.get('refresh'))
        router.replace('/')
      }
    }).catch(e => {
      alert(e)
    })
  }
  return (
    <div className='container'>
        <center style={{marginTop: "25px"}}><h1>LOGIN</h1></center>
        <Formik
          initialValues={initialLoginValue} 
          onSubmit={(values) => {
            handleOnSubmit(values)
          }
        }>
          {
            (formik) => (
              <form style={{display: 'flex', justifyContent: 'center'}} onSubmit={formik.handleSubmit}>
                <div style={stlForm}>
                  <TextInputFieldFormik 
                    label={'Email'} 
                    name={'email'} 
                    placeHolder={'nh????p va??o email cu??a ba??n'} 
                    formik={formik}
                  />
                  <TextInputFieldFormik 
                    label={'Password'} 
                    name={'password'} 
                    placeHolder={'nh????p va??o password'} 
                    type={'password'}
                    formik={formik}
                  />
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button type='submit' className='btn btn-primary' style={{marginTop: '15px', width: '120px'}}>
                      login
                    </button> 
                  </div>
                </div>
              </form>
            )
            
          }
          
        
        </Formik>
    </div>
  )
}
