import React, { useState } from "react";
import { useEffect } from "react";
import Router from "next/router";
import Cookies from "universal-cookie";
import { setToken } from "../../redux/actions/main";
import { connect } from "react-redux";

interface NavBarProps {
  token: string;
  setToken?: (values: string) => void;
}

function Navbar({ token, setToken = (values: string) => {} }: NavBarProps) {
  const [isLogin, setLogin] = useState(false);
  const cookies = new Cookies();
  const [showMenu, setShowmenu] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [token]);
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setToken("");
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

const mapStateToPops = (state: any) => {
  return { token: state.main.token };
};

const mapDispatchToProps = {
  setToken,
};

export default connect(mapStateToPops, mapDispatchToProps)(Navbar);
