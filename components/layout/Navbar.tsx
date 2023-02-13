import React, { useState } from 'react'
import homeStyle from '../../styles/Header.module.scss'
import { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import * as fontIcon from '@fortawesome/free-solid-svg-icons'

interface NavBarProps {
  token: string
}



export default function Navbar(props: NavBarProps) {
  const {token} = props
  const [isLogin, setLogin] = useState(false)
  const cookies = new Cookies()
  const [showMenu, setShowmenu] = useState<boolean>(false)
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
      cookies.remove('refresh')
      Router.replace('/')
    }
  }
  function handleSignUp() {
    Router.replace('/sign-up')
  }
  const handleLogin = () => {
    Router.replace('/login')
  }

  return (
    <div className='header-navbar' style={{position: 'relative'}}>
        <div className='container' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className='left-header'>
            
          </div>
          <div className='right-header'>
            <div className='btn-style' color={ "secondary"}  onClick={() => {Router.replace('/')}}>
                  Home
            </div>
            {!isLogin && (
              <>
                <div className='btn-style' color={ "secondary"}  onClick={() => {handleLogin()}}>
                  Login
                </div>
              
                <div className='vertical-line'></div>
              </>)
            }
            {!isLogin && (
              <>
                <div className='btn-style' color={ "secondary"}  onClick={() => {handleSignUp()}}>
                  SignUp
                </div>
              
                <div className='vertical-line'></div>
              </>)
            }
            {isLogin && <div  className='btn-style'  color={ "secondary"}  onClick={() => {
              handleLogout()
            }}>Logout</div>}
            <div className='list-btn-mobile'>
              <FontAwesomeIcon icon={fontIcon.faBars} size="xl" color='gray' onClick={() => setShowmenu(!showMenu)}/>
            </div>
          </div>
        </div>
        {showMenu && <div className='mobile-menu'>
            <div style={{position: 'absolute', top: '5px', right: '10px'}}>
              <FontAwesomeIcon icon={faClose} size="lg" color='gray' onClick={() => setShowmenu(false)}/>
            </div>
            {!isLogin && <a onClick={() => 
              {
                handleLogin()
                setShowmenu(false)
              }
            }>
               <FontAwesomeIcon icon={fontIcon.faArrowRightFromBracket} size="lg" color='gray'/> Login
            </a>}
            {!isLogin && <a onClick={() => 
              {
                handleSignUp()
                setShowmenu(false)
              }
            }>
              <FontAwesomeIcon icon={fontIcon.faArrowRightToBracket} size="lg" color='gray'/> Sign Up
            </a>}
            {isLogin && <a onClick={() => 
              {
                handleLogout()
                setShowmenu(false)
              }
            }>
              <FontAwesomeIcon icon={fontIcon.faArrowLeft} size="lg" color='gray'/> Logout
            </a>}
            <a onClick={() => 
              {
                Router.replace('')
                setShowmenu(false)
              }
            }>
              <FontAwesomeIcon icon={fontIcon.faHome} size="lg" color='gray'/> Home
            </a>

        </div>}
    </div>
  )
}