import indexTpl from "../views/index.art";
import {auth as authModel} from '../models/auth'
import img from '../assets/user.jpg'
import pageHeader from '../components/pageheader'
import page from '../databus/data'


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
      $(".wrapper").resize()
      // 加载页面导航
      pageHeader() 

      // 登出事件绑定
      $('#users-signout').on('click', (e) => {
        e.preventDefault()
        localStorage.setItem('lg-token', ''); 
        location.reload()
      });

      const $anchors = $('#sidebar-menu li:not(:first-child) a') 
      let hash = location.hash
      $anchors
        .filter(`[href="${hash}"]`)
        .parent()
        .addClass('active')
        .siblings()
        .removeClass('active')
      if(hash !== page.currRoute) {
        page.reset()
      }
      page.setCurrRoute(hash)

    } else {    
      router.go('/signin')
    }
  }; 
};
