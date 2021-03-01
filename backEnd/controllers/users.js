const usersModel = require("../models/users");
const { encrypt, compare } = require("../utils/tools");
 

const signup = async (req, res) => {
 
  const { username, password } = req.body;

  const bcryptPassword = await encrypt(password);

  let findResult = await usersModel.findUser(username);

  if (findResult) {
    res.render("fail", {
      data: JSON.stringify({
        message: "用户名已存在 ",
      }),
    });
  } else {
    await usersModel.signup({
      username,
      password: bcryptPassword,
    });

    res.render("succ", {
      data: JSON.stringify({
        message: "用户添加成功 ",
      }),
    });
  }
};

const list = async (req, res) => {
  const users = await usersModel.findList();
  res.render("succ", {
    data: JSON.stringify(users),
  });
};

const remove = async (req, res) => {
  const { id } = req.body;
  let result = await usersModel.remove(id);
  if (result) {
    res.render("succ", {
      data: JSON.stringify({
        message: "用户删除成功",
      }),
    });
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "用户删除失败",
      }),
    });
  }
};

// user sign in
const signin = async (req, res) => {
  const {username, password} = req.body;
  let result = await usersModel.findUser(username);
  if(result) {
    let {password: hash} = result;
    let compareResult =  await compare(password, hash);
    if(compareResult) {
      req.session.username = username;
      res.render("succ", {
        data: JSON.stringify({
          username
        }), 
      });

    } else {
      res.render("fail", {
        data: JSON.stringify({
          message: "用户名或密码错误",
        }),
      });
    }

  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "用户名或密码错误",
      }),
    });
  }
}

const signout = async (req, res) => {
  req.session = null;
  res.render("succ", {
    data: JSON.stringify({
      message:"退出登录成功 "
    }), 
  });
}

const isAuth = async (req, res, next) => {

  if(req.session.username){
    res.render("succ", {
      data: JSON.stringify({
         username: req.session.username 
      }), 
    });
   
  } else {
    res.render("fail", {
      data: JSON.stringify({
        message: "请登录",
      }),
    });
  }
   
}


module.exports = {
  signup,
  list,
  remove,
  signin,
  signout,
  isAuth
};
