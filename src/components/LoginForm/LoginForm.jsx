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
                       options={{ variant: 'button-fingerprint', boxShadow:'0', infoTooltip:true, widgetPosition:'start', infoTooltipPosition:'bottom', tooltip: { position: 'start' } }}
                       passwordField={passwordField}
                       loginIdField={emailField}
                       language='it'
                       onError={(error) => console.log(error)}
                       onLogin={(response) => console.log(response)}
                       onBeforeLogin={(response) => console.log(response)}
                       onMagicLink={(response) => console.log(response)}/>
            </form>
            <div className="custom-link" onClick={() => navigate('/register')}>
                <div className="link-text">Don't have an account?</div>
            </div>
        </>
    );
}

export default LoginForm;
