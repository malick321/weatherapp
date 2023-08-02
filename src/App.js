
import './App.css';
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import New from "./new";
import AppNavbar from "./navbar";
import FAQ from "./Navbar/faq";
import ContactUs from "./Navbar/contact";
import Help from "./Navbar/help";
import Login from "./Login";
import Signup from "./Sigup";
import { BrowserRouter, Routes, Route, Link,useNavigate } from "react-router-dom";

function App() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Signemail, setEmail] = useState("");
  const [Signpassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();
  const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/1.jpg)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city && country) {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=1d1788e95b164a80bee0ca758cb1f01d`)
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (Signpassword !== confirmPassword) {
      // Handle password mismatch error
      console.log("Passwords do not match");
      return;
    }

    try {
      // Send a POST request to the backend server
      await axios.post("http://localhost:5002/users", {
        firstName,
        lastName,
        Signemail,
        Signpassword,
        confirmPassword
      });

      // Clear the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect or show a success message
      console.log("User created successfully!");
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email: email,
        password: password,
      });
      if(response.data)
      {
        navigate("/Weather")
      }
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.error);
      alert(error.response.data.error);
    }
  };
  return (
    <div className="App" style={styles}>
      
      <AppNavbar />
      
      <Routes>
        `
        <Route
          path="/"
          exact
          element={
            <Login
              password={password}
              email={email}
              setemail={setemail}
              setpassword={setpassword}
              handleSubmit1={handleSubmit1}
             
            />
          }
        />
        <Route
          path="Weather"
          exact
          element={
            <New
              weatherData={weatherData}
              handleSubmit={handleSubmit}
              city={city}
              setcity={setcity}
              country={country}
              setcountry={setcountry}
              loading={loading}
            />
          }
        />
        <Route path="Contactus" exact element={<ContactUs />} />
        <Route path="Help" exact element={<Help />} />
        <Route path="Faq" exact element={<FAQ />} />
        
    <Route
      path="signup"
      exact
      element={
        <Signup
          handleSubmit2={handleSubmit2}
          Signemail={Signemail}
          Signpassword={Signpassword}
          firstName={firstName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          lastName={lastName}
          setConfirmPassword={setConfirmPassword}
          setEmail={setEmail}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
        />
      }
    />
       
      </Routes>
    </div>
  );

   

}

export default App;
