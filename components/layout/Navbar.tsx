import React, { useState } from 'react'
import homeStyle from '../../styles/Header.module.css'
import { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';

interface NavBarProps {
  token: string
}

export default function Navbar(props: NavBarProps) {
  const {token} = props
  const [isLogin, setLogin] = useState(false)
  const cookies = new Cookies()
  useEffect(() => {
    if(token) {
      setLogin(true)
    } else {
      
      setLogin(false)
    }
  },[token])
  const handleLogout = () => {
    if(typeof window !== 'undefined') {
      localStorage.removeItem('token')
      
      cookies.remove('token')
      console.log(cookies.get('refresh'))
      Router.replace('/')
    }
  }
  const handleLogin = () => {
    Router.replace('/login')
  }
  return (
    <div className={homeStyle.headerNavbar}>
        <div className='container'>
          {!isLogin && <button className='btn' onClick={() => {
            handleLogin()
          }}>Login</button>}
          { <button className='btn' onClick={() => {
            handleLogout()
          }}>Logout</button>}
        </div>
    </div>
  )
}
