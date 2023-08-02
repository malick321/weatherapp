// ContactUs.jsx
import React from 'react';

const ContactUs = () => {
  return (
    <div style={{textAlign:"center"}}>
      <h1 style={{color:"#ffffff", borderRadius:'3px'}}>Contact Us</h1>
      <p style={{color:"sienna", fontSize:"large"}}>Please fill out the form below to contact us:</p><br></br>
      <form>
        <label htmlFor="name">Name:</label><br></br>
        <input type="text" id="name" name="name" style={{borderRadius:"3px"}} /><br /><br />
        <label htmlFor="email">Email:</label><br></br>
        <input type="email" id="email" name="email" style={{borderRadius:"3px"}} /><br /><br />
        <label htmlFor="message">Message:</label><br></br>
        <textarea id="message" name="message" style={{fontSize:"large"}}></textarea><br /><br />
        <button type="submit" style={{borderRadius:"3px"}}>Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
