import {auth as authModel} from '../../models/auth' 
 
 export default (router) => {
  return  async(req, res, next) => {
    let result = await authModel()
    if(result.ret) {
      next()
      res.render('<div>positions</div> ')
    } else {
      router.go('/signin')
    } 
    
  }
   
 }