import indexTpl from "../views/index.art";
import signinTpl from "../views/signin.art";
import usersTpl from "../views/users.art";
import usersListTpl from "../views/users-list.art";
import usersPagesTpl from "../views/users-pages.art";
// import router from '../routes';

const htmlIndex = indexTpl({});
const htmlSignin = signinTpl({});
const pageSize = 5;
let currPage = 1;
let dataList = [];

const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault();
    router.go("/index");
  };
};

const _signup = () => {
  const $btnClose = $("#users-close");
  const data = $("#users-form").serialize();
  console.log("data:", data);
  $.ajax({
    url: "/api/users/",
    type: "post",
    data,
    success: function (res) {
      console.log("res:", res);
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
      _pagination(result.data);
      _list(currPage);
    },
  });
};

const _list = (pageNum ) => {
  let start = (pageNum - 1) * pageSize;
  $("#users-list").html(
    usersListTpl({
      data: dataList.slice(start, start + pageSize),
    })
  );
};

const _pagination = (data) => {
  const total = data.length;
  const numPages = Math.ceil(total / pageSize);
  const pageArray = new Array(numPages);
  const htmlPage = usersPagesTpl({
    pageArray,
  });

  $("#users-page").html(htmlPage);
  _setPageActive(currPage);
};

const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin);
    $("#signin").on("submit", _handleSubmit(router));
  };
};

const _setPageActive = (index) => {
  $("#users-page #users-page-list li:not(:first-child,:last-child)")
    .eq(index - 1)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const index = (router) => {
  return (req, res, next) => {
    res.render(htmlIndex);
    $(window, ".wrapper").resize();
    $("#content").html(usersTpl());
    $("#users-list").on("click", ".remove", function () {
      $.ajax({
        url: "/api/users/",
        type: "delete",
        data: {
          id: $(this).data("id"),
        },
        success() {
          _loadData();
          const isLastPage = Math.ceil(dataList.length / pageSize) === currPage;
          const isLastRecord = dataList.length % pageSize === 1;
          const notFirstPage = currPage > 0;
          if (isLastPage && isLastRecord && notFirstPage) { currPage--; }
        },
      });
    });

    $("#users-page").on("click", "#users-page-list li:not(:first-child,:last-child)",function (){
        const index = $(this).index();
        _list(index);
        currPage = index;
        _setPageActive(index);
      }
    );
    $("#users-page").on("click", "#users-page-list li:first-child", function () {
        if (currPage > 1) {
          currPage--;
          _list(currPage);
          _setPageActive(currPage);
        }
      }
    );
    $("#users-page").on( "click", "#users-page-list li:last-child ", function () {
        if (currPage < Math.ceil(dataList.length / pageSize)) {
          currPage++;
          _list(currPage);
          _setPageActive(currPage);
        }
      }
    );

    $('#users-signout').on('click', (e) => {
      e.preventDefault();
      router.go('/signin');
    });

    _loadData();
    $("#users-save").on("click", _signup);
  };
};

export { signin, index };
