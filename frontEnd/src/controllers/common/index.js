import * as  removeModel from '../../models/remove'
import page from '../../databus/data'

const remove = ({
  $box,
  url,
  loadData,
  state
}) => {
  
  // 删除事件绑定
  $box.off("click", ".remove")
  $box.on("click", ".remove",  async function () {
    let length = state.list.length
    let result = await removeModel.remove({url, id: $(this).data("id")});
    if(result.ret) {
      loadData();
      const isLastPage = Math.ceil(length / page.pageSize) === page.currPage;
      const isLastRecord = length % page.pageSize === 1;
      const notFirstPage = page.currPage > 0;
      if (isLastPage && isLastRecord && notFirstPage) { page.setCurrentPage(page.currPage - 1); }
    }
  });
}

export {
  remove,
}