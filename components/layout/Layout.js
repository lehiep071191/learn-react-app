import React from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";

export function Layout({ children }) {
  const token = useSelector((state) => state.token);
  console.log(token)
  console.log(token)
  return (
    <>
      <Navbar token={token.token}></Navbar>
        <main className="body-height">{children}</main>
      <Footer></Footer>
    </>
  );
}
