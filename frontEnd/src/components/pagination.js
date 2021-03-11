import usersPagesTpl from "../views/users-pages.art";
import page from '../databus/data';
 

const _setPageActive = (index) => {
  $("#users-page #users-page-list li:not(:first-child,:last-child)")
    .eq(index - 1)
    .addClass("active")
    .siblings()
    .removeClass("active");
};


const  pagination = (data) => {
  const pageSize = page.pageSize
  const total = data.length;
  const numPages = Math.ceil(total / pageSize);
  const pageArray = new Array(numPages);
  const htmlPage = usersPagesTpl({
    pageArray,
  });
  $("#users-page").html(htmlPage);
  _setPageActive(page.currPage);
  _bindEvent(data, pageSize);
}; 

const _bindEvent = (data, pageSize) => {
  $("#users-page").off("click", "#users-page-list li:not(:first-child,:last-child)");
  $("#users-page").on("click", "#users-page-list li:not(:first-child,:last-child)",function (){
    const index = $(this).index();   
    page.setCurrentPage(index);
    $('body').trigger('changeCurrPage', index)
    _setPageActive(index);
  });
  $("#users-page").off("click", "#users-page-list li:first-child");
  $("#users-page").on("click", "#users-page-list li:first-child", function () {
    if (page.currPage > 1) {
      page.setCurrentPage(page.currPage - 1);
      $('body').trigger('changeCurrPage', page.currPage)
      _setPageActive(page.currPage);
    
    }
  }); 
  $("#users-page").off( "click", "#users-page-list li:last-child");
  $("#users-page").on( "click", "#users-page-list li:last-child", function () {
    if (page.currPage < Math.ceil(data.length / pageSize)) {
      page.setCurrentPage(page.currPage + 1);
      $('body').trigger('changeCurrPage', page.currPage)
      _setPageActive(page.currPage);
    }
  });
  
}


export default pagination; 