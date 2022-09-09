import './Account.scss';
import React from "react";
import Header from "../Header/Header";
import {logout,gigyaEventListener} from "../../services/httpRequests";


function Account() {


    gigyaEventListener();

    return (
        <>
            <Header/>
            <div className="account-details">
                <div className="text">
                    You are logged in
                </div>
                <div className="custom-link">
                    <div onClick={logout} className="link-text">Logout</div>
                </div>
            </div>
        </>
    );
}

export default Account;
