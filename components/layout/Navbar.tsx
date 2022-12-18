import React, { useState } from 'react'
import homeStyle from '../../styles/Header.module.css'
import { useEffect } from 'react';
import Router from 'next/router';

interface NavBarProps {
  token: string
}

export default function Navbar(props: NavBarProps) {
  const {token} = props
  const [isLogin, setLogin] = useState(false)
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
          {isLogin && <button className='btn' onClick={() => {
            handleLogout()
          }}>Logout</button>}
        </div>
    </div>
  )
}
