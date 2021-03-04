import indexTpl from "../../views/index.art";
import usersTpl from "../../views/users.art";
import usersListTpl from "../../views/users-list.art";
import pagination from '../../components/pagination';
import page from '../../databus/data';
import {addUser} from './add-user';
import {usersList as userListModel} from '../../models/users-list'
import {auth as authModel} from '../../models/auth'
import {usersRemove as usersRemoveModel} from '../../models/users-remove'
 

const htmlIndex = indexTpl({});
const pageSize = page.pageSize; 
let dataList = [];

const _loadData = async () => {
  let result = await userListModel();
  dataList = result.data;
  // 分页
  pagination(result.data, pageSize, page.currPage);
  // 数据渲染
  _list(page.currPage);
}; 

const _list = (pageNum ) => {
  let start = (pageNum - 1) * pageSize;
  $("#users-list").html(usersListTpl({data: dataList.slice(start, start + pageSize)}));
};


const _bindEvent = () => {
  // 删除事件绑定
  $("#users-list").on("click", ".remove",  async function () {
    let result = await usersRemoveModel($(this).data("id"));
    if(result.ret) {
      _loadData();
      const isLastPage = Math.ceil(dataList.length / pageSize) === page.currPage;
      const isLastRecord = dataList.length % pageSize === 1;
      const notFirstPage = page.currPage > 0;
      if (isLastPage && isLastRecord && notFirstPage) { page.setCurrentPage(page.currPage - 1); }
    }
  });

  // 登出事件绑定
  $('#users-signout').on('click', (e) => {
    e.preventDefault(); 
    localStorage.setItem('lg-token', ''); 
    location.reload()
  });
}
 
const _subscribe = () => {
  $('body').on('changeCurrPage', (event, index) => {
     _list(index);
  });

  $('body').on('addUser', (event) => {
    _loadData();
 })
}
 

const index = (router) => {

  const loadIndex = (res) => {
    // 渲染首页面
    res.render(htmlIndex);
    // window resize,让页面撑满屏幕
    $(window, ".wrapper").resize();
    // 填充中间用户列表
    $("#content").html(usersTpl());
    $('#add-user-btn').on('click', addUser)
    // 初次渲染list
    _loadData();
    // 页面事件绑定
    _bindEvent();
    // 订阅事件
    _subscribe(); 
  }

  return async (req, res, next) => {
    let result = await authModel();
    if(result.ret){
      loadIndex(res);
    } else {
      router.go('/signin')
    }
  }; 
};

export { index };
