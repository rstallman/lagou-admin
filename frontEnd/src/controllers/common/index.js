import * as  removeModel from '../../models/remove'
import page from '../../databus/data'
import removeWarningTpl from '../../views/remove-warning.art'

const remove = ({
  $box,
  url,
  loadData,
  state
}) => {
  $box.off("click", ".remove")
  $box.on('click', ".remove", function(){
    let id = $(this).data("id")
    $box.after(removeWarningTpl())
    $('#remove-button').off('click').on('click', async () => {
      let length = state.list.length
      let result = await removeModel.remove({url, id});
      if(result.ret) {
        loadData();
        const isLastPage = Math.ceil(length / page.pageSize) === page.currPage;
        const isLastRecord = length % page.pageSize === 1;
        const notFirstPage = page.currPage > 0;
        if (isLastPage && isLastRecord && notFirstPage) { page.setCurrentPage(page.currPage - 1); }
      }
      $('#remove-cancel').click()
    })   
  }) 
}

export {
  remove,
}