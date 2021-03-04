import SMERouter from 'sme-router';
const router = new SMERouter('root');
import {index} from '../controllers/users/index';
import signin from '../controllers/signin';
import {auth as authModel}   from '../models/auth'
 
router.use( async (req) => {
  let result = await authModel();
  if(result.ret){ 
    router.go('/index');
  } else {
    router.go('/signin')  
  }
})

router.route('/', () => {});

router.route('/signin', signin(router));
router.route('/index', index(router));
 

export default router; 