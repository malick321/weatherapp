import React from "react";

const Login = ({ email, password, setemail, setpassword, handleSubmit1,error }) => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "#ffffff" }}>Weather App</h1>
      <form
        onSubmit={handleSubmit1}
        style={{
          textAlign: "center",
          backgroundColor: "#8BCDCD",
          borderRadius: "10px",
          border: "1px solid red",
          width: "300px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label
          htmlFor="Email"
          style={{ borderRadius: "3px", color: "#fffff", fontSize: "large" }}
        >
          Email:
        </label>
        <input
        style={{borderRadius:"5px", backgroundColor:"sienna"}}
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label
          htmlFor="Email"
          style={{ borderRadius: "3px", color: "#fffff", fontSize: "large" }}
        >
          Password:
        </label>
        <input
        style={{borderRadius:"5px", backgroundColor:"sienna"}}
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button
          style={{
            borderRadius: "4px",
            color: "#fffff",
            fontSize: "large",
            marginTop: "7px",
          }}
        >
          Login
          {error && <p>{error}</p>}
        </button>
        <button
          style={{
            borderRadius: "4px",
            color: "#fffff",
            fontSize: "large",
            marginTop: "7px",
          }}
        >
         Forget Password
          {error && <p>{error}</p>}
        </button>
      </form>
    </div>
  );
};

export default Login;
