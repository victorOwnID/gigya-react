const API_URL = 'http://localhost:3002/'

export function registerUser(bodyData) {

    window.ownid.sdk.getOwnIDData("register").then((value) => {
        bodyData.data = value.data;
        bodyData.meta = value.metadata.dataField;
        });

    window.gigya.accounts.initRegistration({callback:function(e){
        window.gigya.accounts.register({regToken:e.regToken,email:bodyData.loginId,password:bodyData.password,data:{ownId:bodyData.data},finalizeRegistration:true, callback:function(ev){
            debugger;
            if(ev.errorCode === 0){
                window.location = '/login';

            }
        }})
    }})
  
}

export function loginUser(bodyData) {
    debugger;
    window.gigya.accounts.login({loginID:bodyData.loginId,password:bodyData.password,callback:function(ev){
        if(ev.errorCode === 0){
            window.location = '/account';
        }
    }});
}

function  httpPostRequest(route,bodyData) {
    return fetch(API_URL + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    }).then(response => response.json());
}
