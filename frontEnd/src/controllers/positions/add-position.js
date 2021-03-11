import positionsAddTpl from '../../views/positions-add.art'
import {positionsAdd as positionsAddModel} from '../../models/positions'

export const addPosition = () => {
  $('#positions-list-box').after(positionsAddTpl())
  $('#positions-save').off('click').on('click', async() => {
    const formbody =  $('#position-form').serialize()
    let result = await positionsAddModel(formbody)
    if(result.ret) {
      $('body').trigger('addPosition')
    } 
    const $btnClose = $("#positions-close")
    $btnClose.click()
  })
};





