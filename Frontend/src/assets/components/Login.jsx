import React, { useState, } from 'react'
import "./Login.css"

function Login(props) {

  return (
    <div className="popup">
        <div className="popup-content">
            <div className="logopart"><img src="nobg1.PNG" alt="" className="logo"/>
            <h1 className="heading">Login</h1> </div>
            <img src="close1.png" alt="" className="close" onClick={props.toggle} />
            <input type="text" name="Username" id="" placeholder="Username" className="input1" />
            <input type="password" name="password" placeholder="Password" className="input1"/><br />
            <button className="button-47">Login</button>
        </div>
    </div>
  )
}

export default Login