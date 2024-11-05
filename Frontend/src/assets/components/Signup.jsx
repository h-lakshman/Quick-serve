import React from "react";
import "./Signup.css";

function Signup(props) {

  return (
    <div className="popup1">
      <div className="popup-content1">
        <h1 className="heading">Sign Up</h1>
        <img src="close1.png" alt="" className="close1" onClick={props.toggl} />
        <input type="text" name="Username" id="" placeholder="Username" className="input2" />
        <input type="text" name="first_name" placeholder="First Name" className="input2" />
        <input type="text" name="last_name" placeholder="Last Name" className="input2"/>
        <input type="password" name="password" placeholder="Password" className="input2"/>
        <input type="tel" name="phone_number" placeholder="Phone No" className="input2"/>
        <input type="password" name="password" placeholder="Password" className="input2"/>
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          className="input2"
        />
        <button className="button-1">Signup</button>
      </div>
    </div>
  );
}

export default Signup;
