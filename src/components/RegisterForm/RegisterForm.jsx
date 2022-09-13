import React, {useRef, useState} from "react";
import './registerForm.scss';
import 'react-toastify/dist/ReactToastify.css';
import {OwnID} from "@ownid/react";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {registerUser,gigyaEventListener} from "../../services/httpRequests";


function RegisterComponent() {
    const emailField = useRef(null);
    const passwordField = useRef(null);
    let navigate = useNavigate();

    gigyaEventListener();

    function onSubmit(event,ownIdData) {
        event.preventDefault();
        //Call your existing registration logic in the backend
        const userData = {loginId: emailField.current.value, password: passwordField.current.value};

        return registerUser(userData);
    }

    return (
        <>
            <Header/>
            <div className="nav-tabs">
                <a className="nav-link active">Register</a>
            </div>
            <form onSubmit={onSubmit} className="login-form">
                <input ref={emailField} type="email" name="email" placeholder="Email" required/>
                <input ref={passwordField} type="password" name="password" placeholder="password" required/>
                <button type="submit">Register</button>
                <OwnID type='register'
                       options={{ variant: 'button-fingerprint', infoTooltip:true, widgetPosition:'start' }}
                       loginIdField={emailField}
                       passwordField={passwordField}
                       onError={(error) => console.error(error)}
                       onLogin={(response) => console.log(response)}
                       onRegister={(response) => console.log(response)}/>
                       
            </form>
            <div className="custom-link" onClick={() => navigate('/login')}>
                <div className="link-text">Already have an account?</div>
            </div>
        </>
    );
}

export default RegisterComponent;
