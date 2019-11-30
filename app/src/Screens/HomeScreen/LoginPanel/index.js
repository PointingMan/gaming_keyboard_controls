import React, {useRef} from 'react';
import './index.css';
import { useHistory } from "react-router-dom";
import customFetch from 'services/requests.js'

function LoginPanel(props){
  /*customFetch("/test", {}, () => {
    console.log("wjdnwjdn")
  }, {
    method : "GET"
  });*/
  return (
    <div className={"LoginPanel-main-container"}>
      <CreateAccount />
      <Login/>
    </div>
  );
}

function CreateAccount(props){
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const history = useHistory();
  return (
    <form style={{
      height : "83vh",
      flex : 1,
      paddingTop : "5vh"
    }} onSubmit={(e) => {
      e.preventDefault();
      const body = {
        email : emailRef.current.value,
        username : usernameRef.current.value,
        password : passwordRef.current.value
      };
      customFetch("/users", body, (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.user));
        history.push("/dashboard");
      }, {
        method : "POST"
      });
    }}>
      <h2 style={{textAlign : "center", color : "white"}}>Not registered - create an account</h2>
      <div className={"LoginPanel-input-container"}>Email*<input ref={emailRef} type={"email"} required/></div>
      <div className={"LoginPanel-input-container"}>Username*<input ref={usernameRef} required/></div>
      <div className={"LoginPanel-input-container"}>Password*<input ref={passwordRef} type={"password"} required onInput={(e) => {
        if(e.currentTarget.value != confirmPasswordRef.current.value){
          confirmPasswordRef.current.setCustomValidity("Passwords must match")
        }else{
          confirmPasswordRef.current.setCustomValidity("")
        }
      }}/></div>
      <div className={"LoginPanel-input-container"}>Confirm password*<input ref={confirmPasswordRef} type={"password"} required onInput={(e) => {
        if(e.currentTarget.value != passwordRef.current.value){
          e.currentTarget.setCustomValidity("Passwords must match")
        }else{
          e.currentTarget.setCustomValidity("")
        }
      }}/></div>
      <div style={{margin : "-4vh auto 2vh auto", width : "fit-content", color : "white"}}>* required fields</div>
      <div style={{margin : "auto", width : "fit-content"}}><button className={"LoginPanel-button"} type={"submit"}>Create account</button></div>
    </form>
  );
}

function Login(props){
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  
  const history = useHistory();
  return (
    <form style={{
      height : "83vh",
      paddingTop : "5vh",
      flex : 1,
    }} onSubmit={(e) => {
      e.preventDefault();
      const body = {
        email : emailRef.current.value,
        password : passwordRef.current.value
      };
      customFetch("/login", body, (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.user));
        history.push("/dashboard");
      }, {
        method : "POST"
      });
    }}>
      <h2 style={{textAlign : "center", color : "white"}}>Already registered - login below</h2>
      <div className={"LoginPanel-input-container"}>Email<input type={"email"} ref={emailRef} required/></div>
      <div className={"LoginPanel-input-container"}>Password<input type={"password"} ref={passwordRef} required/></div>
      <div style={{margin : "auto", width : "fit-content"}}><button className={"LoginPanel-button"} type={"submit"}>Login</button></div>
    </form>
  );
}

export default LoginPanel;
