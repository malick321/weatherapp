import React from "react";
import { Link } from "react-router-dom";

const Nav = ({appdata,email}) => {
   
  const navStyle = {
    color: "black",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "left",
    backgroundColor: "lightgray",
    padding: "10px 0",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "blue",

    margin: "0 20px",
    fontWeight: "bold",
  };
  

  return (
    <nav style={navStyle}>
      <a href="/" style={linkStyle}>
        Home
      </a>
      <a  href="/Contactus" style={linkStyle}>
        Contact
      </a>
      <a  href="/Help"style={linkStyle}>
        Help
      </a>
      <a href="/FAQ" style={linkStyle}>
        FAQ
      </a>
      
      <a href="/Signup"
        
        style={{
          float: "right",
          textDecoration: "none",
          color: "blue",
         
          margin: "10 20px",
          fontWeight: "bold",
        }}
      >
        Signup
      </a>
    </nav>
  );
};

export default Nav;
