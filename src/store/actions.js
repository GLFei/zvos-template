/**
 * Created by whobird on 17/8/17.
 */
import * as types from './mutation-types'
import router from '../router'
import tokenService from '@/utils/services/token_service'

export const setOpenid=(context,hasOpenid)=>{
  return new Promise(resolve => {
    context.commit(types.SET_OPENID,{
      openid:hasOpenid
    })
    resolve(hasOpenid);
  });

}

export const setTelNumber=(context,telNumber)=>{
  return new Promise(resolve => {
    context.commit(types.SET_PHONE_NUM,{
      telNumber:telNumber
    })
    resolve(telNumber);
  });
}

export const setLogin=(context,hasLogin)=>{
  return new Promise(resolve => {
    context.commit(types.SET_LOGIN,{
      login:hasLogin
    })
    resolve(types.SET_LOGIN);
  });

}

export const setCompanyList=(context,companyList)=>{


  return new Promise(resolve => {
    context.commit(types.SET_COMPANY_LIST,{
      companyList: companyList
    })
    resolve(companyList);
  });
}

export const logout=(context)=>{

  return new Promise(resolve => {
    tokenService.removeToken();
    context.commit(types.SET_LOGIN,{
      login:false
    });

    context.commit(types.SET_AUTHREADY,{
      authReady:false
    });

    //localStorage.setItem("login",false);
    //localStorage.setItem('tokenKey','');
    router.push({
      name:'login'
    })
    //window.location.reload();
    resolve();
  });
}

export const setMenuCollapse=(context,value)=>{
  localStorage.setItem('menuCollapse', value)
  context.commit(types.SET_MENU_COLLAPSE, value)
}
