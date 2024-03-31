import React from 'react'

export default function Footer() {
    let footerstyle={
       
        top:" 100vh",
        width: "100%",
        padding: "45pxs"
      }
    return (
        <footer className='bg-dark text-center text-light py-3' style = {footerstyle}>
         Copyright &copy; SHIFT HAPPENS.com
        </footer>
       )
}