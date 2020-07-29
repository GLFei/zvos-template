import Cookies from 'js-cookie'

const AuthToken = 'am_token'
export default {
    setToken(token){
        Cookies.set(AuthToken,token);
        if(typeof sessionStorage !== 'undefined'){
            sessionStorage.setItem(AuthToken,token)
        }
    },
    getToken(){
        return Cookies.get(AuthToken)
    },
    getSessionToken(){
        if(typeof sessionStorage !== 'undefined'){
            return sessionStorage.getItem(AuthToken)
        }else{
            return null;
        }
    },

    removeToken(){
        Cookies.remove(AuthToken)
        if(typeof sessionStorage !== 'undefined'){
            sessionStorage.removeItem(AuthToken);
        }

    }
}


