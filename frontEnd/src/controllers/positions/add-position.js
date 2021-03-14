import positionsAddTpl from '../../views/positions-add.art'
import {positionsAdd as positionsAddModel} from '../../models/positions'

export const addPosition = () => {
  $('#positions-list-box').after(positionsAddTpl())
  $('#positions-save').off('click').on('click', async() => {   
    try {
      let result = await positionsAddModel()
      if(result.ret) {
        $('body').trigger('addPosition')
      }
      $("#positions-close").click()
    } catch (error) {
      console.log(err)
    }
  })
};





