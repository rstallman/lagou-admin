import indexTpl from "../views/index.art";
import usersTpl from "../views/users.art";
import usersListTpl from "../views/users-list.art";
 
import pagination from '../components/pagination';
import page from '../databus/data';
 

const htmlIndex = indexTpl({});
const pageSize = page.pageSize; 
let dataList = [];

const _signup = () => {
  const $btnClose = $("#users-close");
  const data = $("#users-form").serialize();
  $.ajax({
    url: "/api/users/",
    type: "post",
    data,
    success: function (res) {
      page.setCurrentPage(1);
      _loadData();
    },
  });
  $btnClose.click();
};

const _loadData = () => {
  $.ajax({
    url: "/api/users/",
    success(result) {
      dataList = result.data;
      pagination(result.data, pageSize, page.currPage);
      _list(page.currPage);
    },
  });
};

const _list = (pageNum ) => {
  let start = (pageNum - 1) * pageSize;
  $("#users-list").html(usersListTpl({data: dataList.slice(start, start + pageSize)}));
};


const _methods = () => {
  // 删除事件绑定
  $("#users-list").on("click", ".remove", function () {
    $.ajax({
      url: "/api/users/",
      type: "delete",
      data: {id: $(this).data("id")},
      success() {
        _loadData();
        const isLastPage = Math.ceil(dataList.length / pageSize) === page.currPage;
        const isLastRecord = dataList.length % pageSize === 1;
        const notFirstPage = page.currPage > 0;
        if (isLastPage && isLastRecord && notFirstPage) { page.setCurrentPage(page.currPage - 1); }
      },
    });
  });

  // 登出事件绑定
  $('#users-signout').on('click', (e) => {
    e.preventDefault();
    $.ajax({
      url:'/api/users/signout',
      success(result){
        if(result.ret) { location.reload(); }
      }
    });
  });

  // 点击保存,提交表单
  $("#users-save").on("click", _signup);
}
 
const _subscribe = () => {
  $('body').on('changeCurrPage', (event, index) => {
     _list(index);
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
    // 初次渲染list
    _loadData();
    // 页面事件绑定
    _methods();
    // 订阅事件
    _subscribe(); 
  }


  return (req, res, next) => {
    $.ajax({
      url:'/api/users/isAuth',
      success(result){
        if(result.ret){
          loadIndex(res);
        } else {
          router.go('/signin')
        }
      }
    }); 
  };
};

export { index };
