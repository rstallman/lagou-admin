import {auth as authModel} from '../../models/auth' 
import positionsTpl from '../../views/positions.art'
import positionsListTpl from '../../views/positions-list.art'
import pagination from '../../components/pagination'
import {positionsList as positionsListModel} from '../../models/positions'
import page from '../../databus/data';
import {addPosition} from './add-position'
import {remove} from '../common'


const pageSize = page.pageSize; 
let state = {
  list: []
};

const renderCurrentPage = (pageNum ) => {
  let start = (pageNum - 1) * pageSize;
  $("#positions-list").html(positionsListTpl({data: state.list.slice(start, start + pageSize)}));
};

const loadDataAndShowContent = async () => {
  const result = await positionsListModel()
  state.list = result.data;
  // 分页
  pagination(result.data);
  // 数据渲染
  renderCurrentPage(page.currPage);
}; 


const subscribe = () => {
  $('body').off('changeCurrPage').on('changeCurrPage', (event, index) => {
     renderCurrentPage(index);
  });

  $('body').off('addPosition').on('addPosition', (event) => {
    page.setCurrentPage(1);
    loadDataAndShowContent();
 })
}


export default (router) => {
  return  async(req, res, next) => {
    let result = await authModel()
    if(result.ret) {
      next()
      res.render(positionsTpl())
      $('#add-position-btn').off('click').on('click', addPosition)
      // 初次渲染list
      loadDataAndShowContent()
      subscribe()

      remove({
        $box:$("#positions-list"),
        url: '/api/positions/remove',
        state,
        loadData: loadDataAndShowContent
      })
      
    } else {
      router.go('/signin')
    } 
  }
}