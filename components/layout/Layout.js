import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const state = useSelector((state) => state);
  let token = state.main.token;

  return (
    <>
      <Navbar token={token}></Navbar>
      <main className="body-height">{children}</main>
      <Footer></Footer>
    </>
  );
}
