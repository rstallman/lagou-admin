import GP21Router from 'gp21-router';
const router = new GP21Router('root');
import {index} from '../controllers/index';
import signin from '../controllers/signin';
import {auth as authModel}   from '../models/auth'
import listUser from '../controllers/users/list-user' 
import listPosition from '../controllers/positions/list-position'

router.use( async (req) => {
 
  const url = req.url
  let result = await authModel();
  if(result.ret){ 
    router.go(url);
  } else {
    router.go('/signin')  
  }
})

// router.route('/', () => {});

router.route('/signin', signin(router));
router.route('/index', index(router));

router.route('/index/users', listUser(router))
router.route('/index/positions', listPosition (router))


router.route('*', (req, res, next) => {
  res.redirect('/index/users')
})


export default router; 