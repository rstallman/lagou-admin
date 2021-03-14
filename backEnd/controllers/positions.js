const postionsModel = require('../models/positions')
const moment = require('moment')

const add = async (req, res) => {

  let result = await postionsModel.add({
    companyLogo: req.companyLogo,
    ...req.body,
    createTime: moment().format('YYYY年MM月DD日, HH:mm')
  })
  
  if(result) {
    res.render("succ", {
      data: JSON.stringify({
        message: "职位添加成功",
      }),
    });
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "职位添加失败",
      }),
    });
  }
}

const list = async (req, res) => {
  let result = await postionsModel.list()
  
  if(result) {
    res.render("succ", {
      data: JSON.stringify(result),
    });
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "职位列表失败",
      }),
    });
  }
}


const remove = async (req, res) => {
  const { id } = req.body;

  try {
    let result = await postionsModel.remove(id);
    console.log('result:', result)
    if (result.deletedCount > 0) {
      res.render("succ", {
        data: JSON.stringify({
          message: "职位删除成功",
        }),
      });
    } else {
      res.render("fail", {
        data: JSON.stringify({
          message: "职位删除失败",
        }),
      });
    }
  } catch (error) {
    console.log(error)
    res.render("fail", {
      data: JSON.stringify({
        message: "职位删除失败",
      }),
    });
  }

  
};


module.exports = {
  add,
  list,
  remove
}