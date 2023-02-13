import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"


export default function Layout({children}) {
    let token
    if(typeof window !== 'undefined') {
        token = localStorage.getItem('token')
    }
    
    return <>
        <Navbar token={token}></Navbar>
        <main className="body-height">{children}</main>
        <Footer></Footer>
    </>
}