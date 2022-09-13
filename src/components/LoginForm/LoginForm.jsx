import React, {useRef} from "react";
import './loginForm.scss';
import {OwnID} from "@ownid/react";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {loginUser,gigyaEventListener} from "../../services/httpRequests";

function LoginForm() {
    const emailField = useRef(null);
    const passwordField = useRef(null);
    let navigate = useNavigate();

    gigyaEventListener();

    function onSubmit(event) {
        event.preventDefault();
        //Call your existing registration logic in the backend
        return loginUser({loginId: emailField.current.value, password: passwordField.current.value});
    }

    function onLogin(data) {
        //setting user session
        localStorage.setItem('data', JSON.stringify({token: data.token}));
        //redirecting user to the account page
        navigate('/account')
    }

    return (
        <>
            <Header/>
            <div className="nav-tabs">
                <a className="nav-link active">Login</a>
            </div>
            <form className="login-form" onSubmit={onSubmit}>
                <input ref={emailField} type="email" name="email" placeholder="Email" required/>
                <input ref={passwordField} type="password" name="password" placeholder="password" required/>
                <button type="submit">Log In</button>
                <OwnID type='login'
                       options={{ variant: 'button-fingerprint', infoTooltip:true, widgetPosition:'start', infoTooltipPosition:'bottom' }}
                       passwordField={passwordField}
                       loginIdField={emailField}
                       onError={(error) => console.error(error)}
                       onLogin={onLogin}/>
            </form>
            <div className="custom-link" onClick={() => navigate('/register')}>
                <div className="link-text">Don't have an account?</div>
            </div>
        </>
    );
}

export default LoginForm;
