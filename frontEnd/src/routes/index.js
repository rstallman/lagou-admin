import SMERouter from 'sme-router';

const router = new SMERouter('root');

import {index} from '../controllers/index';
import signin from '../controllers/signin';
 
router.use((req) => {

  $.ajax({ 
    url:'/api/users/isAuth',
    success(result){
      if(result.ret){
        router.go('/index');
      } else {
        router.go('/signin')
      }
    }
  }); 

})

router.route('/', () => {});

router.route('/signin', signin(router));
router.route('/index', index(router));
 

export default router; 