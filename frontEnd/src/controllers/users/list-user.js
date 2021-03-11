import usersTpl from "../../views/users.art";
import usersListTpl from "../../views/users-list.art";
import pagination from '../../components/pagination';
import page from '../../databus/data';
import {addUser} from './add-user';
import {usersList as userListModel} from '../../models/users-list'
import {auth as authModel} from '../../models/auth'
import {remove} from '../common/index'


const pageSize = page.pageSize; 
let state = {
  list:[]
}


const _loadData = async () => {
  let result = await userListModel();
  state.list = result.data
  // 分页
  pagination(result.data);
  // 数据渲染
  _list(page.currPage);
}; 

const _list = (pageNum ) => {
  let start = (pageNum - 1) * pageSize;
  $("#users-list").html(usersListTpl({data: state.list.slice(start, start + pageSize)}));
};

 
const _subscribe = () => {
  $('body').on('changeCurrPage', (event, index) => {
     _list(index);
  });

  $('body').on('addUser', (event) => {
    page.setCurrentPage(1);
    _loadData();
 })
}
 

const listUser = (router) => {

  const loadIndex = async (res, next) => {
   
    // 填充中间用户列表
    next() 
    res.render(usersTpl())

    $('#add-user-btn').off('click').on('click', addUser)
    // 初次渲染list
    await _loadData();
    
    // 页面事件绑定
    remove({
      $box:$("#users-list"),
      url: '/api/users/',
      state,
      loadData: _loadData
    })
    // 订阅事件
    _subscribe(); 
  }

  return async (req, res, next) => {
    let result = await authModel();
    if(result.ret){
      loadIndex(res, next); 
    } else {
      router.go('/signin')
    }
  }; 
};

export default listUser;
