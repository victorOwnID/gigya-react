import {toast} from "react-toastify";
const API_URL = 'http://localhost:3002/'

export function registerUser(bodyData) {

    window.gigya.accounts.initRegistration({callback:function(e){
        window.gigya.accounts.register({regToken:e.regToken,email:bodyData.loginId,password:bodyData.password,finalizeRegistration:true, callback:function(ev){

            if(ev.errorCode === 0){
                //registration was correct
                toast.done('User registered!')
            }else{
                //we print an error
                toast.error(ev.errorMessage);
            }
        }})
    }})
  
}

export function gigyaEventListener() {

    window.gigya.accounts.addEventHandlers({
        onLogin:function(ev){
            //whenever there's a global login event, we redirect to the account
            window.location = '/account';
        },
        onLogout:function(ev){
            //whenever there's a logout event, we redirect to the login
            window.location = '/login';
        }
    });
  
}

export function logout(){
    window.gigya.accounts.logout();
}

export function loginUser(bodyData) {
    window.gigya.accounts.login({loginID:bodyData.loginId,password:bodyData.password,callback:function(ev){
        if(ev.errorCode === 0){
            //registration was correct
            toast.done('User logged in!')
        }else{
            //we print an error
            toast.error(ev.errorMessage);
        }
    }});
}
