import signinTpl from "../views/signin.art";
import {signin as signinModel} from '../models/signin';
const htmlSignin = signinTpl({});


const _handleSubmit = (router) => {
  return async (e) => {
    e.preventDefault();
    const data = $("#signin").serialize();
    let {res, jqXHR} = await signinModel(data );
    const token =  jqXHR.getResponseHeader('X-Access-Token'); 
    localStorage.setItem('lg-token', token)

    if(res.ret){ 
      router.go('/index') 
    }
  };
}; 


const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin);
    $("#signin").on("submit", _handleSubmit(router));
  };
}; 


export default  signin;