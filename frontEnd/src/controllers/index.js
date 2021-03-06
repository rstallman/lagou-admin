import indexTpl from "../views/index.art";
import {auth as authModel} from '../models/auth'
import img from '../assets/user.jpg'

export const index = (router) => {  
  return async (req, res, next) => {
    let result = await authModel();
    if(result.ret){ 
      const html = indexTpl({
         subRouter: res.subRoute(),
         img
      }); 
      next(html)   
      // window resize,让页面撑满屏幕
      $(window, ".wrapper").resize();    
      const $anchors = $('#sidebar-menu li:not(:first-child) a') 
      let hash = location.hash
      $anchors
        .filter(`[href="${hash}"]`)
        .parent()
        .addClass('active')
        .siblings()
        .removeClass('active') 
    } else {    
      router.go('/signin')
    }
  }; 
};
