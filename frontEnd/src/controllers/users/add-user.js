import page from '../../databus/data'
import usersAddTpl from '../../views/users-add.art'
import {usersAdd as usersAddModel} from '../../models/users-add'
 
export const addUser = () => {
  const html = usersAddTpl();  
  $('#users-list-box').after(html); 
  
  const _save = async () => {
    const data = $("#users-form").serialize();
    let result =  await usersAddModel(data )
    if(result.ret) {
      page.setCurrentPage(1);
      $('body').trigger('addUser');
    } 
    const $btnClose = $("#users-close");
    $btnClose.click();
  }

  // 点击保存,提交表单
  $("#users-save").on("click", _save);

};

