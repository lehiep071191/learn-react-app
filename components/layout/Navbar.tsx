import React, { Ref, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import Router from "next/router";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setTokenValue } from "../../redux/slices/token.slice";

interface NavBarProps {
  token: string;
}

export function Navbar({ token }: NavBarProps) {
  const [isLogin, setLogin] = useState(false);
  // const [focusLink, setFocusLink] = useState<string>("home");
  const cookies = new Cookies();
  const [showMenu, setShowmenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const loginRef: any = useRef(null);
  const homeRef: any = useRef(null);
  const signupRef: any = useRef(null);
  const logoutRef: any = useRef(null);
  useEffect(() => {
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [token]);

  const focusLink = useMemo(() => {
    const pathName = Router.pathname
    if (pathName.includes('/sign-up')) {
      return 'sign-up'
    } else if (pathName.includes('/login')) {
      return 'login'
    } else {
      return 'home'
    }

    console.log(pathName)
  }, [Router.pathname])


  useEffect(() => {
    homeRef.current.style.color = "skyblue";
    loginRef.current.style.color = "skyblue";
    signupRef.current.style.color = "skyblue";
    switch (focusLink) {
      case "home":
        if (homeRef.current) {
          homeRef.current.style.color = "red";
        }
        break;
      case "login":
        if (loginRef.current) {
          loginRef.current.style.color = "red";
        }
        break;
      case "sign-up":
        if (signupRef.current) {
          signupRef.current.style.color = "red";
        }
        
        break;
    }
  }, [focusLink]);
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      dispatch(setTokenValue(""));
      cookies.remove("refresh");
      Router.replace("/");
    }
  };
  function handleSignUp() {
    Router.replace("/sign-up");
  }
  const handleLogin = () => {
    Router.replace("/login");
  };

  return (
    <div className="header-navbar" style={{ position: "relative" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="left-header"></div>
        <div className="right-header">
          <div
            className="btn-style"
            color={"secondary"}
            ref={homeRef}
            onClick={() => {
              Router.replace("/");
            }}
          >
            Home
          </div>
          {!isLogin && (
            <>
              <div
                className="btn-style"
                color={"secondary"}
                onClick={() => {
                  handleLogin();
                }}
                ref={loginRef}
              >
                Login
              </div>

              <div className="vertical-line"></div>
            </>
          )}
          {!isLogin && (
            <>
              <div
                className="btn-style"
                color={"secondary"}
                onClick={() => {
                  handleSignUp();
                }}
                ref={signupRef}
              >
                SignUp
              </div>

              <div className="vertical-line"></div>
            </>
          )}
          {isLogin && (
            <div
              className="btn-style"
              color={"secondary"}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </div>
          )}
          <div
            className="list-btn-mobile"
            onClick={() => setShowmenu(!showMenu)}
          >
            Menu
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="mobile-menu">
          <div
            style={{ position: "absolute", top: "5px", right: "10px" }}
            onClick={() => setShowmenu(false)}
          >
            X
          </div>
          {!isLogin && (
            <a
              onClick={() => {
                handleLogin();
                setShowmenu(false);
              }}
            >
              Login
            </a>
          )}
          {!isLogin && (
            <a
              onClick={() => {
                handleSignUp();
                setShowmenu(false);
              }}
            >
              Sign Up
            </a>
          )}
          {isLogin && (
            <a
              onClick={() => {
                handleLogout();
                setShowmenu(false);
              }}
            >
              Logout
            </a>
          )}
          <a
            onClick={() => {
              Router.replace("");
              setShowmenu(false);
            }}
          >
            Home
          </a>
        </div>
      )}
    </div>
  );
}
